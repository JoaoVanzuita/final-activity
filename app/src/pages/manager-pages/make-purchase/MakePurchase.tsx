import { Toolbar } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const MakePurchase = () => {

  return(
    <BasePageLayout title='Efetuar Compra' toolbar={<Toolbar
      showButtonSave
      showButtonAddItem
      showButtonViewOrder
      showButtonBack
      />}
    >
      Make purchase
    </BasePageLayout>
  )
}
