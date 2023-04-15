import { useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { LoggedToggle } from '../store/authSlice';



const Header = () => {

  const dispatch = useDispatch();

  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <li>
          <NavLink to="/" end >Home</NavLink>
        </li>
        <li>
          <NavLink to="post/add">Add Post</NavLink>
        </li>
        <li style={{cursor:"pointer"}} className="login" onClick={()=>dispatch(LoggedToggle())}>login</li>
      </ul>
    </div>
  );
};

export default Header;
