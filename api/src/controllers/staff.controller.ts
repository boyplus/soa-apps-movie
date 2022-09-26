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
  Path,
  Query,
} from 'tsoa';

import {
  GetStaffProfileResponse,
  LoginUserResponse,
  MessageResponse,
  Slot,
  SpecificShowResponse,
} from './types';

import { ShowResponse } from './types';

import { ApiError } from '../utils/ApiError';

import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { Movie, Show, Staff } from '../models';
import { SECRET_KEY } from '../configurations/secret-key';
import { getShowUtil, getShowsUtil, getSlots } from '../utils/show';

const selectShowAtt = [];

@Tags('Staff')
@Route('staff')
export class StaffController extends Controller {
  //////////////////////
  /// Auth
  //////////////////////

  // Login
  @Post('/login')
  @SuccessResponse('200', 'Login admin')
  public async login(
    @Body() { email, password }: { email: string; password: string }
  ): Promise<LoginUserResponse> {
    try {
      const staff = await Staff.findOne({
        where: { email },
      });

      // if user is not founded
      if (!staff) {
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );
      }

      const isPasswordMatch = await compare(password, staff.password);

      if (!isPasswordMatch) {
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );
      }

      const token = sign(
        {
          id: staff.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
        },
        SECRET_KEY
      );

      // expired in 15 days
      const finalRes: LoginUserResponse = {
        email: staff.email,
        token: token,
      };

      return finalRes;
    } catch (err: any) {
      throw new ApiError(500, err);
    }
  }

  // Get staff profile
  @Security('jwt')
  @Get('/profile')
  @SuccessResponse('200', 'Get staff profile')
  public async getProfile(
    @Request() req: Express.Request
  ): Promise<GetStaffProfileResponse> {
    try {
      const staff = await Staff.findOne({
        where: { id: req.user.id },
        select: ['id', 'location', 'name', 'email'],
        relations: ['location'],
      });

      if (!staff) throw new ApiError(400, 'User not found');

      const response: GetStaffProfileResponse = staff;

      return response;
    } catch (err: any) {
      console.log(err);
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  //////////////////////
  /// Show
  //////////////////////

  // Get all shows on specific date (order by start slot)
  @Security('jwt')
  @Get('/show')
  @SuccessResponse('200', 'Get all shows')
  public async getShows(
    @Request() req: Express.Request,
    @Query() date: string
  ): Promise<ShowResponse[]> {
    try {
      if (!req.user.locationId) throw new ApiError(401, 'Unauthorized');
      const shows = await getShowsUtil({
        date,
        locationId: req.user.locationId,
      });
      return shows;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  // Get slot (There are 20 slots for every location, start from 1 to 20)
  @Security('jwt')
  @Get('/show/slot')
  @SuccessResponse('200', 'Get slots')
  public async getAvailableSlot(
    @Request() req: Express.Request,
    @Query() date: string
  ): Promise<Slot[]> {
    try {
      const slots: Slot[] = [];
      for (let i = 0; i < 20; i++) slots.push({ isReserved: false, id: i + 1 });

      const shows = await Show.find({
        where: { startDate: date, locationId: req.user.locationId },
        select: ['movie', 'startSlot'],
        relations: ['movie'],
      });
      for (let show of shows) {
        const e = show.startSlot + show.movie.length - 1;
        for (let i = show.startSlot - 1; i < e; i++) {
          slots[i].isReserved = true;
          slots[i].movie = show.movie;
        }
      }
      return slots;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  // Get specific show
  @Security('jwt')
  @Get('/show/:id')
  @SuccessResponse('200', 'Get show by id')
  public async getShow(
    @Request() req: Express.Request,
    @Path('id') id: number
  ): Promise<SpecificShowResponse> {
    try {
      if (!req.user.locationId) throw new ApiError(401, 'Unauthorized');
      const show = getShowUtil({ id });
      return show;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  // Create show
  @Security('jwt')
  @Post('/show')
  @SuccessResponse('201', 'Create show')
  public async createShow(
    @Request() req: Express.Request,
    @Body()
    {
      startDate,
      startSlot,
      movieId,
    }: {
      startDate: string;
      startSlot: number;
      movieId: number;
    }
  ): Promise<MessageResponse> {
    try {
      if (!req.user.locationId) throw new ApiError(401, 'Unauthorized');
      const movie = await Movie.findOne({ where: { id: movieId } });
      if (!movie) throw new ApiError(400, 'Movie id is not correct');

      const slots = await getSlots({
        startDate,
        locationId: req.user.locationId,
      });

      const e = startSlot + movie.length - 1;
      if (startSlot + movie.length > 21)
        throw new ApiError(400, 'Out of slots');
      for (let i = startSlot - 1; i < e; i++) {
        if (slots[i].isReserved)
          throw new ApiError(400, 'This slot is reserved');
      }

      const newShow = new Show();
      newShow['startDate'] = startDate;
      newShow['startSlot'] = startSlot;
      newShow['locationId'] = req.user.locationId;
      newShow['movieId'] = movieId;
      await newShow.save();

      return { message: 'Create show successfully' };
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }
}
