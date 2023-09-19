import "./COFItem.less"
import React from "react"
import SwitchTypeCOF from "../SwitchTypeCOF/SwitchTypeCOF"
import { COFDataType } from "@/types/cof"
import { baseUrl } from "@/baseConfig"
interface COFItemProp{
    data:COFDataType
}
const COFItem:React.FC<COFItemProp> = ({data}) => {
  return (
    <div className="cofItem">
        <div className="user">
            <img src={baseUrl+data.userInfo.avatar} />
        </div>
        <div className="content-main">
            <h2>{data.userInfo.username}</h2>
            <p>
                {data.text}
            </p>
            <SwitchTypeCOF 
                otherId={data.other.otherId}
                otherType={data.other.otherType}
                otherValue={data.other.otherValue}
            />
        </div>
    </div>
  )
}
export default COFItem