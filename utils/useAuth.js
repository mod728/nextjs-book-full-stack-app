import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const useAuth = () => {
    const [loginUser, setLoginUser] = useState("")

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        
        if(!token){
            router.push("/user/login") 
        }
    
        try{
            const decoded = jwt.verify(token, secret_key)
            setLoginUser(decoded.email)
        }catch(error){
            router.push("/user/login")
        }
    }, [router])

    return loginUser
}

export default useAuth