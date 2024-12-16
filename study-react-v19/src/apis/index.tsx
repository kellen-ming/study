export type Result = {
  state: '0' | '1'
  message: string
  data: Record<string, any>
}

export async function updateName(data: Record<string, any>): Promise<Result> {
  console.log('run...', {data});

  return new Promise((resolve) => {
    setTimeout(() => {
      if(!data?.name) {
        resolve({
          state: '0',
          message: 'name is required',
          data
        })
      }
      
      resolve({
        state: '1',
        message: 'success',
        data
      })
    }, 2000)
  })
}

export async function submitForm(query: FormData) {
  console.log('run...', {query: query.get('name')});
  await new Promise((res) => setTimeout(res, 1000));
}


export async function deliverMessage(message: FormDataEntryValue | null) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
