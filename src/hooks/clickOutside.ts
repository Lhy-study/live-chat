import { useEffect, RefObject } from "react"

//excludeRef 不包括的
function useOutsideClick(ref: RefObject<HTMLElement>, callback: () => void, excludeRef: RefObject<HTMLElement>) {
    useEffect(() => {
        function handleClickOutside(e: Event) {
            // console.log(e.target);

            if (ref.current &&
                !ref.current.contains(e.target as Node) && 
                e.target !== excludeRef.current &&
                !excludeRef.current?.contains(e.target as Node)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, callback, excludeRef])
}

export default useOutsideClick