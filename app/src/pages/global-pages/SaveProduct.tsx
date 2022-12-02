import { Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Grid, IconButton, LinearProgress, Paper } from '@mui/material'
import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toolbar } from '../../shared/components'
import { VForm, VTextField } from '../../shared/forms'
import { BasePageLayout } from '../../shared/layouts'
import { ProductService } from '../../shared/services'
import { ResponseError } from '../../shared/types'
import * as yup from 'yup'
import { IVFormErrors } from '../../shared/forms/IVFormErrors'

interface IFormData{
  id?: number
  name: string
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    id: yup.number().notRequired(),
    name: yup.string().required().min(3)
})

export const SaveProduct: React.FC = () => {
  const {id = 'novo'} = useParams<'id'>()
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState<ResponseError | null>(null)
  const [name, setName] = useState('')
  const [showSuccessAlertCreated, setShowSuccessAlertCreated] = useState(0)
  const [showSuccessAlertDeleted, setShowSuccessAlertDeleted] = useState(0)
  const [showSuccessAlertEdited, setShowSuccessAlertEdited] = useState(0)
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()


  useEffect(() => {
    if(id === 'novo'){
      formRef.current?.setData({
        name: ''
      })
      return
    }

    setIsLoading(true)

    ProductService.getById(Number(id))
    .then(result => {
      setIsLoading(false)
      if(result instanceof ResponseError){

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

    formValidationSchema.
      validate(data, {abortEarly: false})
      .then(dataValid => {

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
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach(error => {
          if(!error.path) return

          validationErrors[error.path] = error.message

          formRef.current?.setErrors(validationErrors)
        })
      })
  }

  return(
    <BasePageLayout title={id === 'novo' ? 'Novo Produto' : `Editar ${name}`}
      toolbar={<Toolbar
        showButtonSave
        showButtonSaveAndBack
        showButtonNew={id !== 'novo'}
        showButtonDelete={id !== 'novo'}
        showButtonBack

        onClickButtonSave={() => formRef.current?.submitForm()}
        onClickButtonSaveAndBack={()=> {
          formRef.current?.submitForm()
          navigate('/gerenciar-estoque')
        }}
        onClickButtonNew={() => navigate('/gerenciar-estoque/produto/novo')}
        onClickButtonDelete={() => handleDelete(Number(id))}
        onClickButtonBack={() => navigate('/gerenciar-estoque')}
      />}
    >
      {showErrorAlert &&
        <Alert
          variant='outlined'
          severity='error'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              onClick={() => navigate('/gerenciar-estoque')}>
                <Close fontSize='inherit'/>
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
              aria-label='close'
              color='inherit'
              onClick={() => setShowSuccessAlertEdited(0)}>
                <Close fontSize='inherit'/>
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
              aria-label='close'
              color='inherit'
              onClick={() => {
                setShowSuccessAlertCreated(0)
                navigate(`/gerenciar-estoque/produto/${showSuccessAlertCreated}`)
              }}>
                <Close fontSize='inherit'/>
              </IconButton>
          }>
          <AlertTitle>Código: 201</AlertTitle>
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
              aria-label='close'
              color='inherit'
              onClick={() => {
                setShowSuccessAlertDeleted(0)
                navigate(`/gerenciar-estoque`)
              }}>
                <Close fontSize='inherit'/>
              </IconButton>
          }>
          <AlertTitle>Código: 200</AlertTitle>
          ID do registro deletado: {showSuccessAlertDeleted}
        </Alert>
      }

      <Box margin={1} component={Paper} display='flex' flexDirection='column' variant='outlined'>

        <VForm ref={formRef} onSubmit={handleSave}>
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && <Grid item >
              <LinearProgress variant='indeterminate'/>
            </Grid>}

            <Grid container item direction='row'>
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <VTextField disabled={isLoading} fullWidth label='Nome do produto' name='name' onChange={ev => setName(ev.currentTarget.value)}/>
              </Grid>
            </Grid>

          </Grid>
        </VForm>

      </Box>

    </BasePageLayout>
  )
}