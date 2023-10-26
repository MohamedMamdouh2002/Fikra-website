import React from 'react'
import { Offline, Online } from "react-detect-offline";
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return <>

<Outlet/>
    <Offline> <div className='network'>
      <i className='fas fa-wifi me-2' >
        </i>
        Only shown offline (surprise!)
      </div> 
      </Offline>
    </>
 
}
