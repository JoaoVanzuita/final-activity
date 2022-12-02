import './shared/forms/YupTranslates'
import { AppRoutes } from './routes'
import { DrawerMenu } from './shared/components/drawer-menu/DrawerMenu'
import { DrawerProvider } from './shared/contexts'
import { AppThemeProvider } from './shared/contexts/ThemeContext'

export const App = () => {

  return (
    <AppThemeProvider>
      <DrawerProvider>
        <DrawerMenu>
          <AppRoutes/>
        </DrawerMenu>
      </DrawerProvider>
    </AppThemeProvider>
  )
}
