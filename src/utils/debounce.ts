import { useEffect, useState } from "react"



export const useDebounce = (value: string) => {
    const [debounce, setDebounce] = useState<string>('')

    useEffect(() => {
        const handler = setTimeout(() => setDebounce(value), 300)
        return () => clearTimeout(handler)
    }, [value])
    return debounce
}