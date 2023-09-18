import "./UpdateForm.less"
import { updateInfo , updateAvatar, updatePassword} from "@/api/user"
import { subscribe , unsubscribe} from "pubsub-js"
import { type UserInfo, Gender } from "@/types/interface"
import Mask from "../Mask/Mask"
import { useState, useEffect, useContext, useRef, useCallback } from "react"
import { useForm } from "react-hook-form"
import clsx from "clsx"
import { toast, ToastContainer } from "react-toastify"
import { UserInfoContext, type UserInfoContextType } from "@/Context/userContext"

interface useFormProp {
    username: string,
    signature: string,
    gender: Gender
}

interface Password{
    password:string,
    newPsw1:string,
    newPsw2:string
}

const UpdateForm = () => {
    const [ formData , setFormData] = useState<FormData>(new FormData())
    const avatarRef = useRef<HTMLInputElement | null>(null)
    const [show, setShow] = useState(false)//是否显示
    const [userInfo, SetUserInfo] = useState<UserInfo>()
    const [gender, setGender] = useState<Gender | undefined>()
    const [ url , setURL ] = useState<string>()
    const { updateUserInfo } = useContext(UserInfoContext) as UserInfoContextType
    const subscribeOpen = (_: string, value: boolean) => {
        setShow(value) //打开遮罩层
    }
    const subscribeUser = (_: string, data: UserInfo) => {
        // console.log(data);
        SetUserInfo(data) //设置用户数据
    }
    //监听订阅
    useEffect(() => {
        subscribe("userOpen", subscribeOpen);
        subscribe("update", subscribeUser);
        formData.set("uid",`${userInfo?.uid}`)
        return () => {
            unsubscribe("userOpen");
            unsubscribe("update");
            formData.delete("uid")
        }
    }, [])
    const { register, setValue, handleSubmit } = useForm<useFormProp>({
        mode: "onChange"
    })

    const psw = useForm<Password>({
        mode:"all",
        reValidateMode: "onChange",
    })
    //每次打开或关闭都要重新设置useForm的值
    useEffect(() => {
        setValue("username", userInfo?.username as string)
        setValue("signature", userInfo?.signature as string)
        // console.log(userInfo);
        setGender(userInfo?.gender);
    }, [show])

    //提交修改的基本信息
    const submit = (data: useFormProp) => {
        data.gender = gender as Gender
        // console.log(data)
        updateInfo(userInfo?.uid as number, {
            username: data.username,
            gender: data.gender,
            signature: data.signature
        }).then(({ data }) => {
            toast.success("修改成功", { autoClose: 1500, position: toast.POSITION.TOP_CENTER }) ///这是异步任务
            setTimeout(() => {
                localStorage.setItem("live-chat", data.token)//
                updateUserInfo(data.data);
            }, 0)
        }).catch((e) => {
            toast.error(e, { autoClose: 1500 })
        })
    }

    //先添加预览图
    const handleUpload = useCallback(() => {
        avatarRef.current?.click();//先触发点击文件上传
        (avatarRef.current as HTMLInputElement).onchange = () => {
            if (avatarRef.current?.files?.length) {
                const file = avatarRef.current.files[0];
                if (file.size > 1024 * 1024 * 2) {
                    toast.warning("图片数据大小不可以超过2m", { autoClose: 1500, position: toast.POSITION.TOP_CENTER })
                    return;
                } else if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/webp") {
                    toast.error("图片格式不正确,请确保图片为jpg、png或webp格式", { autoClose: 1500, position: toast.POSITION.TOP_CENTER })
                    return;
                } else {
                    formData?.delete("avatar");
                    setFormData(formData)
                    const fr= new FileReader();
                    new Promise((resolve)=>{
                        fr.readAsDataURL(file);
                        fr.onload=()=>{
                            resolve(fr.result)
                        }
                    }).then((url)=>{
                        setURL(url as string)
                        formData.set("avatar",file)
                    })
                    // console.log(file);
                }
            }
        }
    }, [])

    //修改头像
    const submitUpload= useCallback(()=>{
        if(!formData.get("avatar")){
            toast.error("您还没有上传头像",{autoClose:1500,position:toast.POSITION.TOP_CENTER})
            return 
        }        
        // console.log(formData?.get("avatar"));
        formData?.set("uid",`${userInfo?.uid as number}`);
        // console.log(formData?.get("uid"));
        
        updateAvatar(formData!)
            .then(({data})=>{
                toast.success(`${data.msg}`,{autoClose:1500,position:toast.POSITION.TOP_CENTER})
                setTimeout(() => {
                    localStorage.setItem("live-chat", data.token)//
                    updateUserInfo(data.data);
                }, 0)
            }).catch((e)=>{
                toast.error(e, { autoClose: 1500 ,position:toast.POSITION.TOP_CENTER})
            }).finally(()=>{
                setTimeout(()=>{
                    setURL("")
                },0)
            })
    },[formData, updateUserInfo, userInfo?.uid])

    const handlePassword = ()=>{
        console.log(userInfo?.uid);
        const errors=psw.formState.errors;
        const msg=errors.password?.message,
              msg1=errors.newPsw1?.message,
              msg2=errors.newPsw2?.message  
        if(msg || msg1 || msg2){
            toast.error(`${msg||msg1||msg2}`,{autoClose:1500,position:toast.POSITION.TOP_CENTER})
            return 
        }
        if(psw.watch('newPsw1').length && psw.watch('password').length && psw.watch('newPsw2').length){
            updatePassword(userInfo?.uid as number,psw.watch('password'),psw.watch('newPsw1'))
                .then(()=>{
                    toast.success("密码修改成功",{autoClose:1500,position:toast.POSITION.TOP_CENTER})
                    setTimeout(()=>{
                        localStorage.removeItem("live-chat");
                        setShow(false);
                        location.reload();
                    },1000)
                })
                .catch((e)=>{
                    toast.error(`${e.msg}}`,{autoClose:1500,position:toast.POSITION.TOP_CENTER})
                })
            return
        }
        toast.error(`您还没有任何输入`,{autoClose:1500,position:toast.POSITION.TOP_CENTER})
    }
    return (
        <>
            {show && <Mask callback={() => setShow(false)}>
                <div className="updateForm">
                    <div className="topHeader">
                        <h1>我的基本信息</h1>
                        <span className="iconfont icon-guanbi" onClick={() => setShow(false)}></span>
                    </div>
                    <form onSubmit={handleSubmit(submit)} className="updateBase">
                        <h1>1、基本信息修改</h1>
                        <div className="username">
                            <span>昵称：</span>
                            <input
                                type="text"
                                {...register("username", {
                                    required: true,
                                    validate: {
                                        2: (v) => v.trim() !== "" || `用户名不可以空`,
                                        1: (v) => /^[\u4e00-\u9fa5a-zA-Z0-9]{1,7}$/.test(v) || '请符合中文或字母长度不超过8的用户名',
                                    }
                                })
                                }
                                autoComplete="off"
                            />
                            <span>注：请输入中文或字母长度不超过8的用户名</span>
                        </div>
                        <div className="signature">
                            <span>我的个性签名：</span>
                            <textarea
                                {...register("signature", {
                                    validate: { 1: (v) => v.trim().length < 30 || '长度不可以超过30' }
                                })}
                                rows={4}
                                placeholder="长度不可以超过30"
                            >
                            </textarea>
                        </div>
                        <div className="gender">
                            <span>性别：</span>
                            <ul>
                                <li
                                    className={clsx(gender === 'male' ? 'check' : '')}
                                    onClick={() => setGender('male')}
                                >
                                    男
                                </li>
                                <li
                                    className={clsx(gender === 'female' ? 'check' : '')}
                                    onClick={() => setGender('female')}
                                >
                                    女
                                </li>
                                <li
                                    className={clsx(gender === 'unknown' ? 'check' : '')}
                                    onClick={() => setGender('unknown')}
                                >
                                    保密
                                </li>
                            </ul>
                        </div>
                        <button type="submit">保存</button>
                    </form>
                    <div className="updateAvatar">
                        <h1>2、头像修改</h1>
                        <div>
                            { url && <img src={ url } alt="" title="头像预览图"/> }
                            <span onClick={handleUpload}>+</span>
                        </div>
                        <input type="file" name="avatar" ref={avatarRef} />
                        <button onClick={submitUpload}>确认上传该头像</button>
                    </div>
                    <form className="updatePassword">
                        <h1>3、修改密码</h1>
                        <div >
                            <span>旧密码：</span>
                            <input type="password" 
                                {...psw.register("password",{required:true,validate:{
                                    1:(v) => v.trim() !== "" || `密码不可以为空`,
                                    2:(v) => /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/.test(v) || '8到16位包含字母、数字的密码'
                                }})}
                                placeholder="请输入8到16位包含数字、英文的密码"
                            />
                        </div>
                        <div >
                            <span>新密码：</span>
                            <input type="password" 
                                {...psw.register("newPsw1",{validate:{
                                    1:(v) => v.trim() !== "" || `密码不可以为空`,
                                    2:(v) => /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/.test(v) || '8到16位包含字母、数字的密码',
                                    3:(v)=> psw.watch('password') !== v || '新密码与旧密码不可以一致' 
                                }})} 
                                placeholder="请输入8到16位包含数字、英文的密码"
                            />
                        </div>
                        <div >
                            <span>确认密码：</span>
                            <input type="password" 
                                {...psw.register("newPsw2",{validate:{
                                    1:(v) => v.trim() !== "" || `密码不可以为空`,
                                    2:(v) => /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/.test(v) || '8到16位包含字母、数字的密码',
                                    3:(v)=> psw.watch('newPsw1') === v || '两次输入的密码不一致' 
                                }})} 
                                placeholder="请输入8到16位包含数字、英文的密码"
                            />
                        </div>
                        <button type="button" onClick={handlePassword}>
                            提交修改
                        </button>
                    </form>
                </div>
                <ToastContainer />
            </Mask>}
        </>
    )
}
export default UpdateForm