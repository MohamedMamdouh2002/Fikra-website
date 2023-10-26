import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup'
import Notes from '../Notes/Notes';
import {Helmet} from "react-helmet";

import { useNavigate } from 'react-router-dom';
export default function Home() {
  
 const nav=useNavigate()
  const [notes,setNotes]=useState([])
  async function addNote(values){
  try{

      let {data}=await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values,
      {
        headers:{
          token:`3b8ny__${localStorage.getItem('Token')}`
        }
      }
      )
      console.log(values);
      console.log(data);
      getAllNotes()
    }
    catch(error){
      toast(`❌ ${error.response.data.msg}`)
      console.log(error);

    }
  }
  async function getAllNotes(){
    try{

      let {data}= await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
        
        headers:{
          token:`3b8ny__${localStorage.getItem('Token')}`
        }
        
      })
      setNotes(data.notes)
      // console.log(data.notes);
      // console.log("aa",notes);
      }
    catch(err){
      if (err.response.data.msg != "not notes found") {
        toast(`❌ ${err.response.data.msg}`)
       
      }else{
        setNotes([])
      }
      // console.log(error);

    }
  }
  async function deleteItem(id){
      let {data}=await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{
        
        headers:{
          token:`3b8ny__${localStorage.getItem('Token')}`
        }
      })
      // .catch((err)=>toast(`❌ ${err.response.data.msg}`))
      getAllNotes()
      console.log(data);
    }
const validation=yup.object({
  title:yup.string().required("Title is required")
     .min(3,'min length is 3')
  .max(30,'max length is 30'),
  content:yup.string().required("Content is required"),
})

  let formik=useFormik({
    initialValues:{
      title:'',
      content:''
    },
    validationSchema:validation,
    onSubmit:addNote
   })
   useEffect(()=>{getAllNotes()},[])
  return   <>
  <Helmet>
    <meta charSet="utf-8" />
    <title>Fikra </title>
    <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
    <div className="container-fluid mainColor">
      {localStorage.getItem('Token')?
      
      <div onClick={()=>{
        
        localStorage.removeItem("Token")
        nav('/login')
      }}
      className='point position-fixed text-white top-0 end-0 p-2 bg-danger m-2 rounded-2'>Logout</div>:""
    }
      <Toaster/>
      <div className="row gap-5  d-flex justify-content-center">
        <div className="col-md-4   mt-3  " >
            <form onSubmit={formik.handleSubmit} >
          <div className=" d-flex flex-column gap-2">

            <input type="text" 
            className=' form-control form-control-lg'
             placeholder='Title'
             name='title'
             onBlur={formik.handleBlur}
             onChange={formik.handleChange}
             value={formik.values.title}
             />
             {formik.errors.title&&formik.touched.title?<p className=' text-white '>{formik.errors.title} *</p> 
            :""
            }
            <textarea name="content" id=""
              onBlur={formik.handleBlur}
              placeholder='Content'
              onChange={formik.handleChange}
            className='form-control textarea'>
              
            </textarea>
            {formik.errors.content&&formik.touched.content?
            <p className='text-white'>{formik.errors.content} *</p> 
            :""
            }
          </div>
            <div className=" mt-3 d-flex justify-content-end">
                <button  type='submit' className='px-5 rounded-2 py-2 border-0 bg-dark text-white'>
                    Add Notes    
                  </button>            
            </div>
            </form>
        </div>
        <div className="col-md-5 mb-3">
          <div className=" d-flex justify-content-center mt-3">
            <div className="row container">
             {notes.length>0?
             notes.map((note)=><Notes key={note._id} note={note}  deleteItem={deleteItem} getAllNotes={getAllNotes}/>)
             
             
             
             
             :""}

            </div>
          </div>
        </div>
      </div>
    </div>
 </> 
}
