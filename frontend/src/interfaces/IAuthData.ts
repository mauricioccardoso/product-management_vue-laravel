import type { IUserData } from './IUserData'

export interface IAuthData {
  message: string
  token: string
  user: IUserData
}
