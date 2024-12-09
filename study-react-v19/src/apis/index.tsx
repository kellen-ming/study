export type Result = {
  state: '0' | '1'
  message: string
  data: Record<string, string>
}

export async function updateName(data: Record<string, string>): Promise<Result> {
  console.log('run...');
  

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