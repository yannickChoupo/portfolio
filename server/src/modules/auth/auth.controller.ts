import { NextFunction, Response } from 'express'
import { AuthRequest } from '../../types/api'
import User from '../../models/user.model'
import { AppError } from '../../errors/AppError'


// GET CURRENT USER
export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user

    if (!authUser) {
      throw new AppError('User not found', 404);
    }

    const alreadyExists = await User.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    })

    if (alreadyExists) {
      throw new AppError('User already exists', 409);
    }

    return res.json({
      status: 'OK',
      user: alreadyExists,
    })
  } catch (error) {
    return next(error);
  }
}

// export const register = async (req: Request, res: Response) => {

//   try {
//     const { name, email, phone, password } = req.body

//     if (!phone || !password || !name || !email) {
//       return res.status(400).json({ error: 'All fields are required' })
//     }

//     const user = await createUser({
//       name,
//       email,
//       phone,
//       password,
//     });

//     const passwordWorks = await bcrypt.compare(
//       password,
//       user.password,
//     );


//     const accessToken = signAccessToken({
//       userId: user.id,
//       role: user.role,
//       phone: user.phone,
//     })

//     const refreshToken = signRefreshToken({
//       userId: user.id,
//     })

//     await prisma.refreshToken.create({
//       data: {
//         token: refreshToken,
//         userId: user.id,
//         expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//       },
//     })

//     const { password: _, ...publicUser } = user
//     res.status(201).json({
//       ...publicUser,
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     })
//   } catch (err) {
//     console.error('REGISTER ERROR:', err);
//     res.status(400).json({ error: 'Unable to create user' })
//   }
// }

// export const login = async (req: Request, res: Response) => {
//   const { phone, password } = req.body;


//   const user = await findUserByPhone(phone);

//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   const isValid = await bcrypt.compare(password, user.password);

//   if (!isValid) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   const accessToken = signAccessToken(
//     {
//       userId: user.id,
//       role: user.role,
//       phone: user.phone,
//     },
//   );
//   const refreshToken = signRefreshToken(
//     {
//       userId: user.id,
//     },
//   );

//   await prisma.refreshToken.create({
//     data: {
//       token: refreshToken,
//       userId: user.id,
//       expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     },
//   });

//   const { password: _, ...publicUser } = user;

//   res.json({
//     accessToken,
//     refreshToken,
//     user: publicUser,
//   });
// };

// export const logout = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;

//   await prisma.refreshToken.deleteMany({
//     where: { token: refreshToken },
//   });

//   return res.json({ message: 'Logged out' });
// };

// export const healthCheck = async (req: Request, res: Response) => {
//   try {
//     // lightweight DB check
//     await prisma.$queryRaw`SELECT 1`
//     res.status(200).json({
//       status: 'OK',
//       modules: {
//         auth: true,
//       },
//       uptime: process.uptime(),
//       env: process.env.NODE_ENV || 'development',
//     })
//   } catch (error) {
//     res.status(500).json({
//       status: 'ERROR',
//       db: 'disconnected',
//       modules: {
//         auth: true, // auth is code-level, not DB-dependent
//       },
//     })
//   }
// }

