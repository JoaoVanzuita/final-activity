import { ToolbarListing } from "../../shared/components"
import { BasePageLayout } from "../../shared/layouts"

export const ManageInventory = () => {

  return(
    <BasePageLayout title='Gerenciar estoque' toolbar={<ToolbarListing/>}>
      Manage inventory
    </BasePageLayout>
  )
}
