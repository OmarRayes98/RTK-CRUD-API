import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePostDetails from "../hooks/use-post-details";
import WithGuard from '../util/WithGuard';

import { useFormik } from 'formik';
import { postSchema } from '../util/validationSchema';

import { useDispatch } from "react-redux";
import { cleanRecord, editPost } from "../store/postSlice";

import Loading from "../components/Loading";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


/*
record before pending -> old data 
record true / title false / desc false 
title & desc -> old data


//record peding null 
record false / title true / desc true 

record full filled 
record true / title true / desc true 

*/

const EditPost = () => {

  const navigate =useNavigate();

  const dispatch = useDispatch();

  const {loading  ,error , recordDetails} = usePostDetails();


  // console.log(recordDetails?.title);
  // useEffect(()=>{
  //   if(recordDetails){
  //     setTitle(recordDetails?.title);
  //     setDescription(recordDetails?.description);
  //   }
  // },[recordDetails]);

  useEffect(()=>{
  return() =>{
      // dispatch({type:"posts/cleanRecord"})
  //OR
    dispatch(cleanRecord());
  }
  },[dispatch]);

  

  // const formHandler = (e)=>{
  //   e.preventDefault();
  //   dispatch(editPost({id: recordDetails.id, title, description}))
  //   .unwrap()
  //   .then(() => navigate("/"));

  // }

  const formik = useFormik({
    initialValues: {
      title: recordDetails? recordDetails?.title : "",
      description: recordDetails? recordDetails?.description : "",
    },
    validationSchema: postSchema
    ,
    enableReinitialize: true,
    onSubmit: (values) =>{
      dispatch(editPost({id: recordDetails.id, title: values.title, description: values.description}))
      .unwrap()
      .then(() => navigate("/"));
    },
  });
  

  return (
    <Loading loading={loading} error= {error}>
      <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control name='title' type="text"
      value={formik.values.title} 
      onChange={formik.handleChange} 
      isInvalid={!!formik.errors.title} 
      />
      
      <Form.Control.Feedback type='invalid'>
        {formik.errors.title}
      </Form.Control.Feedback>

      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control name='description' as="textarea"
      value={formik.values.description} onChange={formik.handleChange}
        rows={3} isInvalid={!!formik.errors.description}
      />
      
      <Form.Control.Feedback type='invalid'>
        {formik.errors.description}
      </Form.Control.Feedback>      </Form.Group>

      <Loading loading={loading} error={error}>
      <Button variant="primary" type="submit">Submit</Button>
      </Loading>
    </Form>

    </Loading>
  )
}

export default WithGuard(EditPost);
