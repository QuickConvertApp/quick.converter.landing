'use client';

import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
});

export type SigninFormValues = z.infer<typeof signinSchema>; 