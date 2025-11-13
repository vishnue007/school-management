import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    role: z.string().min(1, "Role is required"),
    phone: z.string().min(6, "Phone is required"),
    schoolId: z.string().min(1, "School ID is required"),
    profilePicture: z.string().url("Profile picture must be a valid URL").optional(),
    address: z.string().min(1, "Address is required"),
    classSection: z.string().min(1, "Class/Section is required").optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type RegisterInput = z.infer<typeof registerSchema>;

type RegisteredUser = Omit<RegisterInput, "confirmPassword"> & {
  id: string;
  createdAt: string;
};

const users: RegisteredUser[] = [];

export const registerUser = (req: Request, res: Response) => {
  const parsedBody = registerSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsedBody.error.flatten()
    });
  }

  const data = parsedBody.data;

  const existingUser = users.find((user) => user.email === data.email);

  if (existingUser) {
    return res.status(409).json({
      message: "Email already registered"
    });
  }

  const newUser: RegisteredUser = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
    password: data.password
  };

  // In a production app you would hash the password and persist to a database.
  users.push(newUser);

  const { password, ...safeUser } = newUser;

  return res.status(201).json({
    message: "Registration successful",
    user: safeUser
  });
};

