import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { USER_REF } from "./refs";
import { hash } from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value: string) {
      if (value && value.length < 8) {
        throw new Error("Password should contain minimum 8 characters");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }

  next();
});

export const User = model<IUser>(USER_REF, userSchema);
