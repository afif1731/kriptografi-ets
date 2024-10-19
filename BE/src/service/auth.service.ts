import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import { CustomError } from '../middleware';
import {
  type LoginRequest,
  type JwtPayload,
  type RegisterRequest,
} from '../model';
import { AuthRepository } from '../repository';
import { generateAccessToken } from '../utils/jwt.utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthService = {
  async login(request: LoginRequest) {
    try {
      const accountExist = await AuthRepository.findAccountByEmail(
        request.email,
      );

      if (!accountExist) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'account not found');
      }

      const isPasswordMatch = bcrypt.compareSync(
        request.password,
        accountExist.password,
      );

      if (!isPasswordMatch) {
        throw new CustomError(StatusCodes.UNAUTHORIZED, 'invalid credentials');
      }

      const payload: JwtPayload = {
        user_email: request.email,
        user_id: accountExist.id,
        role: accountExist.role,
      };

      const token = generateAccessToken(payload);

      return {
        token: token,
      };
    } catch (error: any) {
      throw error;
    }
  },

  async register(request: RegisterRequest) {
    try {
      const accountExist = await AuthRepository.findAccountByEmail(
        request.email,
      );

      if (accountExist) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          'email is already registered',
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass: string = await bcrypt.hash(request.password, salt);

      const newAccount = await AuthRepository.createAccount(
        request.name,
        request.email,
        hashedPass,
      );

      return newAccount;
    } catch (error: any) {
      throw error;
    }
  },
};
