import { Schema, model, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { USER_REF } from "./refs";
import { hash, compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;

  tokens: [{ token: string }];
}

interface IUserDocument extends IUser, Document {
  generateAuthToken: () => Promise<string>;
}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials: (
    email: string,
    password: string
  ) => Promise<IUserDocument>;
}

const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }

  next();
});

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (user) {
    const passwordIsMatching = await compare(password, user.password);
    if (passwordIsMatching) return user;
  }

  throw new Error("Invalid credentials!");
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET as string
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = model<IUserDocument, IUserModel>(USER_REF, userSchema);
export default User;
