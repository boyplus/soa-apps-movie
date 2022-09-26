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
  Patch,
  Path,
  Delete,
} from 'tsoa';

import {
  GetAdminProfileResponse,
  LoginUserResponse,
  MessageResponse,
} from './types';

import { ApiError } from '../utils/ApiError';

import { v4 as uuidv4 } from 'uuid';

import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { Admin, Staff, Location, Movie } from '../models';
import { SECRET_KEY } from '../configurations/secret-key';

@Tags('Admin')
@Route('admin')
export class AdminController extends Controller {
  // Login
  @Post('/login')
  @SuccessResponse('200', 'Login admin')
  public async login(
    @Body() { email, password }: { email: string; password: string }
  ): Promise<LoginUserResponse> {
    try {
      const admin = await Admin.findOne({
        where: { email },
      });

      // if user is not founded
      if (!admin) {
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );
      }

      const isPasswordMatch = await compare(password, admin.password);

      if (!isPasswordMatch) {
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );
      }

      const token = sign(
        {
          id: admin.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
        },
        SECRET_KEY
      );

      // expired in 15 days
      const finalRes: LoginUserResponse = {
        email: admin.email,
        token: token,
      };

      return finalRes;
    } catch (err: any) {
      throw new ApiError(500, err);
    }
  }

  // Register
  // @Post('/register')
  // @SuccessResponse('201', 'Register admin')
  // public async register(
  //   @Body()
  //   { email, password, name }: { email: string; password: string; name: string }
  // ): Promise<MessageResponse> {
  //   try {
  //     if (!email || !password)
  //       throw new ApiError(400, 'Please fill all informatiom.');

  //     const isAlreadyCreated = await Admin.findOne({ where: { email } });

  //     if (isAlreadyCreated) {
  //       throw new ApiError(400, 'This email has already been used.');
  //     }

  //     const newUser = new Admin();

  //     const hashPassword = await hash(password, 8);

  //     // User info. assigning
  //     newUser['id'] = uuidv4();
  //     newUser['email'] = email;
  //     newUser['password'] = hashPassword;
  //     newUser['name'] = name;

  //     await newUser.save();

  //     const response: MessageResponse = {
  //       message: 'Your account just created.',
  //     };

  //     return response;
  //   } catch (err: any) {
  //     throw new ApiError(500, err);
  //   }
  // }

  // Get admin profile
  @Security('jwt')
  @Get('/profile')
  @SuccessResponse('200', 'Get admin profile')
  public async getProfile(
    @Request() req: any
  ): Promise<GetAdminProfileResponse> {
    try {
      const user = await Admin.findOne({
        select: ['email', 'name'],
        where: { id: req.user.id },
      });
      if (!user) throw new ApiError(400, 'User not found');

      const response: GetAdminProfileResponse = {
        email: user.email,
        name: user.name,
      };

      return response;
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  //////////////
  ///////Staff
  //////////////

  // Create staff
  @Security('jwt')
  @Post('/staff')
  @SuccessResponse('201', 'Created staff')
  public async createStaff(
    @Body()
    {
      email,
      password,
      name,
      locationId,
    }: {
      email: string;
      password: string;
      name: string;
      locationId: number;
    }
  ): Promise<MessageResponse> {
    try {
      if (!email || !password)
        throw new ApiError(400, 'Please fill all informatiom.');

      const isAlreadyCreated = await Staff.findOne({ where: { email } });

      if (isAlreadyCreated)
        throw new ApiError(400, 'This email has already been used.');

      const hashPassword = await hash(password, 8);

      // User info. assigning
      const newUser = new Staff();
      newUser['id'] = uuidv4();
      newUser['email'] = email;
      newUser['password'] = hashPassword;
      newUser['name'] = name;
      newUser['locationId'] = locationId;

      await newUser.save();

      const response: MessageResponse = {
        message: 'Staff account just created.',
      };

      return response;
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  // Get all staff
  @Security('jwt')
  @Get('/staff')
  @SuccessResponse('200', 'Get all staff')
  public async getStaffes(): Promise<Staff[]> {
    try {
      const staff = await Staff.find({
        select: ['name', 'email', 'id', 'location'],
        relations: ['location'],
        where: { isActive: true },
      });
      return staff;
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  // Get a staff
  @Security('jwt')
  @Get('/staff/:id')
  @SuccessResponse('200', 'Get staff')
  public async getStaff(@Path('id') id: string): Promise<Staff> {
    try {
      const staff = await Staff.findOne({
        where: { id, isActive: true },
        select: ['name', 'email', 'id', 'location'],
        relations: ['location'],
      });
      if (!staff) throw new ApiError(400, 'Staff not found');

      return staff;
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  // Update staff
  @Security('jwt')
  @Patch('/staff/:id')
  @SuccessResponse('201', 'Update staff')
  public async updateStaff(
    @Path('id') id: string,
    @Body()
    body: { name?: string; email?: string }
  ): Promise<MessageResponse> {
    try {
      const staff = await Staff.findOne({ where: { id, isActive: true } });
      if (!staff) throw new ApiError(400, 'Staff not found');

      await Staff.update({ id, isActive: true }, body);

      return { message: 'Update Staff successfully' };
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  // Delete staff
  @Security('jwt')
  @Delete('/staff/:id')
  @SuccessResponse('201', 'Delete staff')
  public async deleteStaff(@Path('id') id: string): Promise<MessageResponse> {
    try {
      const staff = await Staff.findOne({ where: { id, isActive: true } });
      if (!staff) throw new ApiError(400, 'Staff not found');

      await Staff.update({ id }, { isActive: false });

      return { message: 'Delete Staff successfully' };
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  //////////////
  ///////Loaction
  //////////////

  // Create location
  @Security('jwt')
  @Post('/location')
  @SuccessResponse('201', 'Created location')
  public async createLocation(
    @Body()
    {
      name,
      address,
      phone,
      seat,
    }: {
      name: string;
      address: string;
      phone: string;
      seat: number;
    }
  ): Promise<MessageResponse> {
    try {
      if (!name || !address || !phone)
        throw new ApiError(400, 'Please fill all informatiom.');

      // location info
      const newLocation = new Location();
      newLocation['name'] = name;
      newLocation['address'] = address;
      newLocation['phone'] = phone;
      newLocation['seat'] = seat;

      await newLocation.save();

      const response: MessageResponse = {
        message: 'Create location successfully',
      };

      return response;
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  // Update location
  @Security('jwt')
  @Patch('/location/:id')
  @SuccessResponse('201', 'Update location')
  public async updateLocation(
    @Path('id') id: number,
    @Body()
    body: { name?: string; address?: string; phone?: string }
  ): Promise<MessageResponse> {
    try {
      const location = await Location.findOne({ where: { id } });
      if (!location) throw new ApiError(400, 'Location not found');

      await Location.update({ id }, body);

      const response: MessageResponse = {
        message: 'Update location successfully',
      };

      return response;
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }

  //////////////
  ///////Movie
  //////////////

  // Create movie
  @Security('jwt')
  @Post('/movie')
  @SuccessResponse('201', 'Created movie')
  public async createMovie(
    @Body()
    {
      name,
      description,
      length,
    }: {
      name: string;
      description: string;
      length: number;
    }
  ): Promise<MessageResponse> {
    try {
      if (!name || !description || !length)
        throw new ApiError(400, 'Please fill all informatiom.');

      // movie info
      const newMovie = new Movie();
      newMovie['name'] = name;
      newMovie['description'] = description;
      newMovie['length'] = length;

      await newMovie.save();

      const response: MessageResponse = {
        message: 'Create movie successfully',
      };

      return response;
    } catch (err: any) {
      throw new ApiError(err.statusCode, err);
    }
  }

  // Update movie
  @Security('jwt')
  @Patch('/movie/:id')
  @SuccessResponse('201', 'Update movie')
  public async updateMovie(
    @Path('id') id: number,
    @Body()
    body: { name?: string; description?: string }
  ): Promise<MessageResponse> {
    try {
      const staff = await Movie.findOne({ where: { id } });
      if (!staff) throw new ApiError(400, 'Staff not found');

      await Movie.update({ id }, body);

      return { message: 'Update movie successfully' };
    } catch (err: any) {
      throw new ApiError(err.statusCode, err.message);
    }
  }
}
