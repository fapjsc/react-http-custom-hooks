import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

// Hooks
import useHttp from './hooks/useHttp';

function App() {
  // Init State
  const [tasks, setTasks] = useState([]);

  // Hooks Arg
  const transformTasks = taskObj => {
    const loadedTasks = [];
    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTasks);
  };

  // Hooks
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(
    {
      url: 'https://react-http-1bdfa-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
    },
    transformTasks
  );

  useEffect(() => {
    fetchTasks();
  }, []);

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
