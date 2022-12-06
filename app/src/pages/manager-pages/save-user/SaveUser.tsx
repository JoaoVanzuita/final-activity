import { Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Grid, IconButton, LinearProgress, MenuItem, Paper, Typography, useTheme } from '@mui/material'
import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as yup from 'yup'

import { Toolbar } from '../../../shared/components'
import { VForm, VSelect, VTextField } from '../../../shared/forms'
import { IVFormErrors } from '../../../shared/forms/IVFormErrors'
import { BasePageLayout } from '../../../shared/layouts'
import { UserService } from '../../../shared/services'
import { ResponseError, SuccessAlert, UserRole } from '../../../shared/types'

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
	role: yup.mixed<UserRole>().oneOf(Object.values(UserRole), 'Cargo deve ser um dos seguintes valores: gerente, funcionário').required()
})

export const SaveUser = () => {
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

				UserService.deleteById(id)
					.then(result => {
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

					UserService.create(dataValid)
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

				UserService.updateUser(dataValid)
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
							title: 'Registro atualizado com sucesso',
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
        					navigate(`/gerenciar-usuarios/usuario/${showSuccessAlert.id}`)
        					return
        				}
        				navigate('/gerenciar-usuarios')
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
								<VSelect disabled={isLoading} fullWidth name='role' placeholder='Cargo'>
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
