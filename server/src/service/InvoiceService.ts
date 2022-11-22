import { Invoice, InvoiceType } from "../entities/Invoice";
import { InvoiceItem } from "../entities/InvoiceItem";
import { InvoiceItemRepository } from "../repositories/InvoiceItemRepository";
import { InvoiceRepository } from "../repositories/InvoiceRepository";
import { ProductService } from "./ProductService";

export class InvoiceService {
  async create(invoice: Invoice): Promise<Invoice> {

    const value = this.calculateTotalValue(invoice.itens)
    invoice.totalValue = value

    const newInvoice = await InvoiceRepository.save(invoice)

    invoice.itens.forEach(async item => {

      const newItem = InvoiceItemRepository.create({
        quantity: item.quantity,
        product: item.product,
        invoice: {
          "id": newInvoice.id
        },
        unitPrice: item.unitPrice
      })

      await InvoiceItemRepository.save(newItem)

      if (newInvoice.type == InvoiceType.purchase) {
        const averagePrice = await new ProductService().getAveragePrice(item.product)

        await new ProductService().updatePrice(item.product.id, averagePrice)

        await new ProductService().updateInventory(item.product.id, item.quantity)
      }
      if (newInvoice.type == InvoiceType.sale) {
        await new ProductService().updateInventory(item.product.id, -item.quantity)
      }

    })

    return newInvoice
  }

  calculateTotalValue = (itens: InvoiceItem[]): number => {
    let total = 0

    itens.forEach(item => {
      total += item.quantity * item.unitPrice
    })

    return total
  }
}
