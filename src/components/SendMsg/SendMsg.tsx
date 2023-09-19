import "./SendMsg.less"
import { memo, useContext, useEffect, useState, useRef } from "react"
import { UserInfoContext, UserInfoContextType } from "@/Context/userContext"
import { useForm } from "react-hook-form"
import { io } from "socket.io-client"
import { baseUrl , emoList} from "@/baseConfig"
import { publish } from "pubsub-js"
import { toast , ToastContainer } from "react-toastify"
import IconFont from "@/components/IconFont/CustomIcon"
import useOutsideClick from "@/hooks/clickOutside"
import clsx from "clsx"
interface FormProp {
  text: string
}

interface prop {
  convId: number
}

const SendMsg = memo<prop>(({ convId }) => {
  const imgRef = useRef<HTMLInputElement | null>(null)
  const emojiIconRef = useRef<HTMLDivElement | null>(null)
  const emojiListRef = useRef<HTMLDivElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  const [socket] = useState(io(baseUrl))
  const [showEmoji, setShowEmoji] = useState(false)
  const { register, reset, watch, setValue } = useForm<FormProp>({
    mode: "all",
    reValidateMode: "onChange",
  })

  useOutsideClick(emojiListRef,()=>setShowEmoji(false),emojiIconRef)

  useEffect(() => {
    //出现多次是这里的问题
    socket.emit("joinSession", convId);
    socket.on("message", (message) => {
      // console.log(11);
      publish("message", message)
    })
    // console.log('测试');

  }, [convId, socket])
  //点击提交按钮
  const submit = ({ text }: FormProp) => {
    socket.emit("chatMsg", convId, {
      convId,
      senderId: userInfo?.uid,
      content: text,
      contentType:'TEXT'
    });
    reset()
  }

  //发送图片
  const uploadImg = () => {
    imgRef.current?.click();
    (imgRef.current as HTMLInputElement).onchange =() => {
      if (imgRef.current?.files?.length && imgRef.current.files.length<=9) {
        const files = imgRef.current.files
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          if (element.size > 1024 * 1024 * 2) {
            toast.warning("图片数据大小不可以超过2m",{autoClose:1500})
            return;
          } else if (element.type !== "image/jpeg" && element.type !== "image/png" && element.type!=="image/webp") {
            toast.warning("图片格式不正确,请确保图片为jpg、png或webp格式",{autoClose:1500})
            return;
          }
        }

        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          // console.log(element);
          socket.emit("chatImg",
            convId,
            {
              senderId:userInfo?.uid,
              content:element,
              originName:element.name, //后缀名
              contentType:'IMG'
            }
          )
        }
      }else{
        toast.warning("发送的图片不可以超过九张",{autoClose:1500})
      }
    }


  }

  //上传文件
  const uploadFile = ()=>{
    fileRef.current?.click();
    (fileRef.current as HTMLInputElement).onchange=()=>{
      if(fileRef.current?.files){
        // console.log(fileRef.current?.files[0]);
        const file=fileRef.current?.files[0];
        if(file.type != "image/jpeg" && file.type != "image/png" && file.type != "image/webp"){
          if(file.size > 1024 * 1024 * 20){
            toast.warning("文件大小不可以超过20M",{autoClose:1500})
          }
          console.log(file);
          
          socket.emit("chatFile",convId,{
            senderId:userInfo?.uid,
            content:file,
            originName:file.name, //后缀名
            contentType:'OTHERFILE'
          })
        }else{
          toast.warning("请上传非图片、视频、语音类型的文件",{autoClose:1500})
        }
      }
    }
  }

  return (
    <>
      <input type="file" multiple ref={imgRef} name="img" style={{ display: "none" }} />
      <input type="file" ref={fileRef} name="file" style={{ display: "none" }} />
      <form className="sendMsg">
        <div className="widgets">
          <div className={clsx("widgets-item", showEmoji ? 'check' : '')} ref={emojiIconRef}>
            <IconFont name="icon-biaoqing1" onClick={() => setShowEmoji(!showEmoji)} />
          </div>
          <div className="widgets-item" >
            <IconFont name="icon-tupian" onClick={() => uploadImg()} />
          </div>
          <div className="widgets-item" >
            <IconFont name="icon-wenjianjia" onClick={() => uploadFile()} />
          </div>
        </div>
        <textarea  {...register('text', { required: true })} rows={3} placeholder="输入的长度不可超过200" autoComplete="off" />
        <div className="send" >
          <IconFont name="icon-fasong" onClick={()=>submit({text:watch('text')})}/>
        </div>
        {
          showEmoji && <div className="emojiList" ref={emojiListRef}>
            {
              emoList.map((item, index) => (
                <p key={index} onClick={() => { setValue('text', watch('text') + item) }}>{item}</p>
              ))
            }
          </div>
        }
      </form>
      <ToastContainer />
    </>
  )
})
export default SendMsg