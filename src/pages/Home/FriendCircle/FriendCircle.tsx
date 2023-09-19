import "./FriendCircle.less"
import { publish } from "pubsub-js"
import { useEffect , useState , useContext} from "react"
import {  getUserCOF } from "@/api/friendCircle"
import CustomIcon from "@/components/IconFont/CustomIcon"
import PublishCOF from "@/components/PublishCOF/PublishCOF"
import COFItem from "@/components/COFItem/COFItem"
import { COFDataType } from "@/types/cof"
import { UserInfoContext ,type UserInfoContextType } from "@/Context/userContext"
import clsx from "clsx"
import { toast } from "react-toastify"

const toastOptions={
  autoClose:1500,
  position:toast.POSITION.TOP_CENTER
}

const FriendCircle = () => {
  const [ showPublishFC , setShowPublish ] = useState(false)
  const [ cofData , setCofData ] = useState<Array<COFDataType>>([])
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  useEffect(() => {
    publish("change", true)
    return ()=>{
      publish("change", false)
    }
  }, [])
  useEffect(()=>{
    getUserCOF(userInfo?.uid as number)
      .then(({data})=>{
        setCofData(data.data)
      }).catch((e)=>{
        toast.error(`${e.msg}`,toastOptions)
      })
  },[userInfo])
  return (
    <div className="friendCircle">
      <div className="friendCircle-main">
        <div className="topHeader">
          <header>欢迎来到参观朋友圈~</header>
          <div className="icon-one">
            <CustomIcon
              name="icon-yiliaohangyedeICON-"
              onClick={() => history.go(-1)}
              size="small"
            />
          </div>
          <div className={clsx('icon-two',showPublishFC ? 'check' : '')}>
            <CustomIcon
              name="icon-a-bianjifabiao"
              onClick={() => setShowPublish(!showPublishFC)}
              size="small"
            />
          </div>
        </div>
        <PublishCOF className={ showPublishFC ? 'show-FC' : '' }/>
        <div className="FC-content">
          {
            cofData.map((item)=>(
              <COFItem 
                key={item.cirFriId}
                data={ item } 
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default FriendCircle