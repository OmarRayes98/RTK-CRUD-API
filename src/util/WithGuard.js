import { useSelector } from "react-redux";

const WithGuard = (Component) => {

    const Wrapper = (props) =>{ // this line for access Component parameter
        const {isLoggedIn} = useSelector((state) => state.auth);

        return isLoggedIn ?  <Component {...props}/> : <div>Please Logged In first..</div>;
    };

    return Wrapper;
}

export default WithGuard
