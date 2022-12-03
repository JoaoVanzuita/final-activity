import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthService } from "../services";
import { ResponseError, User } from "../types";

interface IAuthContextData {
  user: User | null
  getLoggedUser: () => Promise<User | ResponseError>
  login: (email:string, password:string) => Promise<ResponseError | void>
  logout: () => void
}

export const AuthContext = createContext({} as IAuthContextData)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getLoggedUser().then(result => {

      if(result instanceof ResponseError){
        setUser(null)
        return
      }
      setUser(result)
    })
  }, [])

  const getLoggedUser = useCallback(async () => {

    return await AuthService.getLogged()
  }, [])

  const login = useCallback(async (email:string, password: string) => {

    const result = await AuthService.login(email, password)

    if(result instanceof ResponseError){
      return result
    }

    setUser(result.user)
    localStorage.setItem('token', result.token)
  }, [])

  const logout = useCallback(() => {

    setUser(null)
    localStorage.removeItem('token')
  }, [])

  return (
    <AuthContext.Provider value={{ user, getLoggedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
