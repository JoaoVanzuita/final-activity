import { ToolbarTransaction } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const MakeSale = () => {

  return(
    <BasePageLayout title='Efetuar Venda' toolbar={<ToolbarTransaction/>}>
      Make sale
    </BasePageLayout>
  )
}
