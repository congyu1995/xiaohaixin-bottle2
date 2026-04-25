import mongoose, { Schema } from 'mongoose';
import { IUserState } from '../types';

// 用户状态Schema
const UserStateSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    resonanceIds: {
      type: [String],
      default: [],
    },
    reportIds: {
      type: [String],
      default: [],
    },
    dailyPublishCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastPublishDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'user_states',
  }
);

// 索引
UserStateSchema.index({ userId: 1 });

export const UserState = mongoose.model<IUserState>('UserState', UserStateSchema);
