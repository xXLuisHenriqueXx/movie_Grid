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
    description: z.string().min(1, 'Description is required').optional(),
    owner: z.string().min(1, 'Owner is required').optional(),
    durationHours: z.string().min(1, 'Duration is required').optional(),
    durationMinutes: z.string().min(1, 'Duration is required').optional(),
    ageRestriction: z.string().min(1, 'Age restriction is required').optional(),
    tags: z.array(z.string()).min(1, 'At least one tag is required').optional(),
    releaseYear: z.string().min(1, 'Release year is required').optional()
});

export const episodeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    durationHours: z.string().min(1, 'Duration is required'),
    durationMinutes: z.string().min(1, 'Duration is required'),
    season: z.string().min(1, 'Season is required'),
    episodeNumber: z.string().min(1, 'Episode is required')
});