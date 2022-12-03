import './shared/forms/YupTranslates'
import { AppRoutes } from './routes'
import { DrawerMenu } from './shared/components/drawer-menu/DrawerMenu'
import { AuthProvider, DrawerProvider } from './shared/contexts'
import { AppThemeProvider } from './shared/contexts/ThemeContext'
import { Login } from './shared/components'
import './App.css'

export const App = () => {

  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <DrawerMenu>
              <AppRoutes/>
            </DrawerMenu>
          </DrawerProvider>

        </Login>
        
      </AppThemeProvider>
    </AuthProvider>
  )
}
