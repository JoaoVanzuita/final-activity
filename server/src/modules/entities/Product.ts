import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { InvoiceItem } from "./InvoiceItem"

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  name: string

  @Column({ type: "integer" })
  quantity: number

  @Column({ name: 'sale_price', type: "numeric", precision: 12, scale: 2 })
  salePrice?: number

  @Column({ name: 'cost_price', type: "numeric", precision: 12, scale: 2 })
  costPrice: number

  @OneToMany(() => InvoiceItem, item => item.product)
  items: InvoiceItem[]
}
