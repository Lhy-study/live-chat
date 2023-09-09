import { lazy, Suspense,StrictMode , useState} from "react"
import { Route, Routes } from "react-router-dom"
import { UserInfoProvider } from "@/Context/userContext"
import AddFriendForm from "@/components/AddFriendFrom/AddFriendForm"
import Mask from "@/components/Mask/Mask"
import Chat from "./layout/Chat/Chat"
import "react-toastify/ReactToastify.css"
import "../public/font_4127518_jb5w31nsehg/iconfont.css"
import "./assets/global.less"
import PubSub from "pubsub-js"
function App() {
  const [ show,setShow ] =useState(false) 
  const subscribe=(_:string,data:boolean)=>{
    setShow(data);
  }
  PubSub.subscribe("openDialog",subscribe)
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
          {
        show && <Mask callback={()=>setShow(false)}>
          <AddFriendForm />
        </Mask>
      }
        </Suspense>
      </UserInfoProvider>
    </StrictMode>
  );
}

export default App;

