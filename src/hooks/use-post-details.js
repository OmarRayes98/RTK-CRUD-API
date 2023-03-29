import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../store/postSlice"; 


const usePostDetails= () => {

    const dispatch = useDispatch();
    const {id} = useParams();


    const { recordDetails, loading, error} = useSelector((state) => state.posts);

    useEffect(()=>{
        dispatch(getPost(id));
    
    },[dispatch , id]);


return {loading, error , recordDetails};
}

export default usePostDetails;
