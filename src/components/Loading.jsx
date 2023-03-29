
import { cloneElement } from "react";


const Loading = ({loading,error, children}) => {

    const elementType = children?.type?.render?.displayName; // type of children 
    

    const renderHandler = () =>{

        if(elementType === "Button"){

            const cloneButone = cloneElement(children, {disabled: true},"Loading...");

            return (
                <>
                {loading ? cloneButone :
                
                error ? (
                    <>
                    {children}
                    <br/>
                    <p>{error}</p>
                    </>
                ) : (
        
                children
        
                )}
            </>
            )
        } //end if 

        return (
            <>
                {loading ? (
        
                    <p className="text-center ">
                    Loading please wait...
                    </p>
                ) : error ? (
                    <p className="text-center bg-danger">
                    {error}
                    </p>
                ) : (
        
                children
        
                )}
            </>
            );
    }


    return renderHandler();


}

export default Loading
