const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(10),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN"]),
  city: z.string(),
  street: z.string(),
  pin: z.string().length(6),
});

const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
  categoryId: z.number(),
});

const addToCartSchema = z.object({
  userId: z.string().regex(/^\d+$/),
  productId: z.string().regex(/^\d+$/),
  quantity: z
    .string()
    .transform(Number)
    .refine((val) => val > 0),
});

module.exports = {
  createUserSchema,
  createProductSchema,
  addToCartSchema,
};
