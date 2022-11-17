import { Request, Response } from "express";
import { InvoiceType } from "../entities/Invoice";
import { ServerError } from "../errors/ServerError";
import { InvoiceRepository } from "../repositories/InvoiceRepository";
import { InvoiceService } from "../service/InvoiceService";

export class InvoiceController {
  async create(req: Request, res: Response) {

    const errors = []

    if (!req.body.type) {
      errors.push('no type specified')
    }
    if (!req.body.date) {
      errors.push('no date specified')
    } if (!req.body.itens || req.body.itens.length == 0) {
      errors.push('no itens specified')
    }
    if (errors.length) {
      throw new ServerError(errors.join())
    }

    const { type, date, itens } = req.body

    const invoice = InvoiceRepository.create({
      type: InvoiceType[type],
      date,
      itens
    })

    const newInvoice = await new InvoiceService().create(invoice)

    return res.status(201).json({
      "status": 201,
      "data": newInvoice
    })

  }
}
