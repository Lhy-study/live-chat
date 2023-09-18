import "./AddFriendForm.less"
import React, { memo, useCallback, useState } from "react"
import UserLIst from "../UserList/UserList"
import { findUser } from "@/api/user"
import { sendFriReq } from "@/api/friend"
import { UserInfo } from "@/types/interface"
import { baseUrl } from "@/baseConfig"
import { toast, ToastContainer } from "react-toastify"
import Mask from "@/components/Mask/Mask"
import PubSub from "pubsub-js"
const AddFriendForm = memo(() => {
    const [show, setShow] = useState(false)
    const subscribe = (_: string, data: boolean) => {
        setShow(data);
    }
    PubSub.subscribe("openDialog", subscribe)
    const [userList, setUserList] = useState<UserInfo[]>([]);
    const [isSearch, setIsSearch] = useState(false);
    const handleSetList = useCallback((data: UserInfo[]) => {
        setUserList(data)
    }, [])
    const handleEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsSearch(true);
            // console.log(e.currentTarget.value);
            findUser(e.currentTarget.value)
                .then(({ data }) => {
                    handleSetList(data.data)
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }, [handleSetList])
    //发起请求
    const handleSubmit = useCallback((targetId: number) => {
        sendFriReq(targetId)
            .then(() => {
                toast.success("发送好友请求成功", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
            .catch((e) => {
                // console.log(e);
                toast.error(`${e.msg}`, {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }, [])
    return (
        <>
            {
                show && <Mask callback={() => setShow(false)}>
                    <div className="addFriendForm">
                        <div className="title">
                            <h1>添加用户<span>(完整名字)</span></h1>
                        </div>
                        <div className="search">
                            <label htmlFor="username">搜索用户:</label>
                            <input type="text" name="username" autoComplete="off" placeholder="username" onKeyDown={handleEnter} />
                        </div>
                        <div className="result-user">
                            {
                                (userList.length && isSearch) ?
                                    userList.map((item) => <UserLIst imgUrl={baseUrl + item.avatar} name={item.username} id={item.uid} key={item.uid} />) : ""
                            }
                            {
                                (userList.length && isSearch) ?
                                    <button onClick={() => handleSubmit(userList[0].uid)}>添加</button> : ""
                            }
                            {
                                (isSearch && userList.length === 0) ? <div className="emptyList">
                                    找不到该用户
                                </div> : ""
                            }
                        </div>

                        <ToastContainer
                            position='top-center'
                            theme="colored"
                            autoClose={3000}
                        />
                    </div>
                </Mask>
            }
        </>
    )
})
export default AddFriendForm