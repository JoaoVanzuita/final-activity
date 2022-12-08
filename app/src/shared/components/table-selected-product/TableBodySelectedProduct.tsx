import { TableBody, TableCell, TableRow, Typography } from '@mui/material'

import { Product } from '../../types'

interface ITableBodySelectedProductProps {
	selectedProduct: Product | undefined
	showRowCostPrice: boolean
}

export const TableBodySelectedProduct:React.FC<ITableBodySelectedProductProps> = ( { selectedProduct, showRowCostPrice = false }) => {

	return(
		<TableBody>
			<TableRow>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> Nome </Typography>
				</TableCell>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> {selectedProduct ? selectedProduct.name : ''} </Typography>
				</TableCell>
			</TableRow>

			<TableRow>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> Quantidade </Typography>
				</TableCell>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> {selectedProduct ? selectedProduct?.quantity : ''} </Typography>
				</TableCell>
			</TableRow>

			{showRowCostPrice && <TableRow>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> Preço de custo </Typography>
				</TableCell>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> {selectedProduct ? selectedProduct?.costPrice : ''} </Typography>
				</TableCell>
			</TableRow>}

			<TableRow>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> Preço de venda </Typography>
				</TableCell>
				<TableCell sx={{ border: 'none' }}>
					<Typography variant='body1'> {selectedProduct ? selectedProduct?.salePrice : ''} </Typography>
				</TableCell>
			</TableRow>

		</TableBody>
	)
}
