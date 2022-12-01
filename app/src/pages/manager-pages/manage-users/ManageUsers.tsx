import { useNavigate } from "react-router-dom"
import { Toolbar } from "../../../shared/components"
import { BasePageLayout } from "../../../shared/layouts"

export const ManageEmployees = () => {
  const navigate = useNavigate()

  return(
    <BasePageLayout title='Gerenciar Usuários' toolbar={<Toolbar
        showSearchInput
        showButtonNew
        showButtonBack
        onClickButtonBack={() => navigate(-1)}
      />}
    >

    </BasePageLayout>
  )
}
