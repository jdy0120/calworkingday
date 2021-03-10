import {Request, Response} from 'express';
import {admin, myPool} from '../_config/db';
import {ContextAuth} from '../types';

/**
 * ContextAuth
 */
export const getContextAuth = async (
  request: Request,
): Promise<ContextAuth> => {
  const authHeader = request.headers.authorization;

  const contextAuth: ContextAuth = {};

  if (!authHeader) return null;

  const bearer = authHeader.split(' ');
  const idToken = bearer[1];

  const decodedToken = await admin.auth().verifyIdToken(idToken);

  contextAuth.uid = decodedToken.uid;
  contextAuth.token = decodedToken;

  return contextAuth;
};
