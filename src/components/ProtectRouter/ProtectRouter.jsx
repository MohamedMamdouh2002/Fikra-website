import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectRouter({children}) {
 if(localStorage.getItem('Token')!=null){
   return children
   
}else{

  return<Navigate to={'/login'}/>
}
}
