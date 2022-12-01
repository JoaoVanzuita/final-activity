import { Close } from "@mui/icons-material"
import { Alert, AlertTitle, Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Toolbar } from "../../shared/components"
import { Environment } from "../../shared/environment"
import { useDebounce } from "../../shared/hooks"
import { BasePageLayout } from "../../shared/layouts"
import { ProductService } from "../../shared/services"
import { Product, ResponseError } from "../../shared/types"

export const ManageInventory:React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()
  const [rows, setRows] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showErrorAlert, setShowErrorAlert] = useState<ResponseError | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(0)
  const navigate = useNavigate()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)
    ProductService.getAll()
    .then(result => {
      setIsLoading(false)

      if(result instanceof ResponseError){

        setShowErrorAlert(result)
        setRows([])
        return
      }
      setShowErrorAlert(null)
      setRows(result)
    })
  },[])

  useEffect(() => {
    debounce(() => {
      setIsLoading(true)
      ProductService.getByName(search)
      .then(result => {
        setIsLoading(false)

        if(result instanceof ResponseError){

          setShowErrorAlert(result)
          setRows([])
          return
        }
        setShowErrorAlert(null)
        setRows(result)
      })
    })
  }, [search])

  const handleDelete = (id:number) => {

    if(confirm('Tem certeza?')){
      ProductService.deleteById(id)
      .then(result => {
        if(result instanceof ResponseError){

          setShowErrorAlert(result)
          setRows([])
          return
        }
        setShowSuccessAlert(id)
        setRows(oldRows => {
          return [
            ...oldRows.filter(oldRow => oldRow.id !== id)
          ]
        })
      })
    }
  }


  return(
    <BasePageLayout
      title='Gerenciar estoque'
      toolbar={<Toolbar
        textSearch={search}
        showSearchInput
        showButtonNew
        showButtonBack
        onClickButtonBack={() => navigate(-1)}
        onClickButtonNew={() => navigate('/gerenciar-estoque/produtos/novo')}
        onChangeTextSearch={text => setSearchParams({ search: text }, {replace: true})}
      />}
    >
      {showErrorAlert != null &&
        <Alert
          variant='outlined'
          severity='error'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => setShowErrorAlert(null)}>
                <Close fontSize="inherit"/>
              </IconButton>
          }>
          <AlertTitle>Código: {showErrorAlert.statusCode}</AlertTitle>
          Erro: {showErrorAlert.message}
        </Alert>
      }

      {showSuccessAlert !== 0 &&
        <Alert
          variant='outlined'
          severity='success'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => setShowSuccessAlert(0)}>
                <Close fontSize="inherit"/>
              </IconButton>
          }>
          <AlertTitle>Código: 200</AlertTitle>
          ID do registro deletado: {showSuccessAlert}
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
                  <IconButton size='small' onClick={() => navigate(`/gerenciar-estoque/produtos/${row.id}`)}>
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
