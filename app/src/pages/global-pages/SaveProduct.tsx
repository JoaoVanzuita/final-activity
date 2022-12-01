import { Close } from "@mui/icons-material"
import { Alert, AlertTitle, IconButton } from "@mui/material"
import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToolbarListing } from "../../shared/components"
import { VTextField } from "../../shared/forms"
import { BasePageLayout } from "../../shared/layouts"
import { ProductService } from "../../shared/services"
import { ResponseError } from "../../shared/types"

interface IFormData{
  id?: number
  name: string
}

export const SaveProduct: React.FC = () => {
  const navigate = useNavigate()
  const {id = 'novo'} = useParams<'id'>()
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState<ResponseError | null>(null)
  const [name, setName] = useState('')
  const [showSuccessAlertCreated, setShowSuccessAlertCreated] = useState(0)
  const [showSuccessAlertDeleted, setShowSuccessAlertDeleted] = useState(0)
  const [showSuccessAlertEdited, setShowSuccessAlertEdited] = useState(0)
  const formRef = useRef<FormHandles>(null)


  useEffect(() => {
    if(id === 'novo'){
      return
    }

    setIsLoading(true)

    ProductService.getById(Number(id))
    .then(result => {
      if(result instanceof ResponseError){
        setIsLoading(true)

        setShowErrorAlert(result)
        return
      }
      setName(result.name)
      formRef.current?.setData(result)
    })

  }, [id])

  const handleDelete = (id: number) => {
    if(confirm('Tem certeza?')){
      ProductService.deleteById(id)
      .then(result => {
        if(result instanceof ResponseError){
          setShowErrorAlert(result)
          return
        }
        setShowSuccessAlertDeleted(id)
      })
    }
  }
  const handleSave = (data: IFormData) => {
    setIsLoading(true)

    if (id === 'novo'){

      ProductService.create(data)
      .then(result => {
        setIsLoading(false)

        if(result instanceof ResponseError){
          setShowErrorAlert(result)
          return
        }
        setShowSuccessAlertCreated(result)
      })
      return
    }

      data.id = Number(id)

      ProductService.updateById(data)
      .then(result => {
        setIsLoading(false)

        if(result instanceof ResponseError){
          setShowErrorAlert(result)
          return
        }
        setShowSuccessAlertEdited(result)
      })

  }

  return(
    <BasePageLayout title={id === 'novo' ? 'Novo produto' : `Editar ${name}`}
      toolbar={<ToolbarListing
        showButtonSave
        showButtonSaveAndBack
        showButtonNew={id !== 'novo'}
        showButtonDelete={id !== 'novo'}
        showButtonBack

        onClickButtonSave={() => formRef.current?.submitForm()}
        onClickButtonSaveAndBack={()=> {}}
        onClickButtonNew={() => navigate('/gerenciar-estoque/produtos/novo')}
        onClickButtonDelete={() => handleDelete(Number(id))}
        onClickButtonBack={() => navigate('/gerenciar-estoque')}
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
              onClick={() => navigate('/gerenciar-estoque')}>
                <Close fontSize="inherit"/>
              </IconButton>
          }>
          <AlertTitle>Código: {showErrorAlert.statusCode}</AlertTitle>
          Erro: {showErrorAlert.message}
        </Alert>
      }
      {showSuccessAlertEdited !== 0 &&
        <Alert
          variant='outlined'
          severity='success'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                setShowSuccessAlertEdited(0)
                navigate(`/gerenciar-estoque`)
              }}>
                <Close fontSize="inherit"/>
              </IconButton>
          }>
          <AlertTitle>Código: 200</AlertTitle>
          ID do registro editado: {showSuccessAlertEdited}
        </Alert>
      }
      {showSuccessAlertCreated !== 0 &&
        <Alert
          variant='outlined'
          severity='success'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                setShowSuccessAlertCreated(0)
                navigate(`/gerenciar-estoque/produtos/${showSuccessAlertCreated}`)
              }}>
                <Close fontSize="inherit"/>
              </IconButton>
          }>
          <AlertTitle>Código: 200</AlertTitle>
          ID do registro criado: {showSuccessAlertCreated}
        </Alert>
      }
      {showSuccessAlertDeleted !== 0 &&
        <Alert
          variant='outlined'
          severity='success'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                // setShowSuccessAlertDeleted(0)
                navigate(`/gerenciar-estoque`)
              }}>
                <Close fontSize="inherit"/>
              </IconButton>
          }>
          <AlertTitle>Código: 200</AlertTitle>
          ID do registro deletado: {showSuccessAlertDeleted}
        </Alert>
      }

      <Form ref={formRef} onSubmit={handleSave}>

        <VTextField label="Nome do produto" name='name' />

      </Form>

    </BasePageLayout>
  )
}
