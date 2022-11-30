import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ToolbarListing } from "../../shared/components"
import { useDebounce } from "../../shared/hooks"
import { BasePageLayout } from "../../shared/layouts"
import { ProductService } from "../../shared/services"
import { Product, ResponseError } from "../../shared/types"

export const ManageInventory:React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()
  const [rows, setRows] = useState<Product[]>([])

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    ProductService.getAll()
    .then(result => {
      if(result instanceof ResponseError){
        alert(`Code: ${result.statusCode } \nMessage: ${result.message}`)
        return
      }

      setRows(result)
    })
  },[])

  useEffect(() => {
    debounce(() => {
      ProductService.getByName(search)
      .then(result => {
        if(result instanceof ResponseError){
          alert(`Code: ${result.statusCode } \nMessage: ${result.message}`)
          return
        }

        setRows(result)
      })
    })
  }, [search])

  return(
    <BasePageLayout
      title='Gerenciar estoque'
      toolbar={<ToolbarListing
        textSearch={search}
        onChangeTextSearch={text => setSearchParams({ search: text }, {replace: true})}
      />}
    >
      Manage inventory
    </BasePageLayout>
  )
}
