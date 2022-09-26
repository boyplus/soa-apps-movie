import {
  Get,
  Post,
  Body,
  Controller,
  SuccessResponse,
  Tags,
  Route,
  Request,
  Path,
  Query,
} from 'tsoa';

import {
  GetStaffProfileResponse,
  LoginUserResponse,
  MovieModel,
  ShowResponse,
  SpecificShowResponse,
} from './types';

import { ApiError } from '../utils/ApiError';

import { Staff, Location, Movie } from '../models';
import { getShowsUtil, getShowUtil } from '../utils/show';

@Tags('Util')
@Route('util')
export class UtilController extends Controller {
  // Get all locations
  @Get('/location')
  @SuccessResponse('200', 'Get all locations')
  public async getLocations(): Promise<Location[]> {
    try {
      const locations = await Location.find();
      return locations;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err);
    }
  }

  // Get a location
  @Get('/location/:id')
  @SuccessResponse('200', 'Get specific location')
  public async getLocation(@Path('id') id: number): Promise<Location> {
    try {
      const location = await Location.findOne({
        where: { id },
        relations: ['shows'],
      });

      if (!location) throw new ApiError(400, 'Location not found');
      return location;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err);
    }
  }

  // Get all movies
  @Get('/movie')
  @SuccessResponse('200', 'Get all movies')
  public async getMovies(): Promise<MovieModel[]> {
    try {
      const movies = await Movie.find({
        where: { isActive: true },
      });
      return movies;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  // Get specific movie
  @Get('/movie/:id')
  @SuccessResponse('200', 'Get specific movie')
  public async getMovie(@Path('id') id: number): Promise<MovieModel> {
    try {
      const movie = await Movie.findOne({
        where: { id, isActive: true },
        relations: ['shows'],
      });

      if (!movie) throw new ApiError(400, 'Movie not found');

      return movie;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  // Get all shows on specific date (order by start slot)
  @Get('/show')
  @SuccessResponse('200', 'Get all shows')
  public async getShows(
    @Query() date: string,
    @Query() locationId: number
  ): Promise<ShowResponse[]> {
    try {
      const shows = await getShowsUtil({ date, locationId });
      return shows;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }

  // Get specific show
  @Get('/show/:id')
  @SuccessResponse('200', 'Get show by id')
  public async getShow(@Path('id') id: number): Promise<SpecificShowResponse> {
    try {
      const show = getShowUtil({ id });
      return show;
    } catch (err: any) {
      throw new ApiError(err.statusCode ?? 500, err.message);
    }
  }
}
