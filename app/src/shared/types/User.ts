export enum UserRole {
  manager = 'manager',
  employee = 'employee'
}

export type User = {
  id?: number,
  name: string,
  email: string,
  password?: string,
  role?: UserRole,
}
