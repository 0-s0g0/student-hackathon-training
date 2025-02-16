import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string;
  text: string;
  isComplete: boolean;
};

function App() {
  const [task, setTask] = useState<string>(""); // 入力されたタスク
  const [tasks, setTasks] = useState<Task[]>([]); // タスク一覧

  const addTaskList = () => {
    if (task.trim() === "") return; // 空のタスクは追加しない
    const newTask: Task = { id: uuidv4(), text: task, isComplete: false };
    setTasks([...tasks, newTask]); // 新しいタスクをリストに追加
    setTask(""); // 入力欄をクリア
  };

  const completeTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: true } : task));
  };

  return (
    <>
      <h1>TODOアプリ</h1>
      <div className='textbox'>
        <input 
          type="text" 
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button 
         className='addButton'
         onClick={addTaskList}
        >追加</button>
      </div>
      <ul>
        {tasks.filter(task => !task.isComplete).map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => completeTask(task.id)}>完了</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
