import './shared/forms/YupTranslates'
import './App.css'

import { AppRoutes } from './routes'
import { Login } from './shared/components'
import { DrawerMenu } from './shared/components/drawer-menu/DrawerMenu'
import { AuthProvider, DrawerProvider, InvoiceItemsProvider } from './shared/contexts'
import { AppThemeProvider } from './shared/contexts/ThemeContext'

export const App = () => {

	return (
		<AuthProvider>
			<AppThemeProvider>

				<Login>

					<DrawerProvider>
						<DrawerMenu>
							{/* Finge que não existe essa gambiarra */}
							<InvoiceItemsProvider>
								<AppRoutes/>
							</InvoiceItemsProvider>
						</DrawerMenu>
					</DrawerProvider>

				</Login>

			</AppThemeProvider>
		</AuthProvider>
	)
}
