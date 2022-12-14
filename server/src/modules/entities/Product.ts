import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { InvoiceItem } from './InvoiceItem'

@Entity('products')
export class Product {

	@PrimaryGeneratedColumn()
		id: number

	@Column({ length: 255 })
		name: string

	@Column({ type: 'integer' })
	@Check('"quantity" > -1')
		quantity: number

	@Column({ name: 'sale_price', type: 'numeric', precision: 12, scale: 2 })
	@Check('"sale_price" > -1')
		salePrice?: number

	@Column({ name: 'cost_price', type: 'numeric', precision: 12, scale: 2 })
	@Check('"cost_price" > -1')
		costPrice: number

	@OneToMany(() => InvoiceItem, item => item.product)
		items: InvoiceItem[]
}
