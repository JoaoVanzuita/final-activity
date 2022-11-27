import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { EmployeeMenu, ManagerMenu } from "../pages"
import { useDrawerContext } from "../shared/contexts"

export const AppRoutes = () => {
  const { setDrawerOptions, toggleDrawerOpen } = useDrawerContext();

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
      }
    ]);
  }, []);

  return(
    <Routes>
      <Route path='/menu-gerente' element={<ManagerMenu/>}/>
      <Route path='/menu-funcionario' element={<EmployeeMenu/>}/>

      <Route path='*' element={<Navigate to="/menu-gerente" />}/>
    </Routes>
  )
}
