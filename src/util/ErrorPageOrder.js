import React from 'react';
import '.././css/errorPage.css';

class ErrorPageOrder extends React.Component {

    // constructor(props){
    //     super(props); 
    // }

    onOkayClick(location){
        window.location = location;
    }

    render(){
        let errorArray = this.props.match.params.errorParam;
        let error = errorArray.split('|')
        const message = error[0];
        const location = '/' + error[1];
        //console.log('error object : ',message);
        return (
                <div className="errorpage-container-active" >
                <div className="error-section" onClick={e => e.stopPropagation()}>
                    <div className="error-logo" >
                            <div id='errorImg' ><img src='/images/home/reader.jpg' alt='cart' /></div>
                    </div>
                    
                    <div className="error-page" >
                        <div className="error-content" ><span>{message}</span></div>
                        <div className="error-close" ><button class="btn btn-primary btn-sm" onClick={this.onOkayClick.bind(this,location)} >Okay</button></div>
                    </div>
                </div>
                </div>
        )
    }
}

export default ErrorPageOrder;