import { Toolbar } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const MakeSale = () => {

  return(
    <BasePageLayout title='Efetuar Venda' toolbar={<Toolbar
        showButtonSave
        showButtonAddItem
        showButtonViewOrder
        showButtonBack
      />}
    >
      Make sale
    </BasePageLayout>
  )
}
