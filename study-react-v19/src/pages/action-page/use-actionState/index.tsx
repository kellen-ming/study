import { useState, useActionState } from 'react';
import { updateName } from '../../../apis';

export function UseActionStatePage() {
  const [databaseData, setDatabaseData] = useState<Record<string,any>>()
  const [ error, submitAction, isPending ] = useActionState<string | null, FormData>(
    async ( previousState, formData ) => {
      const res = await updateName({ name: formData.get('name') });
      console.log({previousState, formData: formData.values(), res});
      if (res && res.state === '1') {
        setDatabaseData(res.data)
        return null
      }
      return res.message
    },
    null
  )

  return (
    <div>
      <h3>useActionState: 处理 Actions 的常见情况。在react-dom中，我们添加 form Actions 操作来自动管理表单，并通过 useFormStatus 来支持表单中操作的常见情况</h3>
      <form action={submitAction}>
        <input type="text" name="name" />
        <button type="submit" disabled={isPending}>Update</button>
      </form>
     {
       isPending ? <p>pending...</p> :
       <>
       <p>name: {databaseData?.name || '-' }</p>
       {error && <p className='text-red-400'>{`error: ${error}`}</p>}
       </>
     }
    </div>
  );
}