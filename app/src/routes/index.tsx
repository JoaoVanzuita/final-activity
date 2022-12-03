import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { EmployeeMenu, MakePurchase, MakeSale, ManageAccount, ManageEmployees, ManageInventory, ManagerMenu, SaveProduct, SaveUser } from "../pages"
import { useAuthContext, useDrawerContext } from "../shared/contexts"
import { UserService } from "../shared/services"
import { ResponseError } from "../shared/types"

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const { isAuthenticated } = useAuthContext()
  let menuPath = ''

  useEffect(() => {

    UserService.getLogged().then(result => {
      if(result instanceof ResponseError){
        return
      }

      if(result.role === 'manager'){
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
            icon: 'shopping_cart',
            path: '/efetuar-compra',
            label: 'Efetuar compra'
          },
          {
            icon: 'badge',
            path: '/gerenciar-usuarios',
            label: 'Gerenciar usuários'
          }
        ])
        menuPath = '/menu-gerente'
        return
      }

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
      menuPath = '/menu-funcionario'
    })
  }, [isAuthenticated]);

  return(
    <Routes>
      <Route path='/' element={<ManagerMenu/>}/>
      <Route path='/menu-gerente' element={<ManagerMenu/>}/>
      <Route path='/menu-funcionario' element={<EmployeeMenu/>}/>
      <Route path='/gerenciar-conta' element={<ManageAccount/>}/>
      <Route path='/efetuar-venda' element={<MakeSale/>}/>
      <Route path='/efetuar-compra' element={<MakePurchase/>}/>
      <Route path='/gerenciar-estoque' element={<ManageInventory/>}/>
      <Route path='/gerenciar-estoque/produto/:id' element={<SaveProduct/>}/>
      <Route path='/gerenciar-estoque/produto/novo' element={<SaveProduct/>}/>
      <Route path='/gerenciar-usuarios' element={<ManageEmployees/>}/>
      <Route path='/gerenciar-usuarios/usuario/:id' element={<SaveUser/>}/>
      <Route path='/gerenciar-usuarios/usuario/novo' element={<SaveUser/>}/>

      <Route path='*' element={<Navigate to={menuPath} />}/>
    </Routes>
  )
}
