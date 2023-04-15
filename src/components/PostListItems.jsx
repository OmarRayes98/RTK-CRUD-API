import {
    Button,
    ButtonGroup,
} from "react-bootstrap";
import { Link , useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';



const PostListItems = ({deleteRecord}) => {

    const navigate = useNavigate();

    const {records} = useSelector((state) => state.posts);
    const {isLoggedIn} = useSelector((state) => state.auth);

    const deleteHandler = (item) =>{

        if(window.confirm(`Do you realy want to delete record: ${item.title}?`)){
            deleteRecord(item.id);
        }
    }

    const record = records.map((item, index) =>(
        <tr key={item.id}>
        <td>#{++index}</td>
        <td><Link to={`/post/${item.id}`}>{item.title}</Link></td>
        <td>
        <ButtonGroup className="p-1 " aria-label="Basic example">
            <Button variant="success" disabled={!isLoggedIn}  onClick={() => (navigate(`post/${item.id}/edit`))}>Edit</Button>
            
            <Button
            variant="danger"
            onClick={()=>deleteHandler(item)}
            disabled={!isLoggedIn}
            >Delete
            </Button>
            
        </ButtonGroup>
        </td>
    </tr>
    
    ));


return (

    <>
    {record}
    </>

)
}

export default PostListItems
