import { useState, useTransition } from 'react';
import { updateName } from '../../../apis';

export function UseTransitionPage() {
  const [name, setName] = useState<string>("");
  const [databaseData, setDatabaseData] = useState<Record<string,string>>()
  const [error, setError] = useState<string>('');
  
  /** 使用 startTransition 自动处理挂起状态，也就是竞态处理 */
  const [isPending, startTransition] = useTransition();

  console.log({isPending});
  
  const handleSubmit = () => {
    
    /** update */
    startTransition(async () => {
      const res = await updateName({ name });
      if (res.state === '0') {
        setError(res.message);
        return;
      }
      setError('')
      setDatabaseData(res.data)
      return
    })
    
  };

  return (
    <div>
      <h3>useTransition: 使用 startTransition 自动处理挂起状态，也就是竞态处理</h3>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      <p>name: {databaseData?.name || '-' }</p>
      {error && <p className='text-red-400'>{`error: ${error}`}</p>}
    </div>
  );
}