import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const autheHeader = request.headers.authorization;

    if (!autheHeader) {
        throw new AppError('Token missing', 401);
    }
    // [0] = Bearer
    // [1] = token
    const [, token] = autheHeader.split(' ');

    try {
        // verifica se existe um token
        const { sub: user_id } = verify(
            token,
            'd41d8cd98f00b204e9800998ecf8427e',
        ) as IPayload;
        // verifica se o user existe
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new AppError('User does not exists!', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
}