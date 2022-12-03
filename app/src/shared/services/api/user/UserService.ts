import { Environment } from "../../../environment"
import { ResponseError, User } from "../../../types"
import { Api } from "../axios-config"

const create = async (userData: User): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.post('/users', userData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }


    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const getAll = async (): Promise<User[] | ResponseError> => {
  try {

    const { data } = await Api.get('/users')

    return data.users

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const getByName = async (name: string): Promise<User[] | ResponseError> => {
  try {

    const { data } = await Api.get(`/users/search?name=${name}`)

    return data.users

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const getById = async (id: number): Promise<User | ResponseError> => {
  try {

    const { data } = await Api.get(`/users/${id}`)

    return data.user

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const updateUser = async (userData: User): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.put(`/users/${userData.id}`, userData)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const updateAccount = async (userData: User): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.put(`/users/account/${userData.id}`, userData)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const deleteById = async (id: number): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.delete(`/users/${id}`)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}

export const UserService = {
  create,
  getAll,
  getByName,
  getById,
  updateUser,
  updateAccount,
  deleteById,
}
