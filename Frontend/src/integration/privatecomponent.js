import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
const Privatecomponent = () => {
    let authtoken=localStorage.getItem("token")
  return authtoken?<Outlet/>:<Navigate to="login"/>
}
export default Privatecomponent