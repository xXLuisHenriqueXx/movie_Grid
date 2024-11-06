import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(5, 'Password must have at least 5 characters')
});

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(5, 'Password must have at least 5 characters')
});