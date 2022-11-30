import { Environment } from "../../../environment"
import { Product } from "../../../types"
import { Api } from "../axios-config"

const create = async (productData: Product): Promise<Product | Error> => {
  try {

    const { data } = await Api.post('/products', productData)

    return data.id

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const getAll = async (): Promise<Product[] | Error> => {
  try {

    const { data } = await Api.get('/products')

    return data.products

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const getByName = async (name: string): Promise<Product[] | Error> => {
  try {

    const { data } = await Api.get(`/products/name=${name}`)

    return data.products

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const getById = async (id: number): Promise<Product | Error> => {
  try {

    const { data } = await Api.get(`/products/${id}`)

    return data.product

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const updateById = async (productData: Product): Promise<number | Error> => {
  try {

    const { data } = await Api.put(`/products/${productData.id}`, productData)

    return data.id

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}
const deleteById = async (id: number): Promise<number | Error> => {
  try {

    const { data } = await Api.delete(`/products/${id}`)

    return data.id

  } catch (error) {
    return new Error(`${Environment.SERVER_ERROR}`)
  }
}

export const ProductsService = {
  create,
  getAll,
  getByName,
  getById,
  updateById,
  deleteById,
}
