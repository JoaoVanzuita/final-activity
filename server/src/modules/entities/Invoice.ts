import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { InvoiceItem } from './InvoiceItem'

export enum InvoiceType {
	purchase = 'purchase',
	sale = 'sale'
}

@Entity('invoices')
export class Invoice {

	@PrimaryGeneratedColumn()
		id: number

	@Column({ name: 'invoice_type', length: 255 })
		invoiceType: InvoiceType

	@Column({ type: 'date' })
		date: Date

	@Column({ name: 'total_price', type: 'numeric', precision: 12, scale: 2 })
		totalValue: number

	@OneToMany(() => InvoiceItem, item => item.invoice)
		items: InvoiceItem[]
}
