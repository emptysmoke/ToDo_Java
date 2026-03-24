import { useState } from "react";

interface FilterProps {
  onConditionChange: (status: string, start: string, end: string) => Promise<void>;
}


export const TaskFilter = ( {onConditionChange}: FilterProps) => {
  const [selectedComplete, setSelectedComplete] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const completedOptions = [
    { value: '', label: '全て'}, 
    { value: 'true', label: '完了'}, 
    { value: 'false', label: '未完了'}
  ]

  const updateFilters = (status: string, start: string, end: string) => {
    onConditionChange(status, start, end);
  }

  return (
    <div>
        <p>フィルター</p>
        <select value={selectedComplete} onChange={(e) => {
          setSelectedComplete(e.target.value);
          updateFilters(e.target.value, startDate, endDate);
          }}>
          {completedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p>期限（開始）</p>
        <input type="date" value={startDate} 
        onChange={(e) => {
          setStartDate(e.target.value);
          updateFilters(selectedComplete, e.target.value, endDate);
        }} />
        <p>期限（終了）</p>
        <input type="date" value={endDate} 
        onChange={(e) => {
          setEndDate(e.target.value);
          updateFilters(selectedComplete, startDate, e.target.value);
        }} />
      <p>並び替え</p>
    </div>
  )
}