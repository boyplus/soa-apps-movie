import {
  Get,
  Post,
  Body,
  Controller,
  SuccessResponse,
  Tags,
  Route,
  Request,
  Security,
  Query,
  Path,
} from 'tsoa';

import {
  GetCustomerProfileResponse,
  GetReservationsResponse,
  LoginUserResponse,
  MessageResponse,
  RegisterUserResponse,
  ShowResponse,
  Slot,
  SpecificShowResponse,
} from './types';

import { v4 as uuidv4 } from 'uuid';

import { ApiError } from '../utils/ApiError';

import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { Customer } from '../models/Customer';
import { SECRET_KEY } from '../configurations/secret-key';
import { Location, Movie, Reservation, Show } from '../models';
import { getReservations, getShowsUtil, getShowUtil } from '../utils/show';

@Tags('Customer')
@Route('customer')
export class CustomerController extends Controller {
  // Login
  @Post('/login')
  @SuccessResponse('200', 'Loging In User')
  public async login(
    @Body() { email, password }: { email: string; password: string }
  ): Promise<LoginUserResponse> {
    try {
      const customer = await Customer.findOne({
        where: { email },
      });

      console.log('inside');

      // if user is not founded
      if (!customer) {
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );
      }

      const isPasswordMatch = await compare(password, customer.password);

      if (!isPasswordMatch) {
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );
      }

      const token = sign(
        {
          id: customer.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
        },
        SECRET_KEY
      );

      // expired in 15 days

      const finalRes: LoginUserResponse = {
        email: customer.email,
        token: token,
      };

      return finalRes;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err);
    }
  }

  // Register
  @Post('/register')
  @SuccessResponse('201', 'Created User')
  public async register(
    @Body()
    { email, password, name }: { email: string; password: string; name: string }
  ): Promise<RegisterUserResponse> {
    try {
      if (!email || !password)
        throw new ApiError(400, 'Please fill all informatiom.');
      const isAlreadyCreated = await Customer.findOne({ where: { email } });

      if (isAlreadyCreated) {
        throw new ApiError(400, 'This email has already been used.');
      }

      const newUser = new Customer();

      const hashPassword = await hash(password, 8);

      // User info. assigning
      newUser['id'] = uuidv4();
      newUser['email'] = email;
      newUser['password'] = hashPassword;
      newUser['name'] = name;

      await newUser.save();

      const response: RegisterUserResponse = {
        message: 'Your account just created.',
      };

      return response;
    } catch (err: any) {
      throw new ApiError(500, err);
    }
  }

  // Get customer profile
  @Security('jwt')
  @Get('/profile')
  @SuccessResponse('200', 'Get customer profile')
  public async getProfile(
    @Request() req: any
  ): Promise<GetCustomerProfileResponse> {
    try {
      const user = await Customer.findOne({
        select: ['email', 'name'],
        where: { id: req.user.id },
      });
      if (!user) throw new ApiError(400, 'User not found');

      const response: GetCustomerProfileResponse = {
        email: user.email,
        name: user.name,
      };

      return response;
    } catch (err: any) {
      throw new ApiError(500, err);
    }
  }

  ////////////
  // Show
  ///////////

  // Buy a ticket
  @Security('jwt')
  @Post('/reservation')
  @SuccessResponse('201', 'Buy a ticket')
  public async reserveShow(
    @Request() req: Express.Request,
    @Body() { seatId, showId }: { seatId: number[]; showId: number }
  ): Promise<MessageResponse> {
    try {
      const show = await Show.findOne({
        where: { id: showId },
        relations: ['location'],
      });
      if (!show) throw new ApiError(400, 'Show id not found');

      const reservations = await getReservations({ show });
      for (const s of seatId) {
        if (reservations[s - 1].isReserved)
          throw new ApiError(400, `Seat ${s} is reserved`);
      }

      for (const s of seatId) {
        const r = new Reservation();
        r.id = uuidv4().slice(0, 8);
        r.showId = showId;
        r.seatId = s;
        r.customerId = req.user.id;
        await r.save();
      }

      return { message: 'Reserve successfully' };
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  // Get customer resevations
  @Security('jwt')
  @Get('/reservation')
  @SuccessResponse('200', 'Get customer reservations')
  public async getReservations(
    @Request() req: Express.Request
  ): Promise<Reservation[]> {
    try {
      const reservations = await Reservation.find({
        where: { customerId: req.user.id },
        relations: ['show', 'show.movie', 'show.location'],
        order: { show: { startDate: 'DESC', startSlot: 'ASC' } },
      });

      return reservations;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }
}
