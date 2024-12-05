import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(5, 'Password must have at least 5 characters')
});

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(5, 'Password must have at least 5 characters')
});

export const contentSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    owner: z.string().min(1, 'Owner is required'),
    durationHours: z.number().min(1, 'Duration is required').optional(),
    durationMinutes: z.number().min(1, 'Duration is required').optional(),
    ageRestriction: z.string().min(1, 'Age restriction is required'),
    releaseYear: z.string().min(1, 'Release year is required')
});