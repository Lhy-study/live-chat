import "./ShowImg.less"
import { subscribe } from "pubsub-js"
import Mask from "../Mask/Mask"
import { useState, useCallback } from "react"

const ShowImg = () => {
    const [show, setShow] = useState(false)
    const [imgURL, setImgURL] = useState<Array<string>>([])
    const [current, setCurrent] = useState(0)
    const Subscribe = useCallback((_:string, data: string[]) => {
        setImgURL(data)
    }, [])
    const openDialog = useCallback((_:string, value: boolean) => {
        setShow(value)
    }, [])
    subscribe("showImg", Subscribe);
    subscribe("open", openDialog)
    return (
        <>
            {
                show && <Mask callback={() => setShow(false)}>
                    <div className="ShowImg">
                        <img src={imgURL[current]} alt="" />
                        <div className="button">
                            <button disabled={current===0} onClick={()=>setCurrent(current-1)
                            }>
                                <span className="iconfont icon-zuo" ></span>
                            </button>
                            <button disabled={current === imgURL.length-1} onClick={()=>setCurrent(current+1)
                            }>
                                <span className="iconfont icon-you-yuan"></span>
                            </button>
                        </div>
                    </div>
                </Mask>
            }
        </>
    )
}
export default ShowImg