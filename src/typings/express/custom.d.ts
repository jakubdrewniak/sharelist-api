import { IUserDocument } from "../../models/user";
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: IUserDocument;
    }
  }
}
