import CustomIcon from "@/components/IconFont/CustomIcon"
import PubSub from "pubsub-js"
import { getFriReq, agreeFriReq } from "@/api/friend"
import {  useState ,useEffect} from "react"
import { baseUrl } from "@/baseConfig"
import CustomImage from "@/components/CustomImage/CustomImage"
import { toast, ToastContainer } from "react-toastify"
import { UserInfo ,Gender} from "@/types/interface"
import clsx from "clsx"

function checkoutIcon(key:Gender) {
    switch (key) {
        case 'male':
            return 'icon-nan'
        case 'female':
            return 'icon-nv'
        default:
            return 'icon-yincang';
    }
}

interface requestProp {
    agreeTime: string,
    fromId: number,
    targetId: number
    id: number,
    isAgree: boolean,
    startTime: string,
    fromUser: UserInfo
}

const NotContacts = () => {
    const [reqList, setList] = useState<requestProp[]>([])
    const handle = () => {
        PubSub.publish("openDialog", true)
    }
    const checkout = () => {
        PubSub.publish("isContacts", true)
    }
    useEffect(() => {
        getFriReq()
            .then((res) => {
                // console.log(res);
                setList(res.data.data)
            })
            .catch((e) => {
                toast.error(`${e.msg}`, {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    },[])
    const agree = (id:number) => {
        agreeFriReq(id)
            .then(() => {
                toast.success("添加成功!!!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
            .catch((e)=>{
                // console.log(e);
                toast.error(`${e.msg}`, {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }
    return (
        <div className="contacts contacts-false">
            <header>
                <p>好友请求</p>
                <div onClick={handle}>
                    <CustomIcon name="icon-tianjiahaoyou" size="big" />
                </div>
            </header>
            <span onClick={checkout} className="iconfont icon-qiehuan">联系人 </span>
            {
                reqList.map((item) =>
                (<div className="reqList" key={item.id}>
                    <div className="reqListInfo">
                        <CustomImage url={baseUrl + item.fromUser.avatar} width="70px" height="70px" />
                        <div className="info">
                            <span>{item.fromUser.username}</span>
                            <span className={clsx('iconfont', checkoutIcon(item.fromUser.gender))}></span>
                        </div>
                    </div>
                    {
                        item.isAgree ? <p style={{color:"#ccc"}}>已同意</p> : <button onClick={() =>agree(item.id)}>同意</button>
                    }
                </div>)
                )
            }
            <ToastContainer
                position='top-center'
                theme="colored"
                autoClose={3000}
            />
        </div>
    )
}
export default NotContacts