import { Environment } from "../../../environment"
import { ResponseError, User } from "../../../types"
import { Api } from "../axios-config"

const auth = async (email: string, password: string): Promise<string | ResponseError> => {
  try {

    const { data } = await Api.post('/login', { email, password })

    return data.token

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const getLogged = async (): Promise<User | ResponseError> => {
  try {

    const { data } = await Api.get(`/users/logged`)

    return data.user

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}

export const AuthService = {
  auth,
  getLogged
}
