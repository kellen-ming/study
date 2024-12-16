import { Dividing } from '../../components/Dividing'
import { BeforeActions } from './before-actions'
import { UseActionStatePage } from './use-actionState'
import { UseTransitionPage } from './use-transition'

export function ActionPage() {
  return (
    <div>
      <BeforeActions />
      <Dividing />
      <UseTransitionPage />
      <Dividing />
      <UseActionStatePage />
    </div>
  )
}


