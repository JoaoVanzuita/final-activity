import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toolbar } from "../../../shared/components"
import { useAuthContext } from "../../../shared/contexts"
import { BasePageLayout } from "../../../shared/layouts"

export const MainMenu = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuthContext()

  return(
    <BasePageLayout title={`Menu Principal ${auth.user?.role === 'manager' ? ' - Gerente' : auth.user?.role == 'employee' ? ' - Funcionário' : ''}`} toolbar={<Toolbar
        showButtonManageAccount
        showButtonExit
        onClickButtonManageAccount={() => navigate('/gerenciar-conta')}
        onClickButtonExit={() => auth.logout()}
      />}
    >

      <Box component={Paper} variant='outlined' sx={{margin:1, width:'auto'}} padding={2}>

      <Typography variant='h6'>
        Suas informações
      </Typography>

      <TableContainer component={Paper} variant='outlined' sx={{ marginTop:2, width:'auto'}}>
        <Table>

          <TableHead>
          {isLoading &&
              <TableRow>
                <TableCell colSpan={5}>
                  <LinearProgress variant="indeterminate"/>
                </TableCell>
              </TableRow>
            }
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cargo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {auth.user && <TableRow>
              <TableCell>{auth.user.id}</TableCell>
              <TableCell>{auth.user.name}</TableCell>
              <TableCell>{auth.user.email}</TableCell>
              <TableCell>{auth.user.role === 'employee' ? 'Funcionário' : 'Gerente'}</TableCell>
            </TableRow>}

          </TableBody>

          {!isLoading && !auth.user && (
            <caption>Usuário não encontrado</caption>
          )}

        </Table>
      </TableContainer>

      </Box>

    </BasePageLayout>
  )
}
