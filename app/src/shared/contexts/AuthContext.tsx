import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { AuthService } from '../services'
import { ResponseError, User } from '../types'

interface IAuthContextData {
  isAuthenticated: boolean
  getLoggedUser: () => Promise<User | ResponseError>
  login: (email:string, password:string) => Promise<ResponseError | void>
  logout: () => void
  getToken: () => string
}

export const AuthContext = createContext({} as IAuthContextData)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
	const [token, setToken] = useState<string>()
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(() => {
		const token = localStorage.getItem('token')

		if(token){
			setIsAuthenticated(true)
			setToken(token)
			return
		}

		setIsAuthenticated(false)
		setToken(undefined)
	}, [isAuthenticated])

	const getToken = useCallback(() => {

		if(token){
			return token
		}
		return ''
	},[])

	const getLoggedUser = useCallback(async () => {

		return await AuthService.getLogged()
	}, [])

	const login = useCallback(async (email:string, password: string) => {
		const result = await AuthService.login(email, password)

		if(result instanceof ResponseError){
			return result
		}

		setIsAuthenticated(true)
		setToken(result)
		localStorage.setItem('token', result)
	}, [])

	const logout = useCallback(() => {

		setIsAuthenticated(false)
		setToken(undefined)
		localStorage.removeItem('token')
		window.location.reload()
	}, [])

	return (
		<AuthContext.Provider value={{ getToken, isAuthenticated, getLoggedUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	return useContext(AuthContext)
}
