import * as express from 'express';

const Router = express.Router();

// Routes
import CustomerRoutes from './customer.router';
import AdminRoutes from './admin.router';
import StaffRoutes from './staff.router';
import UtilRoutes from './util.router';

Router.use('/customer', CustomerRoutes);
Router.use('/admin', AdminRoutes);
Router.use('/staff', StaffRoutes);
Router.use('/util', UtilRoutes);

export default Router;
