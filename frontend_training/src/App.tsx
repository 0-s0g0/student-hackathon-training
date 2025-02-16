import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string;
  text: string;
  isComplete: boolean;//task3
  isEdit: boolean;//task4
};

function App() {
  const [task, setTask] = useState<string>(""); // 入力されたタスク
  const [tasks, setTasks] = useState<Task[]>([]); // タスク一覧

  const addTaskList = () => {
    if (task.trim() === "") return;//空なら追加しない
    const newTask: Task = { id: uuidv4(), text: task, isComplete: false, isEdit: false };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const completeTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: true } : task));
  };

  const toggleEditTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEdit: !task.isEdit } : task));
  };

  const updateTask = (id: string, newText: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEdit: false } : task));
  };

  return (
    <>
      <h1>TODOアプリ</h1>
      <div className='textbox'>
        <input 
          className='taskinput'
          type="text" 
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className='addButton' onClick={addTaskList}>追加</button>
      </div>
      <ul>
        {tasks.filter(task => !task.isComplete).map((task) => (
          <li key={task.id}>
            {task.isEdit ? (
              <EditingTask task={task} updateTask={updateTask} toggleEditTask={toggleEditTask} />
            ) : (
              <div className='tasklist'>
                <span className='task' onClick={() => toggleEditTask(task.id)}>{task.text}</span>
                <button className='finishButton' onClick={() => completeTask(task.id)}>完了</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

//編集用コンポーネント
type EditingTaskProps = {
  task: Task;
  updateTask: (id: string, newText: string) => void;
  toggleEditTask: (id: string) => void;
};

const EditingTask: React.FC<EditingTaskProps> = ({ task, updateTask, toggleEditTask }) => {
  const [editText, setEditText] = useState(task.text);

  return (
    <div  className='Edit'>
      <input
        className='editinput'
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <div  className='Buttons'>
        <button className='renewButton' onClick={() => updateTask(task.id, editText)}>更新</button>
        <button className='cancelButton' onClick={() => toggleEditTask(task.id)}>キャンセル</button>
      </div>
    </div>
  );
};

export default App;
