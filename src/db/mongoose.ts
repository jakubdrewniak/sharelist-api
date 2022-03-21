import {connect} from "mongoose";

declare var process : {
  env: {
    MONGODB_URI: string
  }
}

export const connectToDB = () => {
  return connect(
    process.env.MONGODB_URI
  );
};
