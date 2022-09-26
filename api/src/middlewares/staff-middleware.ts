import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Staff } from '../models';
import { SECRET_KEY } from '../configurations/secret-key';
import extractToken from './extractToken';

import { ApiError } from '../utils/ApiError';

const StaffMiddleware = async (
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
    const foundedUser = await Staff.findOne({
      where: { id: decoded.id, isActive: true },
      relations: ['location'],
    });

    if (!foundedUser) throw new ApiError(401, 'Unauthorized');

    // check expiration time
    if (Date.now() <= decoded.exp) throw new ApiError(401, 'Unauthorized');

    req.user = { id: decoded.id, locationId: foundedUser.location.id };
    next();
  } catch (err: any) {
    return res.status(err.statusCode ?? 500).send({ message: err.message });
  }
};

export default StaffMiddleware;
