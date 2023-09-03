import { lazy, Suspense,StrictMode} from "react"
import { Route, Routes } from "react-router-dom"
import { UserInfoProvider } from "@/context/userContext"
import "react-toastify/ReactToastify.css"
import "../public/font_4127518_jb5w31nsehg/iconfont.css"
import "./assets/global.less"
function App() {

  const Login = lazy(() => import("./pages/Login/Login"))
  const Home = lazy(() => import("./pages/Home/Home"))
  return (
    <StrictMode>
      <UserInfoProvider>
        <Suspense >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Suspense>
      </UserInfoProvider>
    </StrictMode>
  );
}

export default App;

