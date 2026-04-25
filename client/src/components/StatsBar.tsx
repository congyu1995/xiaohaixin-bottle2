import React from 'react';
import { Stats } from '../types/mood';

interface StatsBarProps {
  stats: Stats;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-label">总心情</span>
        <span className="stat-value">{stats.total.toLocaleString()}</span>
      </div>
      <div className="stat-divider"></div>
      <div className="stat-item">
        <span className="stat-label">今日新增</span>
        <span className="stat-value today">{stats.todayNew}</span>
      </div>
    </div>
  );
};
