import * as express from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from './configurations/secret-key';

const secret = SECRET_KEY;
console.log('secret is', secret);

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.log('inside');
  if (securityName === 'jwt') {
    let token: string = '';
    if (
      request.headers.authorization &&
      request.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = request.headers.authorization.split(' ')[1];
    }

    console.log('token is', token);

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      }
      verify(token, secret, (err: any, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          console.log('decoded is', decoded);
          request.user.id = decoded;
          resolve(decoded);
        }
      });
    });
  }
  return Promise.reject({});
}
