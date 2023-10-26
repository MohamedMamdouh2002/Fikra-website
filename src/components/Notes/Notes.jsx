import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup'

export default function Notes({note,deleteItem,getAllNotes}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function handleEdit(values ){
let {data}=await axios.put(` https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,values,{

      headers:{
        token:`3b8ny__${localStorage.getItem('Token')}`
      }
      
    }).catch((err)=>console.log(err))
console.log(data);
getAllNotes()

  }

  const validationSchema=yup.object({
    title:yup.string().required("Title is required")
       .min(3,'min length is 3')
    .max(30,'max length is 30'),
    content:yup.string().required("Content is required"),
  })
  // console.log("note",note);
  let formik=useFormik({
    initialValues:{
      title:note.title,
      content:note.content

    },
    validationSchema,
    onSubmit:handleEdit,

  })
  return <>
    <div className="note  col-md-12 mb-3 text-dark d-flex ">
    <div className="">
      <h4 className='mb-4'>{note.title}</h4>
    
      <p className='content'>{note.content}</p>
      <div className=" d-flex  align-items-center gap-3">

      <i onClick={()=>deleteItem(note._id)} className=' fs-5 Color1 fas point   fa-trash-alt'></i>
     <div  onClick={handleShow} className='px-4 mainColor1 text-white point rounded-2 py-2 '>
      <i  className='me-2 fas pen  fa-file-pen'></i>
      Update
      </div> 
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <input type="text"
            className='form-control my-2'
            name='title'
            defaultValue={note.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             />
            <textarea type="text"
            className='form-control my-2'
            name='content'
            defaultValue={note.content}

            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose()
            formik.handleSubmit()}}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  
  </div>
  </>
}
