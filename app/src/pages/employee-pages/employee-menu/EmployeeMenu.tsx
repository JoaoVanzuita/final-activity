import { Toolbar } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const EmployeeMenu = () => {

  return(
    <BasePageLayout title='Menu Principal - Funcionário' toolbar={<Toolbar
        showButtonManageAccount
        showButtonExit
      />}
    >
      Employee menu
    </BasePageLayout>
  )
}
