import "./SwitchTypeCOF.less"
import { baseUrl } from "@/baseConfig"
interface switchTypeCOFProp{
    otherId:number,
    otherType:'IMG'|'VEDIO'|'OTHERFILE',
    otherValue:string|string[]
}
const SwitchTypeCOF:React.FC<switchTypeCOFProp> = ({
    otherId,otherType,otherValue
}) => {
  switch (otherType){
    case 'IMG':
        return(
            <div className="COF-IMG" key={otherId}>
                {
                    otherValue.length>1 ? <div className="imgS">
                        { (otherValue as string[]).map((item)=>(
                            <img src={baseUrl+item} key={item} />
                        )) }
                    </div> : <div className="singleImg">
                            <img src={baseUrl+otherValue} alt="" />
                    </div>
                }
            </div>
        )
    case 'VEDIO':
        return(
            <div className="COF-VEDIO">

            </div>
        )
    case 'OTHERFILE':
        return(
            <div className="COF-OTHERFILE">

            </div>
        )
  }
}
export default SwitchTypeCOF