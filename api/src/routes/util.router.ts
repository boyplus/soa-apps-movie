import * as express from 'express';
import { Request, Response } from 'express';
import { UtilController } from '../controllers/util.controller';
import {
  LoginUserResponse,
  GetStaffProfileResponse,
  MovieModel,
} from '../controllers/types';
import { Movie } from 'models';

const Router = express.Router();

const utilController = new UtilController();

// Get all locations
Router.get('/location', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const serviceResponse = await utilController.getLocations();
    res.status(200).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ msg: error.message });
  }
});

// Get specific location
Router.get('/location/:id', async (req: Request, res: Response) => {
  try {
    const serviceResponse = await utilController.getLocation(
      parseInt(req.params.id)
    );
    res.send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ msg: error.message });
  }
});

// Get all movies
Router.get('/movie', async (req: Request, res: Response) => {
  try {
    const serviceResponse: MovieModel[] = await utilController.getMovies();
    return res.status(200).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Get specific movie
Router.get('/movie/:id', async (req: Request, res: Response) => {
  try {
    const serviceResponse: MovieModel = await utilController.getMovie(
      parseInt(req.params.id)
    );
    return res.status(200).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Get all shows
Router.get('/show', async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string;
    const locationId = req.query.locationId as string;
    const serviceResponse = await utilController.getShows(
      date,
      parseInt(locationId)
    );
    res.send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ msg: error.message });
  }
});

// Get specific show
Router.get('/show/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const serviceResponse = await utilController.getShow(id);
    res.send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ msg: error.message });
  }
});

export default Router;
