import { Invoice, InvoiceType } from "../entities/Invoice";
import { InvoiceItemRepository } from "../repositories/InvoiceItemRepository";
import { InvoiceRepository } from "../repositories/InvoiceRepository";
import { ProductService } from "./ProductService";

export class InvoiceService {
  async create(invoice: Invoice): Promise<Invoice> {

    const newInvoice = await InvoiceRepository.save(invoice)

    invoice.items.forEach(async item => {

      const newItem = InvoiceItemRepository.create({
        quantity: item.quantity,
        product: item.product,
        invoice: {
          "id": newInvoice.id
        },
        unitPrice: item.unitPrice
      })

      await InvoiceItemRepository.save(newItem)

      if (newInvoice.invoiceType == InvoiceType.purchase) {
        const averagePrice = await new ProductService().getAveragePrice(item.product)

        await new ProductService().updatePrice(item.product.id, averagePrice)

        await new ProductService().updateInventory(item.product.id, item.quantity)
      }
      if (newInvoice.invoiceType == InvoiceType.sale) {
        await new ProductService().updateInventory(item.product.id, -item.quantity)
      }

    })

    return newInvoice
  }
}
