import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, CustomError } from '../middleware';
import { type LoginRequest, type RegisterRequest } from '../model';
import { AuthService } from '../service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthController = {
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const token = await AuthService.login(request.body as LoginRequest);
      const result = new CustomResponse(StatusCodes.OK, 'login success', token);

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const account = await AuthService.register(
        request.body as RegisterRequest,
      );

      if (!account) {
        throw new CustomError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'failed to create account',
        );
      }

      const result = new CustomResponse(
        StatusCodes.CREATED,
        'register success',
        {},
      );

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },
};
