import "./PublishCOF.less"
import { useForm } from "react-hook-form"
import { useState, useRef } from "react"
import { toast, ToastContainer } from "react-toastify"
import { emoList } from "@/baseConfig"
import { sendFC } from "@/api/friendCircle"
import useOutsideClick from "@/hooks/clickOutside"
import clsx from "clsx"

interface PublishFCProp {
    text: string
}

interface prop {
    className: string
}

const toastOptions = {
    autoClose: 1500,
    position: toast.POSITION.TOP_CENTER
}

const PublishCOF: React.FC<prop> = ({ className }) => {
    const pushImgRef = useRef<HTMLInputElement | null>(null)
    const emojiListRef = useRef<HTMLDivElement|null>(null)
    const emojiIcon = useRef<HTMLLIElement|null>(null)
    const [showEmoji, setShowEmoji] = useState(false);
    const [urls, setUrl] = useState<Array<string>>([])//设置预览图片数据
    const [formData] = useState<FormData>(new FormData())
    const { register, watch, setValue } = useForm<PublishFCProp>({
        mode: "all"
    })

    useOutsideClick(emojiListRef,()=>setShowEmoji(false),emojiIcon)

    //把图片书记读取到formdata里和设置预览图
    const handlePush = () => {
        pushImgRef.current?.click();
        setUrl([]); // 清空前端预览数组
        formData.delete("image[]");
        (pushImgRef.current as HTMLInputElement).onchange = async () => {
            const fr = new FileReader();
            if ((pushImgRef.current?.files?.length) as number <= 9) {
                const files = pushImgRef.current?.files as FileList;
                for (let index = 0; index < (files as FileList).length; index++) {
                    const element = files[index];
                    const arr = element.name.trim().split('.');//检查文件名字是否为 .png
                    if(arr[arr.length-2] === ''){
                        toast.error("图片名字格式不对，请检查上传的图片文件名字", toastOptions)
                        return;
                    }else if (element.size > 1024 * 1024 * 1) {
                        toast.warning("图片大小不可以超过1M", toastOptions)
                        return;
                    } else if (element.type !== "image/jpeg" && element.type !== "image/png" && element.type !== "image/webp") {
                        toast.error("图片格式不正确,请确保图片为jpg、png或wbep格式格式", toastOptions)
                        return;
                    }
                }

                const promiseS = []
                for (const file of files) {
                    // console.log(file);
                    formData.append("image[]", file)
                    promiseS.push(await new Promise<string>((resolve) => {
                        fr.readAsDataURL(file)
                        fr.onload = () => resolve(fr.result as string);
                    }))
                }
                Promise.all(promiseS).then((data) => {
                    setUrl(data)
                    toast.success("图片读取成功", toastOptions)
                }).catch((e) => {
                    toast.error(e, toastOptions)
                }).finally(() => {
                    // console.log(formData.getAll("image[]"));
                })
            } else {
                toast.warning("最大图片不可以超过九张", toastOptions)
            }
        };
    }


    //提交数据
    const submit = () => {
        if (watch('text').trim()) {
            console.log();
            formData.set('text',watch('text'))
            sendFC(formData)
                .then(({data})=>{
                    toast.success(`${data.msg}`,toastOptions)
                    setUrl([]);
                    setValue('text',"")
                })
                .catch((e)=>{
                    toast.error(`${e.msg}`,toastOptions)
                })
        } else {
            toast.warning("文字内容不能为空", toastOptions)
        }
    }
    return (
        <div className={clsx("publishFC", className)}>
            <form action="">
                <textarea
                    {...register("text", { required: true,validate:{
                        1:v=>v.length <191 || '文字超过最大长度'
                    } })}
                    placeholder="有什么和大家分享的?"
                    rows={4}
                ></textarea>
                <input type="file" multiple ref={pushImgRef} style={{ display: "none" }} />
                <ul className="preview">
                    {
                        urls.map((item,index) => (
                            <li key={index} >
                                <img src={item} alt="" title="预览图" />
                            </li>
                        ))
                    }
                </ul>
                <ul className="control">
                    <li 
                        ref={emojiIcon}
                        className={clsx("iconfont icon-biaoqing1",showEmoji ? 'check' : '')}
                        onClick={() => setShowEmoji(!showEmoji)}
                    ></li>
                    <li className="iconfont icon-tupian" onClick={handlePush}></li>
                    <li className="iconfont icon-fasong" onClick={submit}></li>
                    {
                        showEmoji && <div className="emojiList" ref={emojiListRef}>
                            {
                                emoList.map((item,index) => (
                                    <p key={index} 
                                        onClick={() => { setValue('text', watch('text') + item) }}
                                    >{item}</p>
                                ))
                            }
                        </div>
                    }
                </ul>
            </form >
            <ToastContainer />
        </div >
    )
}
export default PublishCOF