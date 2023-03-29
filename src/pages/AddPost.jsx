import {insertPost} from '../store/postSlice'

import { useDispatch ,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik  } from 'formik';
import { postSchema } from '../util/validationSchema';
import WithGuard from '../util/WithGuard';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from '../components/Loading';


const AddPost = () => {

  const {loading,error } = useSelector((state) => state.posts);


  const navigate = useNavigate();

  const dispatch = useDispatch();


/*
const formHandler = (e)=> {
  e.preventDefault();
  const id = Math.floor(Math.random() * 500);

  dispatch(insertPost({id,title,description}))
  .unwrap()
  .then(()=>{
    navigate("/",{replace:true});
  })
  .catch(error =>{
    console.log(error);
  })
*/

const formik = useFormik({
  initialValues: {
    title: "",
    description:"",
  },
  validationSchema: postSchema,
  validateOnChange: false, // validate just after submit
  validateOnBlur: false 
  ,
  onSubmit: (values) =>{
    const id = Math.floor(Math.random() * 500);

    dispatch(insertPost({id,title:values.title,description: values.description}))
    .unwrap()
    .then(()=>{
      navigate("/",{replace:true});
    })
    .catch(error =>{
      console.log(error);
    })  },
});

return (
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
      </Form.Control.Feedback>
    </Form.Group>

    <Loading loading={loading} error={error}>
    <Button variant="primary" type="submit">Submit</Button>
    </Loading>
  </Form>
)

}






export default WithGuard(AddPost);
