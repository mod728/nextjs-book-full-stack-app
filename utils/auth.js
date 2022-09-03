import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const auth = (handler) => {
    return async(req, res) => {
        if(req.method === "GET"){
            return handler(req, res)
        }

        const token = "eyJhbGiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhIiwiaWF0IjoxNjYyMTkyODk0LCJleHAiOjE2NjIyNzU2OTR9.5GCyXiRLIQoJYQexr1jeFllI80SSyTB4HyYbngxcU0g"
        
        //await req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({message: "トークンがありません"})
        }

        try{
            const decoded = jwt.verify(token, secret_key)
            req.body.email = decoded.email
            return handler(req, res)
        }catch(err){
            return res.status(401).json({message: "トークンが正しくないので、ログインしてください"}) // 追加
        } 
    }
}

export default auth