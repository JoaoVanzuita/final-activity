import { Environment } from "../../../environment"
import { User } from "../../../types"
import { Api } from "../axios-config"

const create = async (userData: User): Promise<User | Error> => {
  try {

    const { data } = await Api.post('/users', userData)

    return data.id

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const getAll = async (): Promise<User[] | Error> => {
  try {

    const { data } = await Api.get('/users')

    return data.users

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const getByName = async (name: string): Promise<User[] | Error> => {
  try {

    const { data } = await Api.get(`/users/name=${name}`)

    return data.users

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const getById = async (id: number): Promise<User | Error> => {
  try {

    const { data } = await Api.get(`/users/${id}`)

    return data.user

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const updateById = async (userData: User): Promise<number | Error> => {
  try {

    const { data } = await Api.put(`/users/${userData.id}`, userData)

    return data.id

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const deleteById = async (id: number): Promise<number | Error> => {
  try {

    const { data } = await Api.delete(`/users/${id}`)

    return data.id

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}

export const UserService = {
  create,
  getAll,
  getByName,
  getById,
  updateById,
  deleteById,
}
