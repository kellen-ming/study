export type Result = {
  state: '0' | '1'
  message: string
  data: Record<string, any>
}

export async function updateName(data: Record<string, any>): Promise<Result> {
  console.log('run...', {data});

  return new Promise((resolve) => {
    setTimeout(() => {
      // if(Math.random() > 0.3) {
        // resolve({
        //   state: '1',
        //   message: 'success',
        //   data
        // })
      // } {
        resolve({
          state: '0',
          message: 'failed',
          data
        })
      // }
      
    }, 2000)
  })
}

export async function submitForm(query: FormData) {
  console.log('run...', {query: query.get('name')});
  await new Promise((res) => setTimeout(res, 1000));
}

/** 新增代表事件 */
export async function addTodoAction(todo: string) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(todo);
      } else {
        reject("Failed!");
      }
    }, 1000);
  });
}