import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthService } from "../services/api/auth/AuthService"
import { ResponseError } from "../types"

interface IAuthContextData {
  isAuthenticated: boolean
  login: (email:string, password:string) => Promise<ResponseError | void>
  logout: () => void
}

const AuthContext = createContext({} as IAuthContextData)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string>()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token){
      setToken(token)
      return
    }
    setToken(undefined)
  }, [])

  const handleLogin = useCallback(async (email:string, password: string):Promise<void | ResponseError> => {
    const result = await AuthService.auth(email, password)

    if(result instanceof ResponseError){
      return result
    }

    setToken(result)
    console.log(result)
    localStorage.setItem('token', result.substring(1, result.length-1))
  }, [])

  const handleLogout = useCallback(() => {

    setToken(undefined)
    localStorage.removeItem('token')
    navigate('/')

  }, [])

  const isAuthenticated = useMemo(() => !!token, [token])

  return(
    <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
