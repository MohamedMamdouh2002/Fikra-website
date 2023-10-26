import React from "react";


import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import ProtectRouter from "./components/ProtectRouter/ProtectRouter";

const routers =createBrowserRouter([
    {path:"",element:<Layout/>,children:[
    {index:true,element:<ProtectRouter><Home/></ProtectRouter>
     },
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'*',element:<NotFound/>}
    ]}

]);

function App() {



  return <>  
  <RouterProvider router={routers}/>
</>
}

export default App;
