import { ChangeEvent } from "react"

function App() {

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  console.log('rendering...');
  return <input defaultValue={'guang'} onChange={onChange}/>
}

export default App