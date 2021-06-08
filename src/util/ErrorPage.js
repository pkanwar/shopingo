import React from 'react';
import '.././css/errorPage.css';

function ErrorPage(props) {
        const errorObject = props.errorObject;
        console.log('error object : ',errorObject);
        return (
                <div className="error-section" onClick={e => e.stopPropagation()}>
                    <div className="error-logo" >
                            <div id='errorImg' ><img src='/images/home/reader.jpg' alt='cart' /></div>
                    </div>
                    <div className="error-page" >
                        <div className="error-content" ><span>{errorObject.message}</span></div>
                        <div className="error-close" ><button class="btn btn-primary btn-sm" onClick={props.onClick} >Okay</button></div>
                    </div>
                </div>
        )
}

export default ErrorPage;