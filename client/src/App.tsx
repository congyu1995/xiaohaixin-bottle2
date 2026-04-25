import React, { useState } from 'react';
import { useMoodData } from './hooks/useMoodData';
import { useUserState } from './hooks/useUserState';
import { StatsBar } from './components/StatsBar';
import { FilterBar } from './components/FilterBar';
import { MoodList } from './components/MoodList';
import { EmptyState } from './components/EmptyState';
import { PublishModal } from './components/PublishModal';
import './App.css';

function App() {
  const {
    filteredMoods,
    selectedCategory,
    setSelectedCategory,
    showOnlyReported,
    setShowOnlyReported,
    stats,
    publishMood,
    updateResonanceCount,
    markAsReported,
  } = useMoodData();

  const {
    userState,
    hasResonanced,
    toggleResonance,
    hasReported,
    reportMood,
    addPublishedMood,
    canPublish,
  } = useUserState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleResonance = (moodId: string) => {
    const isNowResonanced = toggleResonance(moodId);
    updateResonanceCount(moodId, isNowResonanced ? 1 : -1);
  };

  const handleReport = (moodId: string) => {
    const success = reportMood(moodId);
    if (success) {
      markAsReported(moodId);
    }
  };

  const handlePublish = (content: string, category: '开心' | '焦虑' | '迷茫' | '吐槽') => {
    publishMood(content, category, userState.userId);
    addPublishedMood();
  };

  return (
    <div className="app">
      {/* 头部 */}
      <header className="header">
        <h1 className="header-title">🌊 心情漂流瓶</h1>
        <button className="my-btn">我的</button>
      </header>

      {/* 统计栏 */}
      <StatsBar stats={stats} />

      {/* 筛选栏 */}
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showOnlyReported={showOnlyReported}
        onToggleReported={() => setShowOnlyReported(!showOnlyReported)}
      />

      {/* 内容区域 */}
      <main className="main-content">
        {filteredMoods.length > 0 ? (
          <MoodList
            moods={filteredMoods}
            hasResonanced={hasResonanced}
            hasReported={hasReported}
            onToggleResonance={handleToggleResonance}
            onReport={handleReport}
          />
        ) : (
          <EmptyState
            category={selectedCategory}
            onPublish={() => setIsModalOpen(true)}
          />
        )}
      </main>

      {/* 发布按钮 */}
      <button className="fab-btn" onClick={() => setIsModalOpen(true)}>
        +
      </button>

      {/* 发布浮层 */}
      <PublishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublish}
        canPublish={canPublish()}
        dailyCount={userState.dailyPublishCount}
      />
    </div>
  );
}

export default App;
