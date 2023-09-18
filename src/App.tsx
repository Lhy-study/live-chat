import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { UserInfoProvider } from "@/Context/userContext"
import ShowImg from "./components/ShowImg/ShowImg"
import AddFriendForm from "./components/AddFriendFrom/AddFriendForm"
import UpdateForm from "./components/UpdateForm/UpdateForm"
import "react-toastify/ReactToastify.css"
import "@/assets/font_4127518_jb5w31nsehg/iconfont.css"
import "./assets/global.less"
function App() {
  
  const Login = lazy(() => import("@/pages/Login/Login"));
  const Home = lazy(() => import("@/pages/Home/Home"));
  const Contacts = lazy(() => import("@/pages/Home/Contacts/Contacts"));
  const Conversation = lazy(() => import("@/pages/Home/Conversation/Conversation"));
  const Chat = lazy(() => import("@/layout/Chat/Chat"))
  const UserInfoShow = lazy(() => import("@/layout/UserInfoShow/UserInfoShow"))
  return (
    // <StrictMode>
    <UserInfoProvider>
      <Suspense >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route path="/home/contacts" element={<Contacts />}>
              <Route path="/home/contacts/:uid" element={<UserInfoShow />}></Route>
            </Route>
            <Route path="/home/conversation" element={<Conversation />}>
              <Route path="/home/conversation/:convId" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
        <AddFriendForm />
        <ShowImg />
        <UpdateForm />
      </Suspense>
    </UserInfoProvider>
    // </StrictMode>
  );
}

export default App;

