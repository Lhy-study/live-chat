import "./empty.less";
import { memo } from "react"
const EmptyState = memo(() => {
  return (
    <div className="empty">
        <div>
            <h3>
                Select a chat or start a new conversation
            </h3>
        </div>
    </div>
  )
})
export default EmptyState