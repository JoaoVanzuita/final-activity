import { InvoiceItem } from "./InvoiceItem"

export enum InvoiceType {
  purchase = 'purchase',
  sale = 'sale'
}

export type Invoice = {
  id?: number
  date: Date
  invoiceType: InvoiceType
  totalValue: number
  items: InvoiceItem[]
}
