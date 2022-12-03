import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { MainMenu, MakePurchase, MakeSale, ManageAccount, ManageEmployees, ManageInventory, SaveProduct, SaveUser } from "../pages"
import { useAuthContext, useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const auth = useAuthContext()

    useEffect(() => {

      if(auth.user?.role == 'manager'){

        setDrawerOptions([
          {
            icon: 'home',
            path: '/menu-gerente',
            label: 'Menu gerente',
          },
          {
            icon: 'inventory',
            path: '/gerenciar-estoque',
            label: 'Gerenciar estoque'
          },
          {
            icon: 'badge',
            path: '/gerenciar-usuarios',
            label: 'Gerenciar usuários'
          },
          {
            icon: 'shopping_cart',
            path: '/efetuar-compra',
            label: 'Efetuar compra'
          }
        ])
        return
      }
      if(auth.user?.role == 'employee'){

        setDrawerOptions([
          {
            icon: 'home',
            path: '/menu-funcionario',
            label: 'Menu funcionário'
          },
          {
            icon: 'inventory',
            path: '/gerenciar-estoque',
            label: 'Gerenciar estoque'
          },
          {
            icon: 'shopping_cart',
            path: '/efetuar-venda',
            label: 'Efetuar venda'
          }
        ])
      }
  }, []);

  return(
    <Routes>
      <Route path='/' element={<MainMenu/>}/>
      <Route path='/gerenciar-conta' element={<ManageAccount/>}/>
      <Route path='/efetuar-venda' element={<MakeSale/>}/>
      <Route path='/efetuar-compra' element={<MakePurchase/>}/>
      <Route path='/gerenciar-estoque' element={<ManageInventory/>}/>
      <Route path='/gerenciar-estoque/produto/:id' element={<SaveProduct/>}/>
      <Route path='/gerenciar-estoque/produto/novo' element={<SaveProduct/>}/>
      <Route path='/gerenciar-usuarios' element={<ManageEmployees/>}/>
      <Route path='/gerenciar-usuarios/usuario/:id' element={<SaveUser/>}/>
      <Route path='/gerenciar-usuarios/usuario/novo' element={<SaveUser/>}/>

      <Route path='*' element={<Navigate to={'/'} />}/>
    </Routes>
  )
}
