import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from './pages/RootLayout';

// import AddPost from "./pages/AddPost";
// import EditPost from "./pages/EditPost";
// import DetailsPost from "./pages/DetailsPost";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
// import WithGuard from "./components/WithGuard";

const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const DetailsPost = React.lazy(() => import("./pages/DetailsPost"));



const postParamHandler = ({params}) =>{
  if (isNaN(params.id)){
    throw new Response("Bad Request",
    {statusText:"please make sure to insert correct post ID "
    , status: 400});
  }
}

const router = createBrowserRouter ([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,

    children:[
      {index: true , element: <Index/> },
      {path:"post" ,element: <Index/> },

      {path :"post/add" , element:
        <Suspense fallback="Loading please wait...">
          <AddPost/>
        </Suspense>  },
      {
      path :"post/:id/edit" ,
      element:
      <Suspense fallback="Loading please wait...">
      <EditPost/>
    </Suspense>,
      loader: postParamHandler,
      },
      {
      path: "post/:id" ,
      element:
      <Suspense fallback="Loading please wait...">
      <DetailsPost/>
    </Suspense>,
      loader: postParamHandler,
        
      }
    
    ]
  }

])



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>

    <RouterProvider router={router} />

  </Provider>
);
