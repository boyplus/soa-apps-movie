import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Admin } from '../models';
import { SECRET_KEY } from '../configurations/secret-key';
import extractToken from './extractToken';

import { ApiError } from '../utils/ApiError';

const AdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);

    // token is not attached
    if (!token) throw new ApiError(401, 'Unauthorized');

    const decoded = verify(token, SECRET_KEY) as any;

    if (!decoded) throw new ApiError(401, 'Unauthorized');

    // is user existed
    const foundedUser = await Admin.findOne({
      where: { id: decoded.id },
    });

    if (!foundedUser) throw new ApiError(401, 'Unauthorized');

    // check expiration time
    if (Date.now() <= decoded.exp) throw new ApiError(401, 'Unauthorized');

    req.user = { id: decoded.id };
    next();
  } catch (err: any) {
    return res.status(err.statusCode ?? 401).send({ message: err.message });
  }
};

export default AdminMiddleware;
