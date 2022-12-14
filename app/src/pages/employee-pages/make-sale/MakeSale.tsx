/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, Divider, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect,useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { TableBodySelectedProduct, Toolbar } from '../../../shared/components'
import { useInvoiceItemsContext } from '../../../shared/contexts'
import { Environment } from '../../../shared/environment'
import { useDebounce } from '../../../shared/hooks'
import { BasePageLayout } from '../../../shared/layouts'
import { GenerateInvoice, InvoiceService, ProductService } from '../../../shared/services'
import { Invoice, InvoiceItem, InvoiceType, Product, ResponseError } from '../../../shared/types'

export const MakeSale = () => {
	const theme = useTheme()
	const alertBackground = theme.palette.background.default
	const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
	const mdDown = useMediaQuery(theme.breakpoints.down('md'))
	const [searchParams, setSearchParams] = useSearchParams()
	const { debounce } = useDebounce()
	const [isLoading, setIsLoading] = useState(true)
	const [rows, setRows] = useState<Product[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Product>()
	const navigate = useNavigate()
	const { items, setItems} = useInvoiceItemsContext()
	const [openDialogAddItems, setOpenDialogAddItems] = useState(false)
	const [quantity, setQuantity] = useState(1)

	const search = useMemo(() => {
		return searchParams.get('search') || ''
	}, [searchParams])

	useEffect(() => {
		setSelectedProduct(undefined)
		debounce(() => {
			setIsLoading(true)
			ProductService.getByName(search)
				.then(result => {
					setIsLoading(false)

					if(result instanceof ResponseError){

						Swal.fire({
							titleText:`Ocorreu um erro - C??digo: ${result.statusCode}`,
							text: result.message.toString(),
							icon: 'error',
							background: alertBackground,
							color: alertColor
						})
						setRows([])
						return
					}

					result = result.filter(product => {
						return product.quantity! > 0
					})

					setRows(result)
				})
		})
	}, [search])

	const handleSelectProduct = (id: number) => {

		ProductService.getById(id).then(result => {

			if(result instanceof ResponseError){

				Swal.fire({
					titleText:`Ocorreu um erro - C??digo: ${result.statusCode}`,
					text: result.message.toString(),
					icon: 'error',
					background: alertBackground,
					color: alertColor
				})
				setSelectedProduct(undefined)
				return
			}

			setSelectedProduct(result)
		})
	}

	const handleClickViewOrder = () => {

		if(!items.length){
			Swal.fire({
				titleText:'N??o h?? nenhum item no pedido',
				text: 'Adicione algum item ao pedido',
				icon: 'error',
				background: alertBackground,
				color: alertColor
			})
			return
		}
		navigate('/visualizar-pedido')
	}

	const handleClickAddItem = () => {

		if(!selectedProduct){
			Swal.fire({
				titleText:'Nenhum produto selecionado',
				text: 'Selecione um produto na lista',
				icon: 'error',
				background: alertBackground,
				color: alertColor
			})
			return
		}
		setOpenDialogAddItems(true)
	}

	const handleSaveItem = () => {

		setOpenDialogAddItems(false)

		if(quantity < 1 && quantity > selectedProduct?.quantity!){
			Swal.fire({
				titleText:'Valores inv??lidos',
				text: 'Preencha os campos corretamente',
				icon: 'error',
				background: alertBackground,
				color: alertColor
			})
			return
		}

		const newItem: InvoiceItem = {
			quantity: Number(quantity),
			unitPrice: selectedProduct?.salePrice!,
			product: selectedProduct!
		}

		setItems([...items, newItem])
		setSelectedProduct(undefined)
		setQuantity(1)
	}

	const handleSaveInvoice = () => {

		if(!items.length){
			Swal.fire({
				titleText:'N??o h?? nenhum item no pedido',
				text: 'Adicione algum item ao pedido',
				icon: 'error',
				background: alertBackground,
				color: alertColor
			})
			return
		}

		const invoice:Invoice = {
			date: new Date().toLocaleDateString(),
			invoiceType: InvoiceType.sale,
			items,
			totalValue: InvoiceService.calculateTotalValue(items)
		}

		InvoiceService.create(invoice).then(result => {

			if(result instanceof ResponseError){
				Swal.fire({
					titleText:`Ocorreu um erro - C??digo: ${result.statusCode}`,
					text: result.message.toString(),
					icon: 'error',
					background: alertBackground,
					color: alertColor
				})
				return
			}

			setItems([])
			GenerateInvoice.create(result)
		})
	}

	return(
		<BasePageLayout
			title='Efetuar Venda'
			toolbar={<Toolbar
				textButtonSave='concluir'
				showButtonSave
				showButtonAddItem
				showButtonViewOrder
				showButtonBack
				showSearchInput
				textSearch={search}
				onClickButtonSave={handleSaveInvoice}
				onClickButtonAddItem={handleClickAddItem}
				onClickButtonViewOrder={handleClickViewOrder}
				onClickButtonBack={() => navigate(-1)}
				onChangeTextSearch={text => setSearchParams({ search: text }, {replace: true})}
			/>}
		>
			<Box width='100%' display='flex'>

				<Dialog open={openDialogAddItems}>
					<DialogContent>
						<Box display='flex' flexDirection='row'>

							<Box marginRight={5} component={Paper} padding={2}>
								<Typography variant='h6' align='center' paddingBottom={2}>
									Informa????es do produto
								</Typography>

								<TableContainer>

									<Divider/>

									<Table>

										<TableBodySelectedProduct selectedProduct={selectedProduct}/>

									</Table>
								</TableContainer>

							</Box>

							<Box display='flex' flexDirection='column' justifyContent='center'>

								<TextField
									fullWidth
									value={quantity}
									type='number'
									inputProps={{ min:1, max: selectedProduct?.quantity }}
									onChange={ev => setQuantity(Number(ev.currentTarget.value))}
									margin='normal'
									variant='outlined'
									id='quantity'
									label='Quantidade'
								/>
							</Box>

						</Box>
					</DialogContent>

					<DialogActions>
          	<Button onClick={() => {
							setOpenDialogAddItems(false)
							setQuantity(1)
						}}>Cancelar</Button>
          	<Button onClick={handleSaveItem}>Salvar</Button>
					</DialogActions>

				</Dialog>

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

											{selectedProduct && <TableBodySelectedProduct selectedProduct={selectedProduct}/>}

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
