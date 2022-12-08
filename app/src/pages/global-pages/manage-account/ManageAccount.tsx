import { Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Grid, IconButton, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material'
import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import YupPassword from 'yup-password'

import { Toolbar } from '../../../shared/components'
import { useAuthContext } from '../../../shared/contexts'
import { VForm, VTextField } from '../../../shared/forms'
import { IVFormErrors } from '../../../shared/forms/IVFormErrors'
import { BasePageLayout } from '../../../shared/layouts'
import { UserService } from '../../../shared/services'
import { ResponseError, SuccessAlert, User, UserRole } from '../../../shared/types'

YupPassword(yup)

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
	const theme = useTheme()
	const auth = useAuthContext()
	const alertBackground = theme.palette.background.default
	const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
	const smDown = useMediaQuery(theme.breakpoints.down('sm'))
	const [isLoading, setIsLoading] = useState(false)
	const [user, setUser] = useState<User>()
	const [showSuccessAlert, setShowSuccessAlert] = useState<SuccessAlert | null>(null)
	const formRef = useRef<FormHandles>(null)
	const navigate = useNavigate()

	useEffect(() => {

		setIsLoading(true)

		auth.getLoggedUser()
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

						auth.logout()
					})
			}
		})
	}

	const handleSave = (formData: IFormData) => {

    type dataToValidate = Omit<IFormData, 'passwordConfirmation'>

    const data:dataToValidate = formData

    if(user?.id){
    	data.id = user.id
    }

    formValidationSchema.validate(data, {abortEarly: false}).then(dataValid => {
    	setIsLoading(true)

    	UserService.updateAccount(dataValid).then(result => {
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
				onClickButtonSaveAndBack={async () => {
					formRef.current?.submitForm()
					setTimeout(() => navigate('/'), 1000)
				}}
				onClickButtonDelete={() => handleDelete(user?.id ?? 0)}
				onClickButtonBack={() => navigate('/')}
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
							<Grid item xs={12} sm={10} lg={6} xl={6}>
								<VTextField disabled={isLoading} fullWidth label='Nome' name='name'/>
							</Grid>
						</Grid>

						<Grid container item direction='row'>
							<Grid item xs={12} sm={10} lg={6} xl={6}>
								<VTextField disabled={isLoading} fullWidth label='Email' name='email'/>
							</Grid>
						</Grid>

						<Grid container item direction={smDown ? 'column' : 'row'} spacing={2}>

							<Grid item xs={6} sm={5} lg={3} xl={3}>
								<VTextField disabled={isLoading} type='password' fullWidth label='Nova senha' name='password'/>
							</Grid>

							<Grid item xs={6} sm={5} lg={3} xl={3}>
								<VTextField disabled={isLoading} type='password' fullWidth label='Confirmar senha' name='passwordConfirmation'/>
							</Grid>

						</Grid>
					</Grid>

				</VForm>
			</Box>

		</BasePageLayout>
	)
}
