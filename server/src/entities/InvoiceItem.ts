import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Invoice } from "./Invoice"
import { Product } from "./Product"

@Entity('invoice_itens')
export class InvoiceItem {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "integer" })
  quantity: number

  @Column({ name: 'unit_price', type: "numeric", precision: 12, scale: 2 })
  unitPrice: number

  @ManyToOne(() => Invoice, invoice => invoice.itens)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice

  @ManyToOne(() => Product, product => product.itens)
  @JoinColumn({ name: 'product_id' })
  product: Product
}
