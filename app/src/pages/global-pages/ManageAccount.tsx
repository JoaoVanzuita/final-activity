import { Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Grid, IconButton, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material'
import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ResponseError, SuccessAlert, User, UserRole } from '../../shared/types'
import { UserService } from '../../shared/services'
import { IVFormErrors } from '../../shared/forms/IVFormErrors'
import { BasePageLayout } from '../../shared/layouts'
import { Toolbar } from '../../shared/components'
import { VForm, VTextField } from '../../shared/forms'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import YupPassword from 'yup-password';

YupPassword(yup);

type IFormData = {
  id: number
  name: string
  email: string
  password: string | undefined
  passwordConfirmation: string | undefined
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8, 'A senha deve ter ao menos 8 caracteres').minNumbers(1, 'A senha deve conter ao menos um número'),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'As senhas não coincidem')
})

export const ManageAccount = () => {
  const alertBackground = useTheme().palette.background.default
  const alertColor = useTheme().palette.mode === 'light' ? '#000000' : '#ffffff'
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>()
  const [showSuccessAlert, setShowSuccessAlert] = useState<SuccessAlert | null>(null)
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()


  useEffect(() => {

    setIsLoading(true)

    UserService.getLogged()
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
      setUser(result)
      formRef.current?.setData(result)
    })

  }, [])

  const handleDelete = (id:number) => {

    setIsLoading(true)

    Swal.fire({
      title: 'Tem certeza de que deseja excluir sua conta?',
      text: 'Essa é uma ação sem volta!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Cancelar',
      background: alertBackground,
      color: alertColor
    }).then(confirm => {
      if (confirm.isConfirmed) {

        UserService.deleteById(id)
        .then(result => {
          setIsLoading(false)
          if(result instanceof ResponseError){

            Swal.fire({
              titleText: `Ocorreu um erro - Código: ${result.statusCode}`,
              text: `Erro: ${result.message}`,
              icon: 'error',
              background: alertBackground,
              color: alertColor
            })
            return
          }

          //TODO: deslogar usuário
          localStorage.setItem('token', '')
          navigate('/login')
        })
      }
    })
  }

  const handleSave = (formData: IFormData) => {

    type dataToValidate = Omit<IFormData, 'passwordConfirmation'>

    const data:dataToValidate = formData

    data.id = user?.id!

    formValidationSchema.
      validate(data, {abortEarly: false})
      .then(dataValid => {

        console.log('valid')
        setIsLoading(true)

        UserService.updateAccount(dataValid)
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
            id: result,
            title: 'Informações de usuário atualizadas com sucesso',
            message: `ID: ${result}`
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
    <BasePageLayout title='Editar conta'
    toolbar={<Toolbar
      showButtonSave
      showButtonSaveAndBack
      showButtonDelete
      showButtonBack

      textButtonDelete='excluir conta'

      onClickButtonSave={() => formRef.current?.submitForm()}
      onClickButtonSaveAndBack={() => {
        formRef.current?.submitForm()
        if(user?.role == UserRole.employee){
          navigate('/menu-funcionario')
          return
        }
        navigate('/menu-gerente')
      }}
      onClickButtonDelete={() => handleDelete(user?.id ?? 0)}
      onClickButtonBack={() => {
        if(user?.role == UserRole.employee){
          navigate('/menu-funcionario')
          return
        }
        navigate('/menu-gerente')
      }}
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

      <Box margin={1} component={Paper} display='flex' flexDirection='column' variant='outlined'>

        <VForm ref={formRef} onSubmit={handleSave}>
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && <Grid item >
              <LinearProgress variant='indeterminate'/>
            </Grid>}

            <Grid container item direction='row'>
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <VTextField disabled={isLoading} fullWidth label='Nome' name='name'/>
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <VTextField disabled={isLoading} fullWidth label='Email' name='email'/>
              </Grid>
            </Grid>

            <Grid container item direction={smDown ? 'column' : 'row'} spacing={2}>
              <Grid item xs={6} sm={5} md={4} lg={3} xl={2}>
                <VTextField disabled={isLoading} type='password' fullWidth label='Senha' name='password' defaultValue=''/>
              </Grid>
              <Grid item xs={6} sm={5} md={4} lg={3} xl={2}>
                <VTextField disabled={isLoading} type='password' fullWidth label='Confirmar senha' name='passwordConfirmation' defaultValue=''/>
              </Grid>
            </Grid>
          </Grid>

        </VForm>
      </Box>

  </BasePageLayout>
  )
}