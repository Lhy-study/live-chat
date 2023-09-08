import { lazy, Suspense,StrictMode} from "react"
import { Route, Routes } from "react-router-dom"
import { UserInfoProvider } from "@/Context/userContext"
import "react-toastify/ReactToastify.css"
import "../public/font_4127518_jb5w31nsehg/iconfont.css"
import "./assets/global.less"
import Chat from "./layout/Chat/Chat"
function App() {

  const Login = lazy(() => import("@/pages/Login/Login"));
  const Home = lazy(() => import("@/pages/Home/Home"));
  const Contacts=lazy(()=>import("@/pages/Home/Contacts/Contacts"));
  const Conversation=lazy(()=>import("@/pages/Home/Conversation/Conversation"));
  return (
    <StrictMode>
      <UserInfoProvider>
        <Suspense >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />}>
              <Route path="/home/contacts" element={<Contacts/>}> </Route>
              <Route path="/home/conversation" element={<Conversation/>}> 
                <Route path="/home/conversation/:uid" element={<Chat/>}/>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </UserInfoProvider>
    </StrictMode>
  );
}

export default App;

