import React from 'react';
import '.././css/loginPage.css';

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loginId : '',
            password : '',
            loginMsg : '',
            passwordMsg : ''
        }
        this.onInput = this.onInput.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onInput(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onLoginClick(e){
        e.preventDefault();
        const { loginId, password } = this.state;

        fetch('/api/sessions/',{
            method: 'POST',
             body: JSON.stringify({loginId:loginId,password:password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
             }
        }).then(res=>{
            if(res.status === 204){
                window.location = '/';
            }
            return res.json();
        }).then(error => {
            if(error.errorCode === 'ER006'){
                this.setState({
                    loginMsg : error.message
                })
            }
            if(error.errorCode === 'ER007'){
                this.setState({
                    passwordMsg : error.message
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.setState({
                loginMsg : '',
                passwordMsg : ''
            })
        }
    }

    render(){
        return (
                <div className="loginpage-content" onClick={e => e.stopPropagation()} >
                    <div className="login-logo" >
                        <div id='ReaderImg' ><img src='/images/home/reader.jpg' alt='cart' /></div>
                    </div>
                    <div className="login-form" >
                        <div>
                            <form className="login-form-content" >
                                <div className="form-group" >
                                    <label for="loginId" >Login Id</label> <span id="loginMsg" >{this.state.loginMsg}</span>
                                    <input type="text" className="form-control" name="loginId" id="loginId" aria-describedby="loginHelp" value={this.state.loginId} onInput={this.onInput} placeholder="Enter LoginId" />
                                </div>
                                <div className="form-group" >
                                    <label for="passwordId">Password</label> <span id="passwordMsg" >{this.state.passwordMsg}</span>
                                    <input type="password" class="form-control" name="password" id="passwordId" value={this.state.password} onInput={this.onInput} placeholder="Password" />
                                </div>
                                
                                <div className="login-btn" >
                                    <button type="submit" id="loginBtnId" onClick={this.onLoginClick} class="btn btn-primary btn-block">Submit</button>
                                </div>
                                <div className="or-block">OR</div>
                            </form>
                        </div>
                    
                        <div className="register-form" >
                            <div className="register-title" >New to Reader's Club ? <a href="http://www.google.com" >Create an account</a></div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default LoginPage;