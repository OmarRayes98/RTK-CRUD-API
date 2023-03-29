import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    records:[],
    recordDetails:null,
    loading:false,
    error :null
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async(_,thunkAPI) =>{

    const { rejectedWithValue} = thunkAPI;

    try{
        const res = await fetch("https://employee-service-4h21.onrender.com/posts");
        const data= await res.json();

        return data;

    }catch(error){

        return rejectedWithValue(error.message);

    }


});


export const getPost = createAsyncThunk("posts/fetchPost",
async(id, thunkAPI) => {
    const {rejectedWithValue} = thunkAPI;
    try{

        const res =await fetch(`https://employee-service-4h21.onrender.com/posts/${id}`);
        const data = res.json();

        return data;

    }catch(error){
        return rejectedWithValue(error.message);
    }

}

);


export const deletePost = createAsyncThunk("posts/deletePost",async(id,thunkAPI)=>{

    const { rejectedWithValue} = thunkAPI;

    try{

        await fetch(`https://employee-service-4h21.onrender.com/posts/${id}`,{
            method:"DELETE",
        });

        return id;

    }
    catch(error){
        return rejectedWithValue(error.message);
    }

    });

export const insertPost = createAsyncThunk("posts/insertPost",async(item,thunkAPI)=>{
        
        const { rejectedWithValue, getState} = thunkAPI;

        const {auth} = getState();
        //add property to object 
        item.userId = auth.id;

        try{
    
            const res = await fetch(`https://employee-service-4h21.onrender.com/posts`,{
                method:"POST",
                body: JSON.stringify(item),
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                }
            });

            const data = await res.json();

            return data;
        
        }
        catch(error){
            return rejectedWithValue(error.message);
        }
    
        });

export const editPost = createAsyncThunk("posts/editPost",async(item,thunkAPI)=>{
        
    const { rejectedWithValue} = thunkAPI;

    try{

        const res = await fetch(`https://employee-service-4h21.onrender.com/posts/${item.id}`,{
            method:"PATCH",
            body: JSON.stringify(item),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        });

        const data = await res.json();

        return data;
    
    }
    catch(error){
        return rejectedWithValue(error.message);
    }

    });



const postSlice = createSlice({
    name: "posts",
    initialState ,
    reducers: {
        cleanRecord : (state) => {
            
            state.recordDetails = null;
        }
    },
    extraReducers: {
        [fetchPosts.pending] : (state) =>{
            state.loading =true;
            state.error = null;

        },

        [fetchPosts.fulfilled] : (state,action) =>{
            state.loading =false;

            state.records = action.payload;


        },

        [fetchPosts.rejected] : (state,action) =>{
            state.loading =false;
            state.error = action.payload;

        },

        //delete Post
        [deletePost.pending] : (state) =>{
            state.loading =true;
            state.error = null;

        },

        [deletePost.fulfilled] : (state,action) =>{
            state.loading =false;

            state.records = state.records.filter((item)=> item.id !== action.payload);

        },

        [deletePost.rejected] : (state,action) =>{
            state.loading =false;
            state.error = action.payload;

        },
        //create Post

        [insertPost.pending] : (state) =>{
            state.loading =true;
            state.error = null;

        },

        [insertPost.fulfilled] : (state,action) =>{
            state.loading =false;

            state.records.push(action.payload);

        },

        [insertPost.rejected] : (state,action) =>{
            state.loading =false;
            state.error = action.payload;

        },

        //getPost (details)
        [getPost.pending] : (state) =>{
            state.loading =true;
        },

        [getPost.fulfilled] : (state,action) =>{
            state.loading =false;
            state.recordDetails = action.payload;
        },

        [getPost.rejected] : (state,action) =>{
            state.loading =false;
            state.recordDetails = null;
            state.error = action.payload;

        },

        //edit Post
        [editPost.pending] : (state) =>{
            state.loading =true;
            state.error = null;

        },

        [editPost.fulfilled] : (state,action) =>{
            state.loading =false;

            state.recordDetails = action.payload;

        },

        [editPost.rejected] : (state,action) =>{
            state.loading =false;
            state.error = action.payload;

        },


    }

    /*
    exraRducer: (builder)=>{
        builder.addCase(fetchPost.pending, (state,action)=>{

        });

        builder.addCase(fetchPost.fullfilled, (state,action)=>{

        });

    }
    */

});

export const { cleanRecord } = postSlice.actions;

export default postSlice.reducer;
