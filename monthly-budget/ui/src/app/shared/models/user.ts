export interface IUser {
  password: string,
  username: string,
  authorities: {authority: string}[],
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  enabled: boolean
}
