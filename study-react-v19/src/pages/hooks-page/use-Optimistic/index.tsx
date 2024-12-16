import { useOptimistic, useRef, useState } from 'react';
import { updateName } from '../../../apis';

export function UseOptimisticPage() {
  const [databaseData, setDatabaseData] = useState<string>('Kellen')
  const currentName = 'Kellen'
  
  const [optimisticName, setOptimisticName] = useOptimistic<FormDataEntryValue | null>(currentName);

  const submitAction = async (formData: FormData) => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    const updatedName = (await updateName({ name : newName }));
    
    onUpdateName(updatedName);
  };

  const onUpdateName = (data: Record<string,any>) => {
    setDatabaseData(data);
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {String(optimisticName)}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
      <p>name: {databaseData?.name || '-' }</p>
    </form>
  )
  
}

export type Task = {
  text: string;
  spending: boolean;
  /** 状态 */
  status: boolean;
}



function TodoList({ tasks, addNewTask }: { tasks: Task[]; addNewTask: () => void }) {
  const formRef = useRef(null);

  const [ optimisticTasks, addOptimisticTask ] = useOptimistic<Task[], string>(
    tasks,
    function(state, newTask) {
      return [
        ...state, 
        {
          text: newTask,
          spending: false,
          status: false
        }
      ]
    }
  )

  return (
    <div>
      {
        optimisticTasks?.map()
      }
    </div>
  )
}