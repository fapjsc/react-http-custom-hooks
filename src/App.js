import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

// Hooks
import useHttp from './hooks/useHttp';

// Api
const url = 'https://test-9a22d-default-rtdb.asia-southeast1.firebasedatabase.app/task.json';

function App() {
  // Init State
  const [tasks, setTasks] = useState([]);

  // Hooks
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    // Hooks Arg
    const transformTasks = taskObj => {
      const loadedTasks = [];
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks({ url }, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </React.Fragment>
  );
}

export default App;
