import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {

  //TODO

  if(error.response?.status === 401){

  }

  return Promise.reject(error)
}
