import { useNavigate } from "react-router-dom"
import { Toolbar } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const EmployeeMenu = () => {
  const navigate = useNavigate()

  return(
    <BasePageLayout title='Menu Principal - Funcionário' toolbar={<Toolbar
        showButtonManageAccount
        showButtonExit

        onClickButtonManageAccount={() => navigate('/gerenciar-conta')}
      />}
    >
      Employee menu
    </BasePageLayout>
  )
}
