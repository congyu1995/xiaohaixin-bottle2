import mongoose, { Schema } from 'mongoose';
import { IMood, Category } from '../types';

// 心情Schema
const MoodSchema: Schema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 1,
    },
    category: {
      type: String,
      required: true,
      enum: ['开心', '焦虑', '迷茫', '吐槽'] as Category[],
      index: true,
    },
    resonanceCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isReported: {
      type: Boolean,
      default: false,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    ipAddress: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'moods',
  }
);

// 索引
MoodSchema.index({ createdAt: -1 });
MoodSchema.index({ category: 1, createdAt: -1 });
MoodSchema.index({ isReported: 1 });

export const Mood = mongoose.model<IMood>('Mood', MoodSchema);
