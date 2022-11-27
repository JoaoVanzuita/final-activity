import { ToolbarListing } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const ManageEmployees = () => {

  const handle = (text: string) => {
    console.log(text)
  }

  return(
    <BasePageLayout title='Gerenciar funcionários' toolbar={<ToolbarListing/>}>
      
    </BasePageLayout>
  )
}
