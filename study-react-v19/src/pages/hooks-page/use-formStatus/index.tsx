import { useFormStatus } from "react-dom";
import { submitForm } from "../../../apis/index.js";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function Form({ action }: { action: (formData: FormData) => void }) {
  return (
    <form action={action}>
      <input type="text" name="name" />
      <Submit />
    </form>
  );
}

export function UseFormStatusPage() {
  return <div>
    <h2>useFormStatus</h2>
    <p>
      在设计系统中，通常会编写需要访问其所在 form 信息的设计组件，而无需将 props 深入到组件。
      这可以通过 Context 来完成，但为了使常见情况更容易，我们添加了一个新的钩子useFormStatus :
      <br/>
      - useFormStatus读取父级 form 的状态，就好像该表单是上下文提供程序一样。
    </p>
    <Form action={submitForm} />
  </div>
}
