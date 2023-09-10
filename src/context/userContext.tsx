import { createContext, useState, useEffect, ReactNode } from "react";
import { isLogin } from "../api/user";
import {type UserInfo, Gender } from "@/types/interface"

type UserInfoContextType = {
  userInfo: UserInfo | null;
  updateUserInfo: (newUserInfo: UserInfo | null) => void;
};

const UserInfoContext = createContext<UserInfoContextType|undefined>(undefined);
interface childrenProps {
  children: ReactNode
}

function UserInfoProvider({ children }: childrenProps) {
  const updateUserInfo = (newUserInfo:UserInfo|null) => {
    setUserInfo(newUserInfo);
  };
  // 在这里获取用户信息，这里使用useState和useEffect仅为示例
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null);

  useEffect(() => {
    isLogin().then(({ data }) => {
      setUserInfo(data.data as UserInfo)
    }).catch(() => {
      setUserInfo({ uid: NaN, username: "", avatar: "", gender: Gender.unknown })
    })
  }, []);

  return (
    <UserInfoContext.Provider value={{userInfo,updateUserInfo}}>
      {children}
    </UserInfoContext.Provider>
  );
}

export { UserInfoContext, UserInfoProvider };  export type { UserInfoContextType };

