import { Request } from 'express'
import 'dotenv/config'
import { Role } from '../types/api'

export interface AuthRequest extends Request {
  user?: {
    userId: number
    role: Role
    phone: string
  }
}

// export const authenticate = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'No token' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = verifyAccessToken(token) as any;

//     req.user = decoded;

//     next();
//   } catch {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };