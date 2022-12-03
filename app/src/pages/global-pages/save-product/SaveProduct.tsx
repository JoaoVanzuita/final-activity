import { Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Grid, IconButton, LinearProgress, Paper, useTheme } from '@mui/material'
import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toolbar } from '../../../shared/components'
import { VForm, VTextField } from '../../../shared/forms'
import { BasePageLayout } from '../../../shared/layouts'
import { ProductService } from '../../../shared/services'
import { ResponseError, SuccessAlert } from '../../../shared/types'
import * as yup from 'yup'
import { IVFormErrors } from '../../../shared/forms/IVFormErrors'
import Swal from 'sweetalert2'

interface IFormData{
  id?: number
  name: string
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    id: yup.number().notRequired(),
    name: yup.string().required().min(3)
})

export const SaveProduct: React.FC = () => {
  const alertBackground = useTheme().palette.background.default
  const alertColor = useTheme().palette.mode === 'light' ? '#000000' : '#ffffff'
  const {id = 'novo'} = useParams<'id'>()
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState<SuccessAlert | null>(null)
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()


  useEffect(() => {

    setShowSuccessAlert(null)

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

        Swal.fire({
          titleText: `Ocorreu um erro - Código: ${result.statusCode}`,
          text: result.message.toString(),
          icon: 'error',
          background: alertBackground,
          color: alertColor
        })
        return
      }
      setName(result.name)
      formRef.current?.setData(result)
    })

  }, [id])

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
        })
      }
    })
  }

  const handleSave = (data: IFormData) => {

    formValidationSchema.
      validate(data, {abortEarly: false})
      .then(dataValid => {

        setIsLoading(true)

        if (id === 'novo'){

          ProductService.create(dataValid)
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

            setShowSuccessAlert({
              title: 'Registro criado com sucesso',
              message: `ID: ${result}`,
              id: result
            })
          })
          return
        }

        data.id = Number(id)

        ProductService.updateById(dataValid)
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
          setShowSuccessAlert({
            title: 'Registro atualizado com sucesso',
            message: `ID: ${result}`,
            id: result
          })
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
      {showSuccessAlert &&
        <Alert
          variant='outlined'
          severity='success'
          sx={{margin:1, width:'auto'}}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              onClick={() => {
                if(showSuccessAlert.id === undefined){
                  return
                }
                if(id === 'novo'){
                  navigate(`/gerenciar-estoque/produto/${showSuccessAlert.id}`)
                  return
                }
                navigate('/gerenciar-estoque')
              }}
            >
              <Close fontSize='inherit'/>
            </IconButton>
          }>
          <AlertTitle>{showSuccessAlert.title}</AlertTitle>
          {showSuccessAlert.message}
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
