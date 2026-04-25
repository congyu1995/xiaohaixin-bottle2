import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Mood, Category, Stats } from '../types/mood';
import { generateId, generateNickname, isToday } from '../utils/dataUtils';

const MOODS_KEY = 'mood_bottle_moods';

// 初始模拟数据
const generateInitialMoods = (): Mood[] => {
  const categories: Array<'开心' | '焦虑' | '迷茫' | '吐槽'> = ['开心', '焦虑', '迷茫', '吐槽'];
  const sampleContents = [
    '今天终于完成了一个很难的项目，虽然过程很煎熬，但看到成果的那一刻真的很开心！',
    '工作压力好大，不知道要不要换工作，感觉每天都在重复同样的事情。',
    '最近在纠结要不要回老家发展，大城市太累了，但又舍不得这里的机会。',
    '今天的天气真是让人无语，说好的晴天结果下了一整天雨！',
    '刚刚被老板夸了，说我的方案很有创意，这一周的辛苦都值了！',
    '感觉自己越来越焦虑了，明明没什么大事，但就是睡不着。',
    '快30岁了还不知道自己真正想要什么，看着同龄人一个个结婚买房，心里有点慌。',
    '今天的奶茶太难喝了，点了三分糖结果甜得要死，再也不点这家了！',
    '终于学会了游泳！虽然呛了好几口水，但最后能游起来真的很开心！',
    '最近总是担心各种事情，担心工作、担心健康、担心未来，好累啊。',
  ];

  return sampleContents.map((content, index) => {
    const date = new Date();
    date.setHours(date.getHours() - index * 2); // 每隔2小时一条
    
    return {
      id: `mood_${index + 1}`,
      nickname: `漂流瓶#${Math.floor(Math.random() * 90000) + 10000}`,
      content,
      category: categories[index % 4],
      resonanceCount: Math.floor(Math.random() * 100),
      viewCount: Math.floor(Math.random() * 500) + 50,
      isReported: index === 5, // 第6条标记为已举报
      createdAt: date.toISOString(),
      userId: `user_${index + 1}`,
    };
  });
};

export function useMoodData() {
  const [moods, setMoods] = useLocalStorage<Mood[]>(MOODS_KEY, generateInitialMoods());
  const [selectedCategory, setSelectedCategory] = useState<Category>('全部');
  const [showOnlyReported, setShowOnlyReported] = useState(false);

  // 统计数据
  const stats: Stats = useMemo(() => {
    const total = moods.length;
    const todayNew = moods.filter(mood => isToday(mood.createdAt)).length;
    return { total, todayNew };
  }, [moods]);

  // 筛选后的心情列表
  const filteredMoods = useMemo(() => {
    let result = moods;

    // 分类筛选
    if (selectedCategory !== '全部') {
      result = result.filter(mood => mood.category === selectedCategory);
    }

    // 只看已举报
    if (showOnlyReported) {
      result = result.filter(mood => mood.isReported);
    }

    // 按时间倒序排列
    return result.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [moods, selectedCategory, showOnlyReported]);

  // 发布新心情
  const publishMood = useCallback((content: string, category: '开心' | '焦虑' | '迷茫' | '吐槽', userId: string) => {
    const newMood: Mood = {
      id: generateId(),
      nickname: generateNickname(moods),
      content,
      category,
      resonanceCount: 0,
      viewCount: 0,
      isReported: false,
      createdAt: new Date().toISOString(),
      userId,
    };

    setMoods(prev => [newMood, ...prev]);
    return newMood;
  }, [moods, setMoods]);

  // 更新共鸣数
  const updateResonanceCount = useCallback((moodId: string, delta: number) => {
    setMoods(prev => prev.map(mood => 
      mood.id === moodId
        ? { ...mood, resonanceCount: Math.max(0, mood.resonanceCount + delta) }
        : mood
    ));
  }, [setMoods]);

  // 标记为已举报
  const markAsReported = useCallback((moodId: string) => {
    setMoods(prev => prev.map(mood =>
      mood.id === moodId
        ? { ...mood, isReported: true }
        : mood
    ));
  }, [setMoods]);

  // 增加浏览数
  const incrementViewCount = useCallback((moodId: string) => {
    setMoods(prev => prev.map(mood =>
      mood.id === moodId
        ? { ...mood, viewCount: mood.viewCount + 1 }
        : mood
    ));
  }, [setMoods]);

  return {
    moods,
    filteredMoods,
    selectedCategory,
    setSelectedCategory,
    showOnlyReported,
    setShowOnlyReported,
    stats,
    publishMood,
    updateResonanceCount,
    markAsReported,
    incrementViewCount,
  };
}
