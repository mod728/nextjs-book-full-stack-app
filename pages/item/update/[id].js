import { useState } from "react"
import Head from "next/head"
import useAuth from "../../../utils/useAuth" 

const UpdateItem = (props) => {
    const [title, setTitle] = useState(props.singleItem.title)   
    const [price, setPrice] = useState(props.singleItem.price)  
    const [image, setImage] = useState(props.singleItem.image)  
    const [description, setDescription] = useState(props.singleItem.description)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/item/update/${props.singleItem._id}`, {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("アイテム編集失敗")
        }
    }

    const loginUser = useAuth()

    if(loginUser === props.singleItem.email){
        return (
            <div>
                <Head><title>アイテム編集</title></Head>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>編集</button>
                </form>
            </div>
        ) 
    }else{
        return <h1>権限がありません</h1>
    }
}

export default UpdateItem

export const getServerSideProps = async(context) => {
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`) 
    const singleItem = await response.json()

    return{
        props: singleItem
    }
}