import React from 'react'
import { useFormik } from 'formik'
import registerlogo from '../../Assets/RegisterPhoto.png'
import axios from 'axios'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Register() {
  let nav=useNavigate()
 async function handleSubmit(values){
  

      let {data}=await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,values).catch((err)=>
      toast(`❌ ${err.response.data.msg}`))
      console.log(data);
      if(data.msg=='done'){
      toast( "✅ Registration completed successfully")
        nav('/login')
      }
      // console.log(values);
    
   
  }
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validation =yup.object({
    name:yup.string()
    .required("Name is required")
    .min(3,'min length is 3')
    .max(20,'max length is 20'),
    age:yup.number().required("Age is required").min(18,'you should at least 18 years old').max(60,'max age is 60 years'),
    email:yup.string().email("Email is not valid").required('Email is required'),
    phone:yup.string().matches(phoneRegExp,"Phone is not Valid").required("Phone is required"),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,25}/,"password is not Valid").required("password is required"),  })
 const formik= useFormik({
initialValues:{
  name:"",
  email:"",
  password:"",
  age:'',
  phone:""
},
validationSchema:validation,
onSubmit:handleSubmit
 })
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <Toaster/>
  <div className="register container-fluid d-flex  justify-content-center align-items-center " >
  <div className="d-flex justify-content-center align-items-center ">
      <div className="row w-100 regLeft  rounded-end-4  ">
        
          <div className="col-md-5 p-4 regLeft  ">
            <div className="  ">
            <h2 className=' fw-bold text-white text-center'>Welcome to Fikra website</h2>
            <img src={registerlogo} className='w-100 registerlogo' alt="" />
              <div className="d-flex gap-2 justify-content-center align-items-center">
                <p className='mt-3 text-white'>If you have an account</p>
                <Link to='/login'>
                <button className='btn px-3 btn-light'>Login</button>
                </Link>              </div>

            </div>

          </div>
          <div className="col-md-7  regRight rounded-4">
            <div className="p-4">
              <h4>Create Account</h4>
              <form onSubmit={formik.handleSubmit}>
                <div className="d-flex gap-3">
                  <div className="w-50">
                  <label htmlFor="name">Name</label>
                  <input type="text" 
                  id='name'
                  className='form-control'
                  name='name'
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  />
                  
                  {formik.errors.name&&formik.touched.name?<small className=' text-danger'>
                    {formik.errors.name}
                  </small>:""}
                  </div>
                  <div className="w-50">
                  <label htmlFor="name">Age</label>

                  <input type="number" 
                  id='age'
                  className='form-control'
                  
                  name='age'
                  value={formik.values.age}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  />
                    {formik.errors.age&&formik.touched.age?<small className=' text-danger'>
                    {formik.errors.age}
                  </small>:""}
                  </div>
                </div>
                <div className="">

                <label htmlFor="phone">Phone</label>
                  <input type="tel" 
                  id='phone'
                  className='form-control'
                  maxLength='11'
                  name='phone'
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  />
                    {formik.errors.phone&&formik.touched.phone?<small className=' text-danger'>
                    {formik.errors.phone}
                  </small>:""}
                  </div>
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
                    
                  <button type='submit' className='registerBtn w-50 mt-2 '>Sign up</button>
                  </div>
              </form>
              </div>
          </div>
      </div>
    </div>
  </div>
  
  
  </>
}
