import { useEffect } from "react"
import { AuthService } from "../../shared/services/auth-service/AuthService"

export const Home = () => {

  useEffect(() => {
    const response = fetch()
    console.log(response)
  }, [])

  const fetch = async () => {
    return await AuthService('manager@example', 'manager123')
  }

  return<>
  </>
}
