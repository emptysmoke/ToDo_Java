import { todoService } from '../services/todoServices';
import type { Task } from '../types/Task';
import { useRef } from 'react';

interface TodoListProps {
  tasks: Task[];
  refreshList: () => Promise<void>;
  notify: (text: string, type?: 'success' | 'error') => void;
}

// leash for each item
const TodoItem = ({ task, onUpdate, onDelete, onToggle }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split('T')[0];

  return (
    <li style={{display: 'flex', alignItems: 'center', gap: '10px'}} >
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      {!task.completed ? (
      <form action={() => onUpdate(task.id, nameRef.current?.value, dateRef.current?.value)}>
        <input type="text" ref={nameRef} defaultValue={task.name} style={{ margin: '0 10px 0 0'}}
          required
          maxLength={20}
          onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('タスク名を入力してください。')}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <span>期限：</span>
        <input type="date" ref={dateRef} defaultValue={task.deadline} 
          required
          min={today}
          onInvalid={(e) => {
            const target = e.target as HTMLInputElement;

            if (target.validity.valueMissing) {
              target.setCustomValidity('期限を選択してください。');
            }
            else if (target.validity.rangeUnderflow) {
              target.setCustomValidity('本日以降の日付を選択してください。')
            }
          }}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <button type="submit">修正</button>
      </form>
    ) : (<span>{task.name} 期限：{task.deadline}</span>)
    }
    <button type="button" onClick={() => onDelete(task.id)}>削除</button>
    </li>
  );
};

export const TodoList = ({ tasks, refreshList, notify }: TodoListProps) => {
  const toggleTask = async (id: number | undefined) => {
    if(!id) return;

    const currentTask = tasks.find(t => t.id === id);
    if(!currentTask) return;

    try {
      const updated = {...currentTask, completed: !currentTask.completed};
      await todoService.updateTodo(id, updated);
      await refreshList();
    } catch (err) {
      notify("更新に失敗しました", "error");
    }
  };

  const deleteTask = async (id: number | undefined) => {
    if(!id) return;

    const confirmed = window.confirm("このタスクを削除してもよろしいですか？");
    if(!confirmed) return;

    try {
      await todoService.deleteTodo(id);
      await refreshList();
      notify("削除しました！");
    } catch {
      notify("削除に失敗しました", "error");
    }
  }

  // TODO: redundant. Create a function which will handle the repetative part.
  // TODO: fix it so it shows error 500 as well.
  const updateTask = async (id: number | undefined, name: string | undefined, deadline: string | undefined) => {
    if(!id) return;

    const currentTask = tasks.find(t => t.id === id);
    if(!currentTask) return;

    if (name && deadline) {
      try {
        const updated = {...currentTask, name: name, deadline: deadline};
        await todoService.updateTodo(id, updated);
        await refreshList();
        notify("更新しました！");
      } catch (err) {
        notify("更新に失敗しました", "error");
      }
    }
  }

  return (
    <div>
      <h2>ToDo リスト</h2>
      {tasks.length === 0 ? (
        <p>タスクがありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
             />
          ))}
        </ul>
      )}
    </div>
  );
};