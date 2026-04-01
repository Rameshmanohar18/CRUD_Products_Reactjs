import { useSelector , useDispatch} from "react-redux"
import { logout } from "../Features/Auth/authSlice.js"
import { useNavigate } from "react-router-dom"

export default function Dashboard(){

  const categories = useSelector(state => state.categories)
  const products = useSelector(state => state.products)

  const dispatch = useDispatch()    
  const navigate = useNavigate()

 const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  

  return (

    // <div className="dashboard-container">

    //   <h1 className="dashboard-title">Admin Dashboard</h1>
    //    <button
    //       onClick={handleLogout}
    //       style={{
    //         display:"flex",
    //         justifyContent:"space-between",
    //         alignItems:"center",  
    //         padding: "8px 16px",
    //         background: "red",
    //         color: "#fff",
    //         border: "none",
    //         cursor: "pointer",
    //         borderRadius: "6px"
    //       }}
    //     >
    //       Logout
    //     </button>

    //   <div className="dashboard-cards">

    //     <div className="stat-card category-card">
    //       <p>Total Categories</p>
    //       <h2>{categories.length}</h2>
    //     </div>

    //     <div className="stat-card product-card">
    //       <p>Total Products</p>
    //       <h2>{products.length}</h2>
    //     </div>

    //   </div>

    // </div>

 <div className="dashboard-container">

      {/* ✅ HEADER FIX */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1 className="display-flex align-items-center dashboard-title">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "12px 26px",
            background: "red",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            
          }}
        >
          Logout
        </button>
      </div>

      {/* 📊 CARDS */}
      <div className="dashboard-cards">

        <div className="stat-card category-card">
          <p>Total Categories</p>
          <h2>{categories.length}</h2>
        </div>

        <div className="stat-card product-card">
          <p>Total Products</p>
          <h2>{products.length}</h2>
        </div>

      </div>

    </div>

  )
}