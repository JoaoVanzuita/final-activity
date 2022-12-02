import { Request, Response } from "express";
import { ServerError } from "../errors/ServerError";
import { InvoiceRepository } from "../repositories/InvoiceRepository";
import { InvoiceService } from "../service/InvoiceService";

export class InvoiceController {
  async create(req: Request, res: Response) {

    const errors = []

    if (!req.body.invoiceType) {
      errors.push('no type specified')
    }
    if (!req.body.date) {
      errors.push('no date specified')
    }
    if (!req.body.totalValue) {
      errors.push('no total value specified')
    }
    if (!req.body.items) {
      errors.push('no items specified')
    }
    if (errors.length) {
      throw new ServerError(errors.join())
    }

    const { invoiceType, date, items, totalValue } = req.body

    const invoice = InvoiceRepository.create({
      invoiceType,
      date,
      items,
      totalValue
    })

    const newInvoice = await new InvoiceService().create(invoice)

    if (newInvoice == null) {
      throw new ServerError(`invalid quantity for product`, 400)
    }

    return res.status(201).json({
      "status": 201,
      "invoice": newInvoice
    })

  }
}
