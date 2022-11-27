import { ToolbarTransaction } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const MakePurchase = () => {

  return(
    <BasePageLayout title='Efetuar Compra' toolbar={<ToolbarTransaction/>}>
      Make purchase
    </BasePageLayout>
  )
}
