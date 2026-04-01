
// import { useDispatch, useSelector } from "react-redux"
// import { addProduct } from "../Feautures/Products/ProductSlice.js"
// import { useState } from "react"

// export default function ProductForm(){

//   const categories = useSelector(state=>state.categories)
//   const dispatch = useDispatch()

//   const [form,setForm] = useState({
//     name:"",
//     price:"", 
//     stock:"",
//     categoryId:""
//   })




//   const handleSubmit = (e)=>{
//   e.preventDefault()

//   dispatch(addProduct({
//     ...form,
//     price: Number(form.price),
//     stock: Number(form.stock),
//     categoryId: Number(form.categoryId)
//   }))

//   setForm({
//     name:"",
//     price:"",
//     stock:"",
//     categoryId:""
//   })
// }

//   return(

//     <div className="form-container">

//       <form className="product-form" onSubmit={handleSubmit}>

//         <h2>Add Product</h2>
//  <select
//           value={form.categoryId}
//           onChange={(e)=>setForm({...form,categoryId:e.target.value})}
//         >
//           <option value="">Select Category</option>

//           {categories.map(cat=>(
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}

//         </select>
//         <input
//           value={form.name}
//           placeholder="Product Name"
//           onChange={(e)=>setForm({...form,name:e.target.value})}
//         />

//         <input
//           value={form.price}
//           placeholder="Price"
//           onChange={(e)=>setForm({...form,price:e.target.value})}
//         />

//         <input
//           value={form.stock}
//           placeholder="Stock Quantity"
//           onChange={(e)=>setForm({...form,stock:e.target.value})}
//         />

       

//         <button  className="btn btn-success" type="submit">
//           Add Product
//         </button>

//       </form>

//     </div>

//   )
// }



// import { useDispatch, useSelector } from "react-redux";
// import { addProduct } from "../Feautures/Products/ProductSlice";
// import { useState } from "react";

// export default function ProductForm() {

//   const dispatch = useDispatch();

//   // categories coming from backend
//   const categories = useSelector(state => state.categories);

//   // --------------------------
//   // FORM STATE
//   // --------------------------
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     category: ""
//   });

//   // --------------------------
//   // HANDLE CHANGE
//   // --------------------------
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   // --------------------------
//   // SUBMIT
//   // --------------------------
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // basic validation
//     if (!form.name || !form.price || !form.stock || !form.category) {
//       alert("Please fill all fields");
//       return;
//     }

//     dispatch(addProduct({
//       name: form.name,
//       price: Number(form.price),
//       stock: Number(form.stock),
//       category: form.category   // MongoDB ObjectId
//     }));

//     // reset form
//     setForm({
//       name: "",
//       price: "",
//       stock: "",
//       category: ""
//     });
//   };

//   // --------------------------
//   // UI
//   // --------------------------
//   return (
//     <div className="form-container">

//       <form className="product-form" onSubmit={handleSubmit}>

//         <h2>Add Product</h2>

//         {/* CATEGORY */}
//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//         >
//           <option value="">Select Category</option>

//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         {/* NAME */}
//         <input
//           name="name"
//           value={form.name}
//           placeholder="Product Name"
//           onChange={handleChange}
//         />

//         {/* PRICE */}
//         <input
//           type="number"
//           name="price"
//           value={form.price}
//           placeholder="Price"
//           onChange={handleChange}
//         />

//         {/* STOCK */}
//         <input
//           type="number"
//           name="stock"
//           value={form.stock}
//           placeholder="Stock Quantity"
//           onChange={handleChange}
//         />

//         <button className="btn btn-success" type="submit">
//           Add Product
//         </button>

//       </form>

//     </div>
//   );
// }



// import { useDispatch, useSelector } from "react-redux";
// import { addProduct } from "../Feautures/Products/ProductSlice.js";
// import { useState } from "react";

// export default function ProductForm() {

//   const categories = useSelector(state => state.categories);
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     categoryId: ""
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(addProduct({
//       name: form.name,
//       price: Number(form.price),
//       stock: Number(form.stock),
//       categoryId: Number(form.categoryId)
//     }));

//     setForm({
//       name: "",
//       price: "",
//       stock: "",
//       categoryId: ""
//     });
//   };

//   return (
//     <div className="form-container">
//       <form className="product-form" onSubmit={handleSubmit}>

//         <h2>Add Product</h2>

//         <select
//           value={form.categoryId}
//           onChange={(e) =>
//             setForm({ ...form, categoryId: e.target.value })
//           }
//         >
//           <option value="">Select Category</option>

//           {categories.map(cat => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <input
//           placeholder="Product Name"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//         />

//         <input
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) =>
//             setForm({ ...form, price: e.target.value })
//           }
//         />

//         <input
//           placeholder="Stock Quantity"
//           value={form.stock}
//           onChange={(e) =>
//             setForm({ ...form, stock: e.target.value })
//           }
//         />

//         <button className="btn btn-success" type="submit">
//           Add Product
//         </button>

//       </form>
//     </div>
//   );
// }




import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Features/Products/ProductSlice.js";
import { useState } from "react";

export default function ProductForm() {

  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addProduct({
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: form.categoryId
    }));

    setForm({
      name: "",
      price: "",
      stock: "",
      categoryId: ""
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>

        <h2>Add Product</h2>

        <select
          value={form.categoryId}
          onChange={(e) =>
            setForm({ ...form, categoryId: e.target.value })
          }
        >
          <option value="">Select Category</option>

          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e)=>setForm({...form,price:e.target.value})}
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e)=>setForm({...form,stock:e.target.value})}
        />

        <button type="submit">
          Add Product
        </button>

      </form>
    </div>
  );
}