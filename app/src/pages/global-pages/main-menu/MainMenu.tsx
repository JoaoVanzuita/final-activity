import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Toolbar } from "../../../shared/components"
import { useAuthContext } from "../../../shared/contexts"
import { BasePageLayout } from "../../../shared/layouts"
import { UserService } from "../../../shared/services"
import { AuthService } from "../../../shared/services/api/auth/AuthService"
import { User, ResponseError } from "../../../shared/types"

export const MainMenu = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const [isLoading, setIsLoading] = useState(false)
  const { logout } = useAuthContext()
  const [userData, setUserData] = useState<User | null>()

  useEffect(() => {

    setIsLoading(true)

    AuthService.getLogged()
    .then(result => {
      setIsLoading(false)
      if(result instanceof ResponseError){

        Swal.fire({
          titleText: `Ocorreu um erro - Código: ${result.statusCode}`,
          text: result.message.toString(),
          icon: 'error',
          background: alertBackground,
          color: alertColor
        })
        return
      }
      setUserData(result)
    })

  }, [])

  return(
    <BasePageLayout title={`Menu Principal ${userData?.role === 'manager' ? ' - Gerente' : userData?.role == 'employee' ? ' - Funcionário' : ''}`} toolbar={<Toolbar
        showButtonManageAccount
        showButtonExit
        onClickButtonManageAccount={() => navigate('/gerenciar-conta')}
        onClickButtonExit={() => {
          setUserData(null)
          logout()
        }}
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

            {userData && <TableRow>
              <TableCell>{userData.id}</TableCell>
              <TableCell>{userData.name}</TableCell>
              <TableCell>{userData.email}</TableCell>
              <TableCell>{userData.role === 'employee' ? 'Funcionário' : 'Gerente'}</TableCell>
            </TableRow>}

          </TableBody>

          {!isLoading && !userData && (
            <caption>Usuário não encontrado</caption>
          )}

        </Table>
      </TableContainer>

      </Box>

    </BasePageLayout>
  )
}
