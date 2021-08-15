import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useHttp from '../../hooks/useHttp';

const url = 'https://test-9a22d-default-rtdb.asia-southeast1.firebasedatabase.app/task.json';

const NewTask = props => {
  // Use Http Hook
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async taskText => {
    sendTaskRequest(
      {
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
      // taskData => createTask(taskText, taskData)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
