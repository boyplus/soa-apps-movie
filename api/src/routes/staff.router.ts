import * as express from 'express';
import { Request, Response } from 'express';
import { Show } from 'models';
import { StaffController } from '../controllers/staff.controller';
import {
  LoginUserResponse,
  GetStaffProfileResponse,
  MessageResponse,
} from '../controllers/types';

import StaffMiddleware from '../middlewares/staff-middleware';

import { ShowResponse } from '../controllers/types';
import { ApiError } from '../utils/ApiError';

const Router = express.Router();

const staffController = new StaffController();

// Login
Router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const serviceResponse: LoginUserResponse = await staffController.login({
      email,
      password,
    });
    res.send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ message: error.message });
  }
});

// Get profile
Router.get('/profile', StaffMiddleware, async (req: Request, res: Response) => {
  try {
    const serviceResponse: GetStaffProfileResponse =
      await staffController.getProfile(req);
    res.send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ message: error.message });
  }
});

// Get all shows
Router.get('/show', StaffMiddleware, async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string;
    const serviceResponse = await staffController.getShows(req, date);
    res.send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ message: error.message });
  }
});

// Get available slot of date
Router.get(
  '/show/slot',
  StaffMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.query.date) throw new ApiError(400, '');

      const date: string = req.query.date as string;
      const serviceResponse = await staffController.getAvailableSlot(req, date);
      res.send(serviceResponse);
    } catch (error: any) {
      console.log('from router');
      console.log(error.statusCode);
      res.status(error.statusCode ?? 500).send({ message: error.message });
    }
  }
);

// Get specific show
Router.get(
  '/show/:id',
  StaffMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const serviceResponse = await staffController.getShow(req, id);
      res.send(serviceResponse);
    } catch (error: any) {
      res.status(error.statusCode ?? 500).send({ message: error.message });
    }
  }
);

// Create show
Router.post('/show', StaffMiddleware, async (req: Request, res: Response) => {
  try {
    const { startDate, startSlot, movieId } = req.body;
    const serviceResponse: MessageResponse = await staffController.createShow(
      req,
      { startDate, startSlot, movieId }
    );
    res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ message: error.message });
  }
});

export default Router;
