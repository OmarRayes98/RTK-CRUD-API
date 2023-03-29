import {useRouteError, useNavigate} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
} from "react-bootstrap";


const ErrorPage = () => {
    const error = useRouteError();
    const navigate =useNavigate();


    return (
    <Container>
    <Row>
        <Col xs={{ span: 8, offset: 2 }}>
            <div className='mt-5 text-center'>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has ocuurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>

                <Button variant="link" onClick={()=>navigate("/", {replace:true})}>Back</Button>

            </div>

        </Col>
    </Row>
    </Container>
  )
}

export default ErrorPage
