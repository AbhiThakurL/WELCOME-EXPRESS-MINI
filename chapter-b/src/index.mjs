import express, { request, response } from "express";
import crypto from "crypto"
const app = express();

app.use(express.json())

const data = [
  {
    "id": 1,
    "name": "Wireless Bluetooth Headphones",
    "category": "Electronics",
    "price": 2499,
    "inStock": true,
    "rating": 4.6,
    "brand": "SoundMax",
    "description": "Over-ear noise-cancelling wireless headphones with 20 hours battery life."
  },
  {
    "id": 2,
    "name": "Cotton T-Shirt",
    "category": "Clothing",
    "price": 699,
    "inStock": true,
    "rating": 4.3,
    "brand": "UrbanWear",
    "description": "100% cotton t-shirt with breathable fabric and minimalist design."
  },
  {
    "id": 3,
    "name": "Smartwatch Series 6",
    "category": "Electronics",
    "price": 15999,
    "inStock": false,
    "rating": 4.7,
    "brand": "TechZone",
    "description": "Fitness tracking smartwatch with heart-rate monitor and sleep analysis."
  },
  {
    "id": 4,
    "name": "Office Chair Ergonomic",
    "category": "Furniture",
    "price": 8999,
    "inStock": true,
    "rating": 4.5,
    "brand": "ComfyHome",
    "description": "Ergonomic office chair with lumbar support and adjustable height."
  },
  {
    "id": 5,
    "name": "Gaming Laptop",
    "category": "Computers",
    "price": 74999,
    "inStock": true,
    "rating": 4.8,
    "brand": "XenonPro",
    "description": "High-performance laptop with RTX 4060 GPU and 16GB RAM."
  },
  {
    "id": 6,
    "name": "Ceramic Coffee Mug",
    "category": "Home & Kitchen",
    "price": 399,
    "inStock": true,
    "rating": 4.2,
    "brand": "DailyBrew",
    "description": "Classic 350ml ceramic mug, microwave and dishwasher safe."
  },
  {
    "id": 7,
    "name": "Leather Wallet",
    "category": "Accessories",
    "price": 1299,
    "inStock": true,
    "rating": 4.4,
    "brand": "CraftedEdge",
    "description": "Premium leather wallet with 6 card slots and coin pouch."
  },
  {
    "id": 8,
    "name": "Yoga Mat",
    "category": "Sports",
    "price": 999,
    "inStock": false,
    "rating": 4.1,
    "brand": "FitFlex",
    "description": "Non-slip yoga mat made from eco-friendly material."
  },
  {
    "id": 9,
    "name": "4K Smart TV 50 Inch",
    "category": "Electronics",
    "price": 42999,
    "inStock": true,
    "rating": 4.7,
    "brand": "VisionPlus",
    "description": "Ultra HD 4K Smart TV with built-in Netflix and YouTube support."
  },
  {
    "id": 10,
    "name": "Sneakers",
    "category": "Footwear",
    "price": 2999,
    "inStock": true,
    "rating": 4.5,
    "brand": "StrideX",
    "description": "Comfortable and stylish sneakers suitable for daily wear."
  }
]

const randomId = crypto.randomBytes(3).toString("hex"); 
const PORT = process.env.PORT || 3000;

app.get("/",(request,response)=>{

  return response.status(200).json(
    data
  )

})

app.get("/:id",(request,response)=>{

  const id = parseInt(request.params.id)

  const FindId = data.find((xid)=>xid.id === id )

  return response.status(200).json({
    FindId
  })

})


app.post("/store",(request,response)=>{

  const { body } = request ;
  const NewStoreData = {id:randomId , ...body}
  data.push(NewStoreData)
  console.log(NewStoreData)

  return response.status(201).json({
    message:"Done",
  })
})


app.put("/store/:update",(request,response)=>{

  const {body,params:{update}} = request
  const CurrentUpdateId = parseInt(update)
  const updateData = data.findIndex((idx)=>idx.id===CurrentUpdateId)

  if(updateData === -1) return response.status(400).send({message:"Not Found Route "})
  
  data[updateData] = {
    id:randomId,
    ...body
  }

  return response.status(200).json({
    message:"Update Success Data ."
  })

})


app.patch("/store/:update",(request,response)=>{

  const {body,params:{update}} = request;
  const currentId = parseInt(update)

  if(isNaN(currentId)) return response.status(404).json({message:"Not Found Data"})

  const FindByData = data.findIndex((idx)=>idx.id === currentId)

  if(FindByData === -1) return response.status(404).json({message:"Not Found Data"})

  data[currentId] = {
    ...data[FindByData],...body
  }
  return response.status(200).json({
    message:"Store Data Update ..."
  })
})


app.listen(PORT, () => {
  console.log(`Running Server ${PORT}`);
});
