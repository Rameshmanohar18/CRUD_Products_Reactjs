import { useDispatch } from "react-redux"
import { addCategory } from "../Features/Categories/CategorySlice.js"
import { useState } from "react"

export default function CategoryForm(){

  const [name,setName] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addCategory(name))
    setName("")
  }

  return(

    <div>
      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Category Name"
      />
      <button className="btn btn-success" onClick={handleSubmit}>
        Add Category
      </button>
    </div>
  )
}