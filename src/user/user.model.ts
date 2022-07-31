import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}
