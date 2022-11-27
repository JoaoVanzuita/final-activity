import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { EmployeeMenu, MakePurchase, MakeSale, ManageInventory, ManagerMenu } from "../pages"
import { ManageEmployees } from "../pages/manager-pages/manage-employees/ManageEmployees"
import { useDrawerContext } from "../shared/contexts"

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  //TODO: carregar rotas de acordo com o tipo de usuário logado

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/menu-gerente',
        label: 'Menu gerente',
      },
      {
        icon: 'home',
        path: '/menu-funcionario',
        label: 'Menu funcionário'
      },
      {
        icon: 'shopping_cart',
        path: '/efetuar-compra',
        label: 'Efetuar compra'
      },
      {
        icon: 'shopping_cart',
        path: '/efetuar-venda',
        label: 'Efetuar venda'
      },
      {
        icon: 'inventory',
        path: '/gerenciar-estoque',
        label: 'Gerenciar estoque'
      },
      {
        icon: 'badge',
        path: '/gerenciar-funcionarios',
        label: 'Gerenciar funcionários'
      },
    ]);
  }, []);

  return(
    <Routes>
      <Route path='/menu-gerente' element={<ManagerMenu/>}/>
      <Route path='/menu-funcionario' element={<EmployeeMenu/>}/>
      <Route path='/efetuar-venda' element={<MakeSale/>}/>
      <Route path='/efetuar-compra' element={<MakePurchase/>}/>
      <Route path='/gerenciar-estoque' element={<ManageInventory/>}/>
      <Route path='/gerenciar-funcionarios' element={<ManageEmployees/>}/>

      <Route path='*' element={<Navigate to="/menu-gerente" />}/>
    </Routes>
  )
}
