import { cleanRecord } from "../store/postSlice";
import { useEffect } from "react";
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";

const DetailsPost = () => {

const dispatch = useDispatch();
  const {loading ,error, recordDetails} = usePostDetails();
  
  useEffect(()=>{
    return() =>{
        // dispatch({type:"posts/cleanRecord"})
    //OR
      dispatch(cleanRecord());
    }
    },[dispatch]);

    

  return (
    <div>
      <Loading loading={loading} error={error}>

      <p>Title: {recordDetails?.title}</p>
      <p>Description: {recordDetails?.description}</p>
      
      </Loading>

    </div>
  )
}

export default DetailsPost
