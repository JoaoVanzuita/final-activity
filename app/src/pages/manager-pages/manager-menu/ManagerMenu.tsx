import { Toolbar } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const ManagerMenu = () => {

  return(
    <BasePageLayout title='Menu Principal - Gerente' toolbar={<Toolbar
        showButtonManageAccount
        showButtonExit
      />}
    >

    </BasePageLayout>
  )
}
