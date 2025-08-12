import type { ActionLog } from '../action-log'
import type { Cnae } from '../cnae'

export type GetCnaeResponse = Cnae & {
  actionLogs: ActionLog[]
  professionals: []
}
