import { PERIODO_TESTE_EM_DIAS } from '../lib/config'

export function checkUserInTrial(user: { createdAt: number }) {
  return (
    new Date(user.createdAt).getTime() >
      new Date().getTime() - 1000 * 60 * 60 * 24 * PERIODO_TESTE_EM_DIAS ||
    false
  )
}
