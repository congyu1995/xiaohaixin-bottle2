import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { UserState } from '../types/mood';
import { generateUserId, getTodayDateString } from '../utils/dataUtils';

const USER_STATE_KEY = 'mood_bottle_user_state';

const initialUserState: UserState = {
  userId: generateUserId(),
  resonanceIds: [],
  reportIds: [],
  publishedMoodIds: [],
  dailyPublishCount: 0,
  lastPublishDate: getTodayDateString(),
};

export function useUserState() {
  const [userState, setUserState] = useLocalStorage<UserState>(USER_STATE_KEY, initialUserState);

  // 检查并重置每日计数
  const checkAndResetDailyCount = useCallback(() => {
    const today = getTodayDateString();
    if (userState.lastPublishDate !== today) {
      setUserState(prev => ({
        ...prev,
        dailyPublishCount: 0,
        lastPublishDate: today,
      }));
      return 0;
    }
    return userState.dailyPublishCount;
  }, [userState.lastPublishDate, userState.dailyPublishCount, setUserState]);

  // 检查是否已共鸣
  const hasResonanced = useCallback((moodId: string) => {
    return userState.resonanceIds.includes(moodId);
  }, [userState.resonanceIds]);

  // 切换共鸣状态
  const toggleResonance = useCallback((moodId: string) => {
    const hasResonancedBefore = userState.resonanceIds.includes(moodId);
    
    setUserState(prev => ({
      ...prev,
      resonanceIds: hasResonancedBefore
        ? prev.resonanceIds.filter(id => id !== moodId)
        : [...prev.resonanceIds, moodId],
    }));

    return !hasResonancedBefore; // 返回新状态
  }, [userState.resonanceIds, setUserState]);

  // 检查是否已举报
  const hasReported = useCallback((moodId: string) => {
    return userState.reportIds.includes(moodId);
  }, [userState.reportIds]);

  // 举报心情
  const reportMood = useCallback((moodId: string) => {
    if (userState.reportIds.includes(moodId)) {
      return false; // 已举报
    }

    setUserState(prev => ({
      ...prev,
      reportIds: [...prev.reportIds, moodId],
    }));

    return true;
  }, [userState.reportIds, setUserState]);

  // 添加发布的心情
  const addPublishedMood = useCallback(() => {
    const today = getTodayDateString();
    
    setUserState(prev => {
      const isNewDay = prev.lastPublishDate !== today;
      return {
        ...prev,
        publishedMoodIds: prev.publishedMoodIds,
        dailyPublishCount: isNewDay ? 1 : prev.dailyPublishCount + 1,
        lastPublishDate: today,
      };
    });
  }, [setUserState]);

  // 检查是否可以发布（每天最多10条）
  const canPublish = useCallback(() => {
    const today = getTodayDateString();
    if (userState.lastPublishDate !== today) {
      return true;
    }
    return userState.dailyPublishCount < 10;
  }, [userState.lastPublishDate, userState.dailyPublishCount]);

  return {
    userState,
    hasResonanced,
    toggleResonance,
    hasReported,
    reportMood,
    addPublishedMood,
    canPublish,
    checkAndResetDailyCount,
  };
}
