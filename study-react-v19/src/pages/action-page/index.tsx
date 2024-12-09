import { Dividing } from '../components/Dividing'
import { BeforeActions } from './before-actions'
import { NowActions } from './now-actions'

export function ActionPage() {
  return (
    <div>
      <BeforeActions />
      <Dividing />
      <NowActions />
    </div>
  )
}


