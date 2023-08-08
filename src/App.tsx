import main from "./router/main"
import { RouteObject, useRoutes } from "react-router-dom"
import Login from "./pages/test/gptForm"
import "./assets/global.css"

function App() {
  const e=useRoutes(main as RouteObject[])
  return (
    <>
      <div>
        {e}
        {/* <Outlet /> */}
        {/* <Login /> */}
      </div>
    </>
  )
}

export default App
