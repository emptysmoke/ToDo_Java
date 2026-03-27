import { useState } from "react";

interface FilterProps {
  onConditionChange: (status: string, start: string, end: string, sort: string) => Promise<void>;
}


export const TaskFilter = ( {onConditionChange}: FilterProps) => {
  const [selectedComplete, setSelectedComplete] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const completedOptions = [
    { value: '', label: '全て'}, 
    { value: 'true', label: '完了'}, 
    { value: 'false', label: '未完了'}
  ]

  const updateFilters = (status: string, start: string, end: string, sort: string) => {
    onConditionChange(status, start, end, sort);
  }

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSelectedComplete('');

    updateFilters('', '', '', sortBy);
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-row title-row">
          <h3>フィルター</h3>
        </div>
        <div className="filter-row label-row">
          <span>状態</span>
          <span className="separator">|</span>
          <span>開始期限</span>
          <span className="separator">|</span>
          <span>終了期限</span>
        </div>
        <div className="filter-row input-row">
          <select value={selectedComplete} onChange={(e) => {
            setSelectedComplete(e.target.value);
            updateFilters(e.target.value, startDate, endDate, sortBy);
            }}>
            {completedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input type="date" value={startDate} 
          onChange={(e) => {
            setStartDate(e.target.value);
            updateFilters(selectedComplete, e.target.value, endDate, sortBy);
          }} />
          <input type="date" value={endDate} 
          onChange={(e) => {
            setEndDate(e.target.value);
            updateFilters(selectedComplete, startDate, e.target.value, sortBy);
          }} />
        </div>
        <div className="filter-row button-row">
          <button onClick={handleReset}>リセット</button>
        </div>
      </div>
      <div className="filter-row sort-row">
        <span>並び替え：</span>
        <label>
          <input type="radio" name="sort" value="createdAt" checked={sortBy === 'createdAt'} 
                onChange={(e) => { setSortBy(e.target.value); updateFilters(selectedComplete, startDate, endDate, e.target.value); }} />
          作成順
        </label>
        <label>
          <input type="radio" name="sort" value="deadlineAsc" checked={sortBy === 'deadlineAsc'} 
                onChange={(e) => { setSortBy(e.target.value); updateFilters(selectedComplete, startDate, endDate, e.target.value); }} />
          期限が近い順
        </label>
        <label>
          <input type="radio" name="sort" value="deadlineDesc" checked={sortBy === 'deadlineDesc'} 
                onChange={(e) => { setSortBy(e.target.value); updateFilters(selectedComplete, startDate, endDate, e.target.value); }} />
          期限が遠い順
        </label>
      </div>
    </div>
  )
}