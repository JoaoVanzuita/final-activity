import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Invoice } from './Invoice'
import { Product } from './Product'

@Entity('invoice_items')
export class InvoiceItem {

	@PrimaryGeneratedColumn()
		id: number

	@Column({ type: 'integer' })
		quantity: number

	@Column({ name: 'unit_price', type: 'numeric', precision: 12, scale: 2 })
		unitPrice: number

	@ManyToOne(() => Invoice, invoice => invoice.items, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'invoice_id' })
		invoice: Invoice

	@ManyToOne(() => Product, product => product.items)
	@JoinColumn({ name: 'product_id' })
		product: Product
}
