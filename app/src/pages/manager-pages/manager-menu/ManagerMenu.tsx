import { useNavigate } from "react-router-dom"
import { Toolbar } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const ManagerMenu = () => {
  const navigate = useNavigate()

  return(
    <BasePageLayout title='Menu Principal - Gerente' toolbar={<Toolbar
        showButtonManageAccount
        showButtonExit

        onClickButtonManageAccount={() => navigate('/gerenciar-conta')}
      />}
    >
      Manager menu
    </BasePageLayout>
  )
}
