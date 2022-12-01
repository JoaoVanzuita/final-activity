import { Environment } from "../../../environment"
import { Product, ResponseError } from "../../../types"
import { Api } from "../axios-config"

const create = async (productData: Product): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.post('/products', productData)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const getAll = async (): Promise<Product[] | ResponseError> => {
  try {

    const { data } = await Api.get('/products')

    return data.products

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const getByName = async (name: string): Promise<Product[] | ResponseError> => {

  try {

    const { data } = await Api.get(`/products/search?name=${name}`)
    return data.products

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(Environment.SERVER_ERROR, 500)
  }
}
const getById = async (id: number): Promise<Product | ResponseError> => {
  try {

    const { data } = await Api.get(`/products/${id}`)

    return data.product

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const updateById = async (productData: Product): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.put(`/products/${productData.id}`, productData)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}
const deleteById = async (id: number): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.delete(`/products/${id}`)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}

export const ProductService = {
  create,
  getAll,
  getByName,
  getById,
  updateById,
  deleteById,
}
