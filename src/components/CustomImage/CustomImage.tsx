// import "./CustomImage.less"
import React, { memo ,useCallback,ReactEventHandler,useState} from "react"
import img from "@/assets/img/err.png";
interface imageProps {
    url: string
    width?: string
    height?: string,
    onClick?:()=>void
}
//这里单独为图片单独写一个组件是因为当发生防止路径错误或者其他可控的因素是，使用一张图片进行代替
const CustomImage: React.FC<imageProps> = memo(({
    url, width = '40px', height = '40px',onClick
}) => {
    const [imgUrl,setUrl]=useState(url);
    const err:ReactEventHandler<HTMLImageElement>=useCallback(()=>{
        setUrl(img);
    },[])
    return (
        <img 
            src={imgUrl} 
            style={{ width, height,objectFit:"cover",borderRadius:"50%",cursor:"pointer"}} 
            onError={err}
            onClick={onClick}
        />
    )
})
export default CustomImage