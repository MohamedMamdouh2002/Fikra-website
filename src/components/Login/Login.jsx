import React from 'react'
import { useFormik } from 'formik'
import login from '../../Assets/login.png'
import axios from 'axios'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";


 
export default function Login() {
  let nav=useNavigate()
 async function handleSubmit(values){
  

      let {data}=await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values).catch((err)=>
      toast(`❌ ${err.response.data.msg}`))
      console.log(data);
      if(data.msg=='done'){
      localStorage.setItem('Token',data.token)
        nav('/')
      }
      // console.log(values);
    
   
  }

  const validation =yup.object({
    email:yup.string().email("Email is not valid").required('Email is required'),

    password:yup.string().matches(/^[A-Z][a-z0-9]{5,25}/,"password is not Valid").required("password is required"),  })
 const formik= useFormik({
initialValues:{
  email:"",
  password:""

},
validationSchema:validation,
onSubmit:handleSubmit
 })
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <Toaster/>
  <div className="register container-fluid d-flex  justify-content-center align-items-center " >
  <div className="d-flex justify-content-center align-items-center ">
      <div className="row   w-100 regLeft  rounded-end-4  ">
        
          <div className="col-md-5 p-3 regLeft  ">
            <div className="  ">
            <h4 className=' fw-bold text-white text-center'>Welcome to Fikra website</h4>
            <img src={login} className='w-100 registerlogo bg-white' alt="" />
              <div className="d-flex gap-2 justify-content-center align-items-center">
                <p className='mt-3 logp text-white'>If you don't have an account</p>
                <Link to='/register'>
                <button className='btn px-3 btn-light'>Sign up</button>
                </Link>
              </div>

            </div>

          </div>
          <div className="col-md-7   regRight rounded-4">
            <div className="p-4 mt-5">
              <h4>Login Now</h4>
              <form onSubmit={formik.handleSubmit}>
              
                  <div className="">

                   <label htmlFor="email">Email</label>
                  <input type="email" 
                  id='email'
                  className='form-control'
                  name='email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  /> 
                    {formik.errors.email&&formik.touched.email?<small className=' text-danger'>
                    {formik.errors.email}
                  </small>:""}
                  </div>
                  <div className="">

                  <label htmlFor="password">Password</label>
                  <input type="text" 
                  id='password'
                  name='password'
                  className='form-control'
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  />
                    {formik.errors.password&&formik.touched.password?<small className=' text-danger'>
                    {formik.errors.password}
                  </small>:""}
                  </div>
                  <div className="d-flex justify-content-center">
                    
                  <button type='submit' className='registerBtn w-50 mt-2 '>Login</button>
                  </div>
              </form>
              </div>
          </div>
      </div>
    </div>
  </div>
  
  
  </>
}
