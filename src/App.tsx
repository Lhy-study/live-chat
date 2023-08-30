// import main from "./router/main"
// import { RouteObject, useRoutes} from "react-router-dom"
// import {Suspense} from "react"
// // import Login from "./pages/test/gptForm"
// import "../public/font_4127518_jb5w31nsehg/iconfont.css"
// import "./assets/global.less"

// function App() {
//   const e=useRoutes(main as unknown as RouteObject[])
//   return (
//     <>
//         {/* <Home /> */}
//         <Suspense>
//           {e}
//         </Suspense>
//         {/* <Outlet /> */}
//         {/* <Login /> */}
//     </>
//   )
// }

// export default App


import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import "react-toastify/ReactToastify.css"
import "../public/font_4127518_jb5w31nsehg/iconfont.css"
import "./assets/global.less"
function App() {
  const Login = lazy(() => import("./pages/Login/Login"))
  const Home = lazy(() => import("./pages/Home/Home"))
  return (
    <>
      <Suspense >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

