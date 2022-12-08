import { Box, Card, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Toolbar } from '../../../shared/components'
import { useInvoiceItemsContext } from '../../../shared/contexts'
import { BasePageLayout } from '../../../shared/layouts'
import { InvoiceItem} from '../../../shared/types'

export const ViewOrder = () => {
	const theme = useTheme()
	const alertBackground = theme.palette.background.default
	const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
	const mdDown = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()
	const { items, setItems} = useInvoiceItemsContext()
	const [selectedItem, setSelectedItem] = useState<InvoiceItem>()

	const handleSelectItem = (item: InvoiceItem) => {
		setSelectedItem(item)
	}

	const handleRemoveItem = () => {

		if(!selectedItem){
			Swal.fire({
				titleText:'Nenhum item selecionado',
				text: 'Selecione um item na lista',
				icon: 'error',
				background: alertBackground,
				color: alertColor
			})
			return
		}

		const newItems = items.filter(item => item.product !== selectedItem?.product)

		setItems(newItems)

		setSelectedItem(undefined)
	}

	return(
		<BasePageLayout title='Visualizar Pedido' toolbar={<Toolbar
			showButtonRemoveItem
			showButtonBack
			onClickButtonRemoveItem={handleRemoveItem}
			onClickButtonBack={() => navigate(-1)}
		/>}
		>

			<Box
				width='100%'
				display='flex'
			>

				<Grid container margin={2}>
					<Grid item container display='flex' spacing={2}>

						<Grid item xs={12} sm={10} md={6} lg={4} order={mdDown ? 2 : 1}>

							<TableContainer  component={Paper} variant='outlined'>
								<Typography variant='h6' align='center' paddingTop={2} paddingBottom={2}>
									Itens do pedido
								</Typography>

								<Divider/>

								<Table>

									{!items.length &&
                  	<caption>Nenhum item no pedido</caption>
									}

									<TableHead>
										<TableRow>
											<TableCell>Produto</TableCell>
											<TableCell>Preço unitário</TableCell>
											<TableCell>Quantidade</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{items && items.map(item => (
											<TableRow key={Math.random()} onClick={() => handleSelectItem(item)}>
												<TableCell>{item.product.name}</TableCell>
												<TableCell>{item.unitPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
												<TableCell>{item.quantity}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>

						</Grid>

						<Grid item xs={12} sm={10} md={6} lg={4} order={mdDown ? 1 : 2} >

							<Card variant='outlined'>
								<CardContent>
									<Typography variant='h5' align='center' paddingBottom={2}>
                    Item selecionado
									</Typography>

									<TableContainer>

										<Divider/>

										<Table>

											{!selectedItem &&
                        <caption>Nenhum item selecionado</caption>
											}

											{selectedItem && <TableBody>
												<TableRow>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> Produto </Typography>
													</TableCell>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> {selectedItem ? selectedItem.product.name : ''} </Typography>
													</TableCell>
												</TableRow>

												<TableRow>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> Quantidade </Typography>
													</TableCell>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> {selectedItem ? selectedItem.quantity : ''} </Typography>
													</TableCell>
												</TableRow>

												<TableRow>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> Preço unitário </Typography>
													</TableCell>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> {selectedItem ? `${selectedItem.unitPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}` : ''} </Typography>
													</TableCell>
												</TableRow>

												<TableRow>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> Preço total </Typography>
													</TableCell>
													<TableCell sx={{ border: 'none' }}>
														<Typography variant='body1'> {selectedItem ? `${(selectedItem.quantity * selectedItem.unitPrice).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}` : ''} </Typography>
													</TableCell>
												</TableRow>

											</TableBody>}
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
