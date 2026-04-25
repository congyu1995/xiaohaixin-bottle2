import { Request, Response } from 'express';
import { Mood } from '../models/Mood';
import { UserState } from '../models/UserState';
import { generateNickname, getTodayDateString, isToday } from '../utils/helpers';
import BadWords from 'bad-words';

const filter = new BadWords();

// 获取心情列表
export const getMoods = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, reported } = req.query;
    
    // 构建查询条件
    let query: any = {};
    
    if (category && category !== '全部') {
      query.category = category;
    }
    
    if (reported === 'true') {
      query.isReported = true;
    }
    
    // 查询并按时间倒序
    const moods = await Mood.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    
    res.json({
      success: true,
      data: moods,
    });
  } catch (error) {
    console.error('获取心情列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取心情列表失败',
    });
  }
};

// 获取统计数据
export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const total = await Mood.countDocuments();
    
    // 今日新增
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayNew = await Mood.countDocuments({
      createdAt: { $gte: todayStart },
    });
    
    res.json({
      success: true,
      data: {
        total,
        todayNew,
      },
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({
      success: false,
      message: '获取统计数据失败',
    });
  }
};

// 发布心情
export const createMood = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, category, userId } = req.body;
    
    // 验证
    if (!content || content.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: '内容不能为空',
      });
      return;
    }
    
    if (content.length > 200) {
      res.status(400).json({
        success: false,
        message: '内容不能超过200字',
      });
      return;
    }
    
    // 敏感词过滤
    if (filter.isProfane(content)) {
      res.status(400).json({
        success: false,
        message: '内容包含敏感词，请修改后重试',
      });
      return;
    }
    
    // 检查用户发布频率
    const userState = await UserState.findOne({ userId });
    const today = getTodayDateString();
    
    if (userState) {
      if (userState.lastPublishDate === today && userState.dailyPublishCount >= 10) {
        res.status(429).json({
          success: false,
          message: '今日发布已达上限（10条/天）',
        });
        return;
      }
    }
    
    // 生成昵称
    const nickname = await generateNickname();
    
    // 创建心情
    const mood = new Mood({
      nickname,
      content: content.trim(),
      category,
      userId,
      ipAddress: req.ip,
    });
    
    await mood.save();
    
    // 更新用户发布计数
    if (userState) {
      if (userState.lastPublishDate === today) {
        userState.dailyPublishCount += 1;
      } else {
        userState.dailyPublishCount = 1;
        userState.lastPublishDate = today;
      }
      await userState.save();
    } else {
      // 创建新的用户状态
      await UserState.create({
        userId,
        dailyPublishCount: 1,
        lastPublishDate: today,
      });
    }
    
    res.status(201).json({
      success: true,
      data: mood,
      message: '发布成功',
    });
  } catch (error) {
    console.error('发布心情失败:', error);
    res.status(500).json({
      success: false,
      message: '发布心情失败',
    });
  }
};

// 获取用户状态
export const getUserState = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    let userState = await UserState.findOne({ userId });
    
    if (!userState) {
      userState = await UserState.create({
        userId,
        lastPublishDate: getTodayDateString(),
      });
    }
    
    res.json({
      success: true,
      data: userState,
    });
  } catch (error) {
    console.error('获取用户状态失败:', error);
    res.status(500).json({
      success: false,
      message: '获取用户状态失败',
    });
  }
};

// 共鸣操作
export const toggleResonance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moodId, userId } = req.body;
    
    const mood = await Mood.findById(moodId);
    if (!mood) {
      res.status(404).json({
        success: false,
        message: '心情不存在',
      });
      return;
    }
    
    const userState = await UserState.findOne({ userId });
    if (!userState) {
      res.status(404).json({
        success: false,
        message: '用户状态不存在',
      });
      return;
    }
    
    const hasResonanced = userState.resonanceIds.includes(moodId);
    
    if (hasResonanced) {
      // 取消共鸣
      userState.resonanceIds = userState.resonanceIds.filter(id => id !== moodId);
      mood.resonanceCount = Math.max(0, mood.resonanceCount - 1);
    } else {
      // 添加共鸣
      userState.resonanceIds.push(moodId);
      mood.resonanceCount += 1;
    }
    
    await userState.save();
    await mood.save();
    
    res.json({
      success: true,
      data: {
        resonanceCount: mood.resonanceCount,
        hasResonanced: !hasResonanced,
      },
    });
  } catch (error) {
    console.error('共鸣操作失败:', error);
    res.status(500).json({
      success: false,
      message: '共鸣操作失败',
    });
  }
};

// 举报操作
export const reportMood = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moodId, userId } = req.body;
    
    const mood = await Mood.findById(moodId);
    if (!mood) {
      res.status(404).json({
        success: false,
        message: '心情不存在',
      });
      return;
    }
    
    const userState = await UserState.findOne({ userId });
    if (!userState) {
      res.status(404).json({
        success: false,
        message: '用户状态不存在',
      });
      return;
    }
    
    // 检查是否已举报
    if (userState.reportIds.includes(moodId)) {
      res.status(400).json({
        success: false,
        message: '您已举报过此内容',
      });
      return;
    }
    
    // 添加举报
    userState.reportIds.push(moodId);
    mood.isReported = true;
    
    await userState.save();
    await mood.save();
    
    res.json({
      success: true,
      message: '举报成功',
    });
  } catch (error) {
    console.error('举报操作失败:', error);
    res.status(500).json({
      success: false,
      message: '举报操作失败',
    });
  }
};

// 增加浏览数
export const incrementViewCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moodId } = req.params;
    
    const mood = await Mood.findByIdAndUpdate(
      moodId,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    
    if (!mood) {
      res.status(404).json({
        success: false,
        message: '心情不存在',
      });
      return;
    }
    
    res.json({
      success: true,
      data: {
        viewCount: mood.viewCount,
      },
    });
  } catch (error) {
    console.error('增加浏览数失败:', error);
    res.status(500).json({
      success: false,
      message: '增加浏览数失败',
    });
  }
};
