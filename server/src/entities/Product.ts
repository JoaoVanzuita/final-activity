import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  name: string

  @Column({ type: "integer" })
  quantity: number

  @Column({ name: 'sale_price', type: "numeric", precision: 10, scale: 2, default: 0 })
  salePrice?: number

  @Column({ name: 'cost_price', type: "numeric", precision: 10, scale: 2, default: 0 })
  costPrice: number

}
