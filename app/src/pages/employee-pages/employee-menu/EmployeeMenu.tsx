import { ToolbarMenu } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const EmployeeMenu = () => {

  return(
    <BasePageLayout title='Menu Principal - Funcionário' toolbar={<ToolbarMenu/>}>
      Employee menu
    </BasePageLayout>
  )
}
