import { Environment } from '../../../environment'
import { Invoice, InvoiceItem, ResponseError } from '../../../types'
import { Api } from '../axios-config'

const create = async (invoiceData: Invoice): Promise<Invoice | ResponseError> => {
	try {

		const { data } = await Api.post('/invoices', invoiceData)

		return data.invoice

	} catch (error) {

		if (error instanceof ResponseError) {
			return error
		}

		return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
	}
}

const calculateTotalValue = (itens: InvoiceItem[]): number => {
	let total = 0

	itens.forEach(item => {
		total += item.quantity * item.unitPrice
	})

	return total
}

export const InvoiceService = {
	create,
	calculateTotalValue
}
