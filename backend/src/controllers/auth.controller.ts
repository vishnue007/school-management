import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { UserModel } from "../models/user.model.js";

const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    role: z.string().min(1, "Role is required"),
    phone: z.string().min(6, "Phone is required").optional(),
    schoolId: z.string().min(1, "School ID is required"),
    profilePicture: z.string().min(1).optional(),
    address: z.string().min(1, "Address is required"),
    classSection: z.string().min(1, "Class/Section is required").optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type RegisterInput = z.infer<typeof registerSchema>;

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsedBody = registerSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsedBody.error.flatten()
    });
  }

  try {
    const { confirmPassword, password, ...rest } = parsedBody.data;

    const existingUser = await UserModel.findOne({
      email: rest.email
    }).lean();

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      ...rest,
      password: hashedPassword
    });

    const userObject = newUser.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = userObject;

    return res.status(201).json({
      message: "Registration successful",
      user: safeUser
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    return next(error);
  }
};

