import clsx from "clsx"
import "./SwitchChatType.less"
import { chat_info_type, type ChatMsgContent } from "@/types/interface"
import { baseUrl } from "@/baseConfig"
import CustomIcon from "../IconFont/CustomIcon"
import { saveAs } from "file-saver"
function getFileName(url:string){
    const ext= url.replace("/public/file/","").split(".")[1]
    return `${ext}文件`
}

function getExt(url:string){
    return url.replace("/public/file/","").split(".")[1]
}

//下载文件
function domnload(url:string){
    const fileUrl=baseUrl+url;
    saveAs(fileUrl)
}

function getIcon(ext:string){
    switch(ext){
        case 'zip':
        case 'rar':
            return 'icon-yasuobao'

        case 'xlsx':
        case 'xls':
        case 'csv':
        case 'xlsb':
            return 'icon-excel-'

        case 'docx':
        case 'doc':
            return 'icon-WORD'

        case 'pdf':
        case 'pdfa':
        case 'pdfx':
        case 'pdfe':
            return 'icon-pdf'    
        
        case 'ppot':
        case 'ppt':
        case 'ppsx':
        case 'odp':
            return 'icon-ppt'
        
        default :
            return 'icon-wenjian'
    }
}

interface SwitchChatTypeProp extends ChatMsgContent {
    username: string
    isMe: boolean,
}
const SwitchChatType: React.FC<SwitchChatTypeProp> = ({
    content, contentType, username, isMe,
}) => {

    switch (contentType.toString()) {

        case chat_info_type[0]:
            return (
                <div className="TEXT">
                    <p className={clsx(isMe ? 'hidden' : '')}>{username}</p>
                    <div className={clsx('content', isMe ? 'isMe' : 'normal')}>
                        {content}
                    </div>
                </div>
            )
            break;
        case chat_info_type[1]:
            return (
                <div className="IMG">
                    <p className={clsx(isMe ? 'hidden' : '')}>{username}</p>
                    <div className="content">
                        <img src={baseUrl+content} alt="" />
                    </div>
                </div>
            )
        default:
            return (
                <div className="FILE" onClick={()=>domnload(content)}>
                    <p className={clsx(isMe ? 'hidden' : '')}>{username}</p>
                    <div className={clsx('content', isMe ? 'isMe' : 'normal')}>
                        <div className="fileInfo">
                            {getFileName(content)}
                        </div>
                        <div className="icon">
                            <CustomIcon name={getIcon(getExt(content))}/>
                        </div>
                    </div>
                </div>
            )
            break;
    }
}
export default SwitchChatType