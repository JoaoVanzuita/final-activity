import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { InvoiceItem } from "./InvoiceItem"

export enum InvoiceType {
  purchaseInvoice = 'purchase_invoice',
  saleInvoice = 'sale_invoice'
}

@Entity('invoices')
export class Invoice {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  type: InvoiceType

  @Column({ type: "date" })
  date: Date

  @Column({ name: 'total_price', type: "numeric", precision: 12, scale: 2 })
  totalValue: number

  @OneToMany(() => InvoiceItem, item => item.invoice)
  itens: InvoiceItem[]
}
