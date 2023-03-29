import PostList from '../components/PostList';
import { useDispatch ,useSelector } from 'react-redux';
import {fetchPosts,deletePost} from '../store/postSlice';

import { useCallback, useEffect } from 'react';
import Loading from '../components/Loading';

const Index = () => {
  const dispatch = useDispatch();

  const {loading,error } = useSelector((state) => state.posts);
  
  useEffect(()=>{
    dispatch(fetchPosts());
  },[dispatch]);

  const deleteRecord = useCallback(
    (id)=>dispatch(deletePost(id)),
    [dispatch]);
  
  
  return (

    <Loading loading={loading} error={error}>
    <PostList deleteRecord={deleteRecord}/>
    </Loading>

  )
}

export default Index;
