import { createContext, useCallback, useContext, useState } from 'react'

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerContext {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContext)

export const useDrawerContext = () => {
	return useContext(DrawerContext)
}

interface IDrawerThemeProviderProps {
  children: React.ReactNode
}

export const DrawerProvider: React.FC<IDrawerThemeProviderProps> = ({children}) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([])

	const toggleDrawerOpen = useCallback(() =>{
		setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
	}, [])

	const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
		setDrawerOptions(newDrawerOptions)
	}, [])

	return(
		<DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
			{children}
		</DrawerContext.Provider>
	)
}
