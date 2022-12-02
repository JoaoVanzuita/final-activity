import { Close } from "@mui/icons-material"
import { Alert, AlertTitle, Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Swal from "sweetalert2"
import { Toolbar } from "../../shared/components"
import { Environment } from "../../shared/environment"
import { useDebounce } from "../../shared/hooks"
import { BasePageLayout } from "../../shared/layouts"
import { ProductService } from "../../shared/services"
import { Product, ResponseError, SuccessAlert } from "../../shared/types"

export const ManageInventory:React.FC = () => {
  const alertBackground = useTheme().palette.background.default
  const alertColor = useTheme().palette.mode === 'light' ? '#000000' : '#ffffff'
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()
  const [rows, setRows] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessAlert, setShowSuccessAlert] = useState<SuccessAlert | null>(null)
  const navigate = useNavigate()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    debounce(() => {
      setIsLoading(true)
      ProductService.getByName(search)
      .then(result => {
        setIsLoading(false)

        if(result instanceof ResponseError){

          Swal.fire({
            titleText:`Ocorreu um erro - Código: ${result.statusCode}`,
            text: result.message.toString(),
            icon: 'error',
            background: alertBackground,
            color: alertColor
          })
          setRows([])
          return
        }
        setRows(result)
      })
    })
  }, [search])

  const handleDelete = (id:number) => {

    Swal.fire({
      title: 'Tem certeza de que deseja excluir o registro?',
      text: 'Essa é uma ação sem volta!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Cancelar',
      background: alertBackground,
      color: alertColor
    }).then(confirm => {
      if (confirm.isConfirmed) {

      ProductService.deleteById(id)
        .then(result => {
          if(result instanceof ResponseError){

            Swal.fire({
              titleText:`Ocorreu um erro - Código: ${result.statusCode}`,
              text: result.message.toString(),
              icon: 'error',
              background: alertBackground,
              color: alertColor
            })
            return
          }
          setShowSuccessAlert({
            title: 'Registro excluído com sucesso',
            message: `ID: ${result}`,
          })
          setRows(oldRows => {
            return [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]
          })
        })
      }
    })
  }

  return(
    <BasePageLayout
      title='Gerenciar estoque'
      toolbar={<Toolbar
        textSearch={search}
        showSearchInput
        showButtonNew
        onClickButtonBack={() => navigate(-1)}
        showButtonBack
        onClickButtonNew={() => navigate('/gerenciar-estoque/produto/novo')}
        onChangeTextSearch={text => setSearchParams({ search: text }, {replace: true})}
      />}
    >
      {showSuccessAlert &&
        <Alert
          variant='outlined'
          severity='success'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              onClick={() => setShowSuccessAlert(null)}
            >
              <Close fontSize='inherit'/>
            </IconButton>
          }>
          <AlertTitle>{showSuccessAlert.title}</AlertTitle>
          {showSuccessAlert.message}
        </Alert>
      }

      <TableContainer component={Paper} variant='outlined' sx={{margin:1, width:'auto'}}>
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
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço de custo</TableCell>
              <TableCell>Preço de venda</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id!)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/gerenciar-estoque/produto/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.costPrice}</TableCell>
                <TableCell>{row.salePrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {!isLoading && rows.length == 0 && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}

        </Table>
      </TableContainer>
    </BasePageLayout>
  )
}
