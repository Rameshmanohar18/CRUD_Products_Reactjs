import Dashboard from "./Components/Dashboard"
import CategoryForm from "./Components/CategoryForm"
import ProductForm from "./Components/ProductForm"
import ProductTable from "./Components/ProductTable"

import Login from "./Components/Login"
import Register from "./Components/Register"
import ProtectedRoute from "./Components/ProtectedRoute"

import {Routes, Route } from "react-router-dom"


export default function App(){

  return(
    

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Dashboard />
                <CategoryForm />
                <ProductForm />
                <ProductTable />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>
  )
}