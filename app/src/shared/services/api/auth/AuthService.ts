import { Environment } from "../../../environment"
import { ResponseError, User } from "../../../types"
import { Api } from "../axios-config"

interface ILoginResponse {
  user: User
  token: string
}

const login = async (email: string, password: string): Promise<ILoginResponse | ResponseError> => {
  try {

    const { data } = await Api.post('/login', { email, password })

    return data

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
  login,
  getLogged
}
