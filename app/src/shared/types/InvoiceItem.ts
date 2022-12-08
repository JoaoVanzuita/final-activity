import { Product } from '.'

export type InvoiceItem = {
	unitPrice: number
	quantity: number
	product: Product
}
