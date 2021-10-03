import React from 'react';
import Navbar from '../util/Navbar';
import {createUserMap,postUserMap,validateFieldsOnInput} from '../action/registerAction.js';

import '../css/registerPage.css';

class RegistratinPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            emailId : '',
            loginId : '',
            firstName : '',
            lastName : '',
            password : '',
            confirmPassword : '',
            mobileNumber : '',
            address : '',
            emailIdMsg : '',
            loginMsg : '',
            firstNameMsg : '',
            lastNameMsg : '',
            passwordMsg : '',
            confirmPasswordMsg : '',
            mobileNumberMsg : '',
            addressMsg : '',
        }
        this.onInput = this.onInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onSearchClick(e){
        
        let searchText = document.getElementById("searchInput").value;
        console.log("text val : ", searchText);
        if(this.state.searchTitle!=="")
        {
            window.location = '/productFilter/' + this.state.searchTitle;
        }
    }

    onSearchText(e){
       this.setState({
           searchTitle : e.target.value
       })
    }

    onInput(event){
        console.log('event target : ',event.target.name)
        validateFieldsOnInput.call(this,event.target.name,event.target.value,false);
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
       let userPostMap = createUserMap.call(this,this.state.firstName,this.state.lastName,this.state.emailId,this.state.mobileNumber,this.state.address,this.state.loginId,this.state.password,this.state.confirmPassword);
        console.log('userMap : ',userPostMap);
     
        if(validateFieldsOnInput.call(this,event.target.name,event.target.value,true)===true){
            console.log('all validation passed')
            postUserMap.call(this,event,userPostMap);
        }
    }


    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.setState({
                loginMsg : '',
                passwordMsg : '',
                emailIdMsg : '',
                mobileNumberMsg : '',
                addressMsg : '',
                confirmPasswordMsg : '',
            })
        }
    }

    render(){
        return (
                <div>           
                <Navbar onSearchText={this.onSearchText.bind(this)}  onSearchClick={this.onSearchClick.bind(this)} quantity={this.state.cartQauntity} />
                <div className="register-box">
                    <div className="register-content" onClick={e => e.stopPropagation()} >

                        <div className="register-logo" >
                            <div id='ReaderImg' ><img src='/images/home/reader.jpg' alt='cart' /></div>
                        </div>
                        <div className="register-form" >
                            <div>
                                <form className="register-form-content" onSubmit={this.handleSubmit} >
                                    <div className="form-group" >
                                            <label for="firstName" >First Name</label> <span id="firstNameMsg" >{this.state.firstNameMsg}</span>
                                            <input type="text" className="form-control" name="firstName" id="firstName" aria-describedby="loginHelp" value={this.state.firstName} onInput={this.onInput} placeholder="Enter First Name" />
                                    </div>
                                    <div className="form-group" >
                                            <label for="lastName" >Last Name</label> <span id="lastNameMsg" >{this.state.lastNameMsg}</span>
                                            <input type="text" className="form-control" name="lastName" id="lastName" aria-describedby="loginHelp" value={this.state.lastName} onInput={this.onInput} placeholder="Enter Last Name" />
                                    </div>
                                    <div className="form-group" >
                                        <label for="emailId">Email Id</label> <span id="emailMsg" >{this.state.emailIdMsg}</span>
                                        <input type="text" class="form-control" name="emailId" id="emailId" value={this.state.emailId} onInput={this.onInput} placeholder="Enter Email" />
                                    </div>
                                    <div className="form-group" >
                                        <label for="mobileNumber">Contact Number</label> <span id="mobileNumberMsg" >{this.state.mobileNumberMsg}</span>
                                        <input type="text" class="form-control" name="mobileNumber" id="mobileNumber" maxlength="10" value={this.state.mobileNumber} onInput={this.onInput} placeholder="Enter Contact Number" />
                                    </div>
                                    <div className="form-group" >
                                        <label for="address">Address</label> <span id="addressMsg" >{this.state.addressMsg}</span>
                                        <textarea type="text" class="form-control" name="address" id="address" value={this.state.address} onInput={this.onInput} placeholder="Enter Address" />
                                    </div>
                                    <div className="form-group" >
                                        <label for="loginId" >Login Id</label> <span id="loginMsg" >{this.state.loginMsg}</span>
                                        <input type="text" className="form-control" name="loginId" id="loginId" maxlength="20" aria-describedby="loginHelp" value={this.state.loginId} onInput={this.onInput} placeholder="Enter LoginId" />
                                    </div>
                                    <div className="form-group" >
                                        <label for="passwordId">Password</label> <span id="passwordMsg" >{this.state.passwordMsg}</span>
                                        <input type="password" class="form-control" name="password" id="passwordId" value={this.state.password} onInput={this.onInput} placeholder="Password" />
                                    </div>
                                    <div className="form-group" >
                                        <label for="confirmPasswordId">Confirm Password</label> <span id="confirmPasswordMsg" >{this.state.confirmPasswordMsg}</span>
                                        <input type="password" class="form-control" name="confirmPassword" id="confirmPasswordId" value={this.state.confirmPassword} onInput={this.onInput} placeholder="Confirm Password" />
                                    </div>
                                    <div className="form-group" >
                                        <div className="register-btn" >
                                            <input type="submit" value="Register" name="submit" id="submit" class="btn btn-primary btn-block" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        )
    }
}

export default RegistratinPage;


