import * as express from 'express';
import { Request, Response } from 'express';
import { Movie, Staff } from 'models';
import { AdminController } from '../controllers/admin.controller';
import {
  GetCustomerProfileResponse,
  LoginUserResponse,
  RegisterUserResponse,
  GetAdminProfileResponse,
  MessageResponse,
} from '../controllers/types';

import AdminMiddleware from '../middlewares/admin-middleware';

const Router = express.Router();

const adminController = new AdminController();

/////////////////////////////////////////////////
///////Auth
/////////////////////////////////////////////////

// Login
Router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const serviceResponse: LoginUserResponse = await adminController.login({
      email,
      password,
    });
    res.status(200).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Register
// Router.post('/register', async (req: Request, res: Response) => {
//   try {
//     const { email, password, name } = req.body;

//     const serviceResponse: MessageResponse = await adminController.register({
//       email,
//       password,
//       name,
//     });

//     return res.status(201).send(serviceResponse);
//   } catch (error: any) {
//     res.status(error.statusCode).send({ message: error.message });
//   }
// });

// Get admin profile
Router.get('/profile', AdminMiddleware, async (req: Request, res: Response) => {
  try {
    const serviceResponse: GetAdminProfileResponse =
      await adminController.getProfile(req);
    res.send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

/////////////////////////////////////////////////
///////Staff Management
/////////////////////////////////////////////////

// Create staff
Router.post('/staff', async (req: Request, res: Response) => {
  try {
    const { email, password, name, locationId } = req.body;

    const serviceResponse: MessageResponse = await adminController.createStaff({
      email,
      password,
      name,
      locationId,
    });
    return res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Get all staffes
Router.get('/staff', async (req: Request, res: Response) => {
  try {
    const serviceResponse: Staff[] = await adminController.getStaffes();
    return res.status(200).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Get a staff
Router.get('/staff/:id', async (req: Request, res: Response) => {
  try {
    const serviceResponse: Staff = await adminController.getStaff(
      req.params.id
    );
    return res.status(200).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Update a staff
Router.patch('/staff/:id', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const serviceResponse: MessageResponse = await adminController.updateStaff(
      req.params.id,
      { name, email }
    );
    return res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Delete a staff
Router.delete('/staff/:id', async (req: Request, res: Response) => {
  try {
    const serviceResponse = await adminController.deleteStaff(req.params.id);
    return res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

/////////////////////////////////////////////////
///////Location management
/////////////////////////////////////////////////

// Create location
Router.post('/location', async (req: Request, res: Response) => {
  try {
    const { name, address, phone, seat } = req.body;

    const serviceResponse: MessageResponse =
      await adminController.createLocation({ name, address, phone, seat });
    return res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Update location
Router.patch('/location/:id', async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;

    const serviceResponse: MessageResponse =
      await adminController.updateLocation(parseInt(req.params.id), {
        name,
        address,
        phone,
      });
    return res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

/////////////////////////////////////////////////
///////Movie management
/////////////////////////////////////////////////

// Create movie
Router.post('/movie', async (req: Request, res: Response) => {
  try {
    const { name, description, length } = req.body;

    const serviceResponse: MessageResponse = await adminController.createMovie({
      name,
      description,
      length,
    });
    return res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode).send({ message: error.message });
  }
});

// Update a movie
Router.patch('/movie/:id', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const serviceResponse: MessageResponse = await adminController.updateMovie(
      parseInt(req.params.id),
      { name, description }
    );
    return res.status(201).send(serviceResponse);
  } catch (error: any) {
    res.status(error.statusCode ?? 500).send({ message: error.message });
  }
});

export default Router;
