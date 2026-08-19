// export interface ApiError extends Error {
//     error: string;
//     message?: string;
//     statusCode?: number;
// }

export interface ApiResponse<T> {
    data: T;
}

export interface ExerciseLog {
    description: string;
    duration: number;
    date: string;
}

export interface ExerciseUserResponse {
    username: string;
    _id: string;
    count: number;
    log: ExerciseLog[];
}

export interface ErrorResponse {
    error: string;
}

export interface LogParams {
    _id: string;
}

export interface LogQuery {
    from?: string;
    to?: string;
    limit?: string;
}


export const Role = {
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
  PLAYER: 'PLAYER'
} as const

export type Role = (typeof Role)[keyof typeof Role]

export interface AuthRequest extends Request {
  user?: {
    userId: number
    role: Role
    phone: string
  }
}