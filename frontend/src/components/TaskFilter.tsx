import { useState } from "react";


export const TaskFilter = (onConditionChange) => {

  const [selectedComplete, setSelectedComplete] = useState('');

  const completedOptions = [
    { value: '', label: '全て'}, 
    { value: 'true', label: '完了'}, 
    { value: 'false', label: '未完了'}
  ]

  const handleSelectedChange = (event) => {
    setSelectedComplete(event.target.value);
  }

  return (
    <div>
        <p>フィルター</p>
        <select value={selectedComplete} onChange={handleSelectedChange}>
          {completedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      <p>並び替え</p>
    </div>
  )
}