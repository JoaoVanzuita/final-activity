import { Environment } from "../../../environment"
import { Invoice, InvoiceItem } from "../../../types"
import { Api } from "../axios-config"

const create = async (invoiceData: Invoice): Promise<Invoice | Error> => {
  try {

    const { data } = await Api.post('/invoices', invoiceData)

    return data.invoice

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
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
