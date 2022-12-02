import { Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Grid, IconButton, LinearProgress, MenuItem, Paper, Typography, useTheme } from '@mui/material'
import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toolbar } from '../../../shared/components'
import { VForm, VSelect, VTextField } from '../../../shared/forms'
import { BasePageLayout } from '../../../shared/layouts'
import { UserService } from '../../../shared/services'
import { ResponseError, UserRole } from '../../../shared/types'
import * as yup from 'yup'
import { IVFormErrors } from '../../../shared/forms/IVFormErrors'
import Swal from 'sweetalert2'

interface IFormData {
  id?: number
  name: string
  email: string
  role: UserRole
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    id: yup.number().notRequired(),
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    role: yup.mixed<UserRole>().oneOf(Object.values(UserRole)).required()
})

export const SaveUser = () => {
  const alertBackground = useTheme().palette.background.default
  const alertColor = useTheme().palette.mode === 'light' ? '#000000' : '#ffffff'
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
      Swal.fire({
        titleText: 'teste title',
        text: 'teste conteúdo',
        icon: 'success',
        background: alertBackground,
        color: alertColor
      })

    if(id === 'novo'){
      formRef.current?.setData({
        name: '',
        email: '',
        role: ''
      })
      return
    }

    setIsLoading(true)

    UserService.getById(Number(id))
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
      UserService.deleteById(id)
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

          UserService.create(dataValid)
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

        UserService.updateById(dataValid)
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
    <BasePageLayout title={id === 'novo' ? 'Novo Usuário' : `Editar ${name}`}
    toolbar={<Toolbar
      showButtonSave
      showButtonSaveAndBack
      showButtonNew={id !== 'novo'}
      showButtonDelete={id !== 'novo'}
      showButtonBack

      onClickButtonSave={() => formRef.current?.submitForm()}
      onClickButtonSaveAndBack={()=> {
        formRef.current?.submitForm()
        navigate('/gerenciar-usuarios')
      }}
      onClickButtonNew={() => navigate('/gerenciar-usuarios/usuario/novo')}
      onClickButtonDelete={() => handleDelete(Number(id))}
      onClickButtonBack={() => navigate('/gerenciar-usuarios')}
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
              onClick={() => navigate('/gerenciar-usuarios')}>
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
                navigate(`/gerenciar-usuarios/usuario/${showSuccessAlertCreated}`)
                setShowSuccessAlertCreated(0)
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

            <Grid item>
              <Typography variant='h6'>
                Informações do Usuário
              </Typography>

            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <VTextField disabled={isLoading} fullWidth label='Nome do usuário' name='name' onChange={ev => setName(ev.currentTarget.value)}/>
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <VTextField disabled={isLoading} fullWidth label='Email do usuário' name='email'/>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant='h6'>
                Cargo
              </Typography>

            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <VSelect displayEmpty disabled={isLoading} fullWidth name='role' placeholder='Cargo'>
                  <MenuItem value='manager' >Gerente</MenuItem>
                  <MenuItem value='employee'>Funcionário</MenuItem>
                </VSelect>
              </Grid>
            </Grid>

          </Grid>

        </VForm>
      </Box>


  </BasePageLayout>
  )
}
