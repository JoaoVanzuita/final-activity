import { Avatar, Box,Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme} from '@mui/material'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

import { useAppThemeContext, useDrawerContext } from '../../contexts'

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
	const navigate = useNavigate()

	const resolvedPath = useResolvedPath(to)
	const match = useMatch({ path: resolvedPath.pathname, end: false })

	const handleClick = () => {
		navigate(to)
		onClick?.()
	}

	return (
		<ListItemButton selected={!!match} onClick={handleClick}>
			<ListItemIcon>
				<Icon>{icon}</Icon>
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItemButton>
	)
}

interface IMenuDrawer {
  children: React.ReactNode
}
export const DrawerMenu: React.FC<IMenuDrawer> = ({children}) => {
	const theme = useTheme()
	const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext()
	const mdDown = useMediaQuery(theme.breakpoints.down('md'))
	const {toggleTheme} = useAppThemeContext()

	return(
		<>
			<Drawer open={isDrawerOpen} variant={mdDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>

				<Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

					<Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
						<Avatar
							sx={{height:theme.spacing(12), width: theme.spacing(12)}}
							src='https://reactjs.org/logo-og.png'/>
					</Box>

					<Divider/>

					<Box flex={1}>
						<List component="nav">
							{drawerOptions.map(drawerOption => (
								<ListItemLink
									to={drawerOption.path}
									key={drawerOption.path}
									icon={drawerOption.icon}
									label={drawerOption.label}
									onClick={mdDown ? toggleDrawerOpen : undefined}
								/>
							))}
						</List>
					</Box>

					<Box>
						<List component="nav">
							<ListItemButton onClick={toggleTheme}>
								<ListItemIcon>
									<Icon>dark_mode</Icon>
								</ListItemIcon>
								<ListItemText primary="Alternar tema" />
							</ListItemButton>
						</List>
					</Box>

				</Box>
			</Drawer>

			<Box height='100vh' marginLeft={mdDown ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	)
}
