import { Box, Card, CardContent, Divider, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect,useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Toolbar } from '../../../shared/components'
import { Environment } from '../../../shared/environment'
import { useDebounce } from '../../../shared/hooks'
import { BasePageLayout } from '../../../shared/layouts'
import { ProductService } from '../../../shared/services'
import { Product, ResponseError } from '../../../shared/types'

export const MakePurchase = () => {
	const theme = useTheme()
	const alertBackground = theme.palette.background.default
	const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
	const mdDown = useMediaQuery(theme.breakpoints.down('md'))
	const [searchParams, setSearchParams] = useSearchParams()
	const { debounce } = useDebounce()
	const [isLoading, setIsLoading] = useState(true)
	const [rows, setRows] = useState<Product[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Product | null>()
	const navigate = useNavigate()

	const search = useMemo(() => {
		return searchParams.get('search') || ''
	}, [searchParams])

	useEffect(() => {
		setSelectedProduct(null)
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

	const handleSelectProduct = (id: number) => {

		ProductService.getById(id).then(result => {

			if(result instanceof ResponseError){

				Swal.fire({
					titleText:`Ocorreu um erro - Código: ${result.statusCode}`,
					text: result.message.toString(),
					icon: 'error',
					background: alertBackground,
					color: alertColor
				})
				setSelectedProduct(null)
				return
			}

			setSelectedProduct(result)
		})
	}

	return(
		<BasePageLayout title='Efetuar Compra' toolbar={<Toolbar
			textButtonSave='concluir'
			showButtonSave
			showButtonAddItem
			showButtonViewOrder
			showButtonBack
			showSearchInput
			textSearch={search}
			onClickButtonBack={() => navigate('-1')}
			onChangeTextSearch={text => setSearchParams({ search: text }, {replace: true})}
		/>}
		>

			<Box
				width='100%'
				display='flex'
			>

				<Grid container margin={2}>
					<Grid item container display='flex' spacing={2}>

						<Grid item xs={12} sm={10} md={6} lg={4} order={mdDown ? 2 : 1}>

							<TableContainer component={Paper} variant='outlined'>

								{isLoading && <LinearProgress variant="indeterminate"/>}

								<Typography variant='h5' align='center' paddingTop={2} paddingBottom={2}>
                   Produtos em estoque
								</Typography>

								<Divider/>

								<Table>

									<TableHead>
										<TableRow>
											<TableCell>ID</TableCell>
											<TableCell>Nome</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{rows.map(row => (
											<TableRow key={row.id} onClick={() => handleSelectProduct(row.id!)}>
												<TableCell>{row.id}</TableCell>
												<TableCell>{row.name}</TableCell>
											</TableRow>
										))}
									</TableBody>

									{!isLoading && rows.length == 0 && (
										<caption>{Environment.EMPTY_LISTING}</caption>
									)}

								</Table>
							</TableContainer>
						</Grid>

						<Grid item xs={12} sm={10} md={6} lg={4} order={mdDown ? 1 : 2} >

							<Card variant='outlined'>
								<CardContent>
									<Typography variant='h5' align='center' paddingBottom={2}>
                    Produto selecionado
									</Typography>

									<TableContainer>

										<Divider/>
										<Table>

											{!selectedProduct &&
                        <caption>Nenhum produto selecionado</caption>
											}

											<TableBody>
												{selectedProduct && (<>

													<TableRow>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> ID </Typography>
														</TableCell>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> {selectedProduct ? selectedProduct.id : ''} </Typography>
														</TableCell>
													</TableRow>

													<TableRow>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> Nome </Typography>
														</TableCell>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> {selectedProduct ? selectedProduct.name : ''} </Typography>
														</TableCell>
													</TableRow>

													<TableRow>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> Quantidade </Typography>
														</TableCell>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> {selectedProduct ? selectedProduct?.quantity : ''} </Typography>
														</TableCell>
													</TableRow>

													<TableRow>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> Preço de custo </Typography>
														</TableCell>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> {selectedProduct ? selectedProduct?.costPrice : ''} </Typography>
														</TableCell>
													</TableRow>

													<TableRow>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> Preço de venda </Typography>
														</TableCell>
														<TableCell sx={{ border: 'none' }}>
															<Typography variant='subtitle1'> {selectedProduct ? selectedProduct?.salePrice : ''} </Typography>
														</TableCell>
													</TableRow></>)}

											</TableBody>
										</Table>
									</TableContainer>
								</CardContent>
							</Card>

						</Grid>

					</Grid>
				</Grid>

			</Box>

		</BasePageLayout>
	)
}
