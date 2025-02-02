import { useState } from 'react';
import { updateName } from '../../../apis';

export function BeforeActions() {
  const [name, setName] = useState<string>("");
  const [databaseData, setDatabaseData] = useState<Record<string, any>>()
  const [error, setError] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const res = await updateName({ name });
    setIsPending(false);
    
    if (res.state === '0') {
      setError(res.message);
      return;
    }
    
    setError('')
    setDatabaseData(res.data)
  };

  return (
    <div>
      <h3>useState</h3>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      <p>{isPending ? 'pending...' : ''}</p>
      <p>name: {databaseData?.name || '-' }</p>
      {error && <p style={{ color: 'red' }}>{`error: ${error}`}</p>}
    </div>
  );
}