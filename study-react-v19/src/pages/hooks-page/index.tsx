import { Dividing } from "../../components/Dividing";
import { UseFormStatusPage } from "./use-formStatus";
import { UseOptimisticPage } from './use-Optimistic'

export function HooksPage() {
  return (
    <div>
      <UseFormStatusPage />
      <Dividing />
      <UseOptimisticPage />
    </div>
  )
}


