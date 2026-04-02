import { useSelector , useDispatch} from "react-redux"
import { logout } from "../Features/Auth/authSlice.js"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";


export default function Dashboard(){

  const categories = useSelector(state => state.categories)
  const products = useSelector(state => state.products)
  console.log("🔥 products", products.items.length);

  const dispatch = useDispatch()    
  const navigate = useNavigate()

 const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  

  return (
<>


 <div className="dashboard-container">

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
          <h2>{products.items.length}</h2>
        </div>
      </div>
    </div>

</>




  )
}