import { Router } from 'express';
import {
  getMoods,
  getStats,
  createMood,
  getUserState,
  toggleResonance,
  reportMood,
  incrementViewCount,
} from '../controllers/moodController';

const router = Router();

// 获取心情列表
router.get('/moods', getMoods);

// 获取统计数据
router.get('/stats', getStats);

// 发布心情
router.post('/moods', createMood);

// 获取用户状态
router.get('/user-state/:userId', getUserState);

// 共鸣操作
router.post('/resonance', toggleResonance);

// 举报操作
router.post('/report', reportMood);

// 增加浏览数
router.patch('/moods/:moodId/view', incrementViewCount);

export default router;
