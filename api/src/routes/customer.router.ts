import * as express from 'express';
import { Request, Response } from 'express';
import { CustomerController } from '../controllers/customer.controller';

import CustomerMiddleware from '../middlewares/customer-middleware';

const Router = express.Router();

const userController = new CustomerController();

// Login
Router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const serviceResponse = await userController.login({
      email,
      password,
    });
    res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ message: error.message });
  }
});

// Register
Router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const serviceResponse = await userController.register({
      email,
      password,
      name,
    });
    res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ message: error.message });
  }
});

// Get customer profile
Router.get(
  '/profile',
  CustomerMiddleware,
  async (req: Request, res: Response) => {
    try {
      const serviceResponse = await userController.getProfile(req);
      res.send(serviceResponse);
    } catch (error: any) {
      res.status(error.statusCode ?? 500).send({ message: error.message });
    }
  }
);

// Buy a ticket
Router.post(
  '/reservation',
  CustomerMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { seatId, showId } = req.body;

      const serviceResponse = await userController.reserveShow(req, {
        seatId,
        showId,
      });
      res.status(201).send(serviceResponse);
    } catch (error: any) {
      res.status(error.statusCode ?? 500).send({ message: error.message });
    }
  }
);

// Get reservations
Router.get(
  '/reservation',
  CustomerMiddleware,
  async (req: Request, res: Response) => {
    try {
      const serviceResponse = await userController.getReservations(req);
      res.send(serviceResponse);
    } catch (error: any) {
      res.status(error.statusCode ?? 500).send({ message: error.message });
    }
  }
);

export default Router;
