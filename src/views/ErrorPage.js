import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/Styles/Error.css'
function ErrorPage(props) {
    const Err = props.location.state || {status:404,message:{ErrorMessage:'Page Not Found'}};
    return (
        <div className="Error_container">
            <h1 >Error {Err.status } </h1>
            <p>{Err.message.ErrorMessage} </p>
            <Link to="/">Go back to Home Page</Link>
        </div>
    )
}

export default ErrorPage;
