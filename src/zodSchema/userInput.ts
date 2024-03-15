import z from 'zod';

export const UpdateUserSchema = z.object({
  username: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Username is too short',
        });
      }
    }),
  email: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email address is invalid',
        });
      }
    }),
  name: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Name is required',
        });
      }
    }),
  city: z.string().trim(),
  address: z.string().trim(),
  phone: z.string().trim(),
  role: z.string().trim(),
  id: z.number(),
});

export type UserUpdate = z.infer<typeof UpdateUserSchema>;
