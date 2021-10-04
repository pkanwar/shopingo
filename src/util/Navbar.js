import React from 'react';
import '.././css/navbar.css';
import '.././css/loginPage.css';
import LoginPage from './LoginPage';
import {fetchUser,logoutUser,myCartClick,myOrderClick} from  '../action/navBarAction.js'
import {getErrorPage} from  '../action/errorAction'

class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
           show : false,
           isLoggedIn : false,
           cartQuantity : 0,
           user : {},
           errorShow : false,
           errorObject : {}
        }
    }
    
    //used to get user info, update cart, fetch cart items for the user
    fetchCurrentUser()
    {
        fetchUser.call(this);
    }

    componentDidMount(){
       this.fetchCurrentUser();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.fetchCurrentUser();
        }
        if(prevProps.isItemAdded !== this.props.isItemAdded)
        {
            if(this.props.isItemAdded===true){
                let quantity = this.state.cartQuantity;
                this.setState({
                    cartQuantity : parseInt(quantity) + 1
                })
            }
        }
        if(this.props.cartQuantity !== prevProps.cartQuantity){
            this.setState({
                cartQuantity : this.props.cartQuantity
            })
        }
    }

    setShow(value){
        this.setState({
            show : value
        });
    }

    setErrorShow(value){
        this.setState({
            errorShow : value
        });
    }

    getErrorSection(isError){
        return getErrorPage.call(this,isError);
    }

    getErrorObject(message,location)
    {
        return {
            message : message,
            location : location,
        }
    }

    //go to my cart
    OnMyCartClick()
    {
        myCartClick.call(this);
    }

    // go to my order
    OnMyOrderClick()
    {
        myOrderClick.call(this)
    }

    logoutAction(){
        logoutUser.call(this);
    }

    render(){

        const errorSectionContent = this.getErrorSection(this.state.errorShow); 
        let loginSection = null;
        let loginCLassName = "loginpage-container-passive";
        if(this.state.show === true){
            loginCLassName = "loginpage-container-active"
            loginSection = <LoginPage/>;
        }
        let loginlogoutSection = <input id="loginlogoutBtn" type="button" onClick={this.setShow.bind(this,true)} value="LOGIN" />;
        let firstName = 'Guest';
        if(this.state.isLoggedIn === true){
            firstName = this.state.user['firstName'];
            loginlogoutSection = <input id="loginlogoutBtn" type="button" onClick={this.logoutAction.bind(this)} value="LOGOUT" />;
        }

        return (
                <div>
                <div className={loginCLassName} onClick={this.setShow.bind(this,false)} >
                    {loginSection}
                </div>
                <div className='navbar' >
                <div className='navGrid'>
                    <div className='navItem' id='navItem1' >
                        <div id='logoImg' ><img src='/images/home/book.png' alt='cart' /></div>
                        <div id='title' >Reader's Club</div>
                    </div>
                    <div className='navItem' id='navItem2' >
                        <form class="searchForm" onSubmit={this.props.onSearchClick} >
                            <div id='formItem1' ><input placeholder="search for book title..."  onChange={this.props.onSearchText}  id="searchInput" /></div>
                            <div id='formItem2' ><button id='searchBtn' class="btn btn-success btn-lg" onClick={this.props.onSearchClick} ><span class="glyphicon glyphicon-search"></span></button></div>
                        </form>
                    </div>
                    <div className='navItem' id='navItem3' >
                        <div className='loginSection' >
                            {loginlogoutSection}
                        </div> 
                    </div>
                    <div className='navItem' id='navItem4' >
                        <span className="welcome-class" >Welcome, {firstName}</span>
                    </div>
                    <div className='navItem' id='navItem5' >
                        <button type="button" id="cartBtn" onClick={this.OnMyCartClick.bind(this)} class="btn btn-outline-warning">My Cart ({this.state.cartQuantity})</button>
                    
                    </div>
                    <div className='navItem' id='navItem6' >
                        <button type="button" id="orderBtn" onClick={this.OnMyOrderClick.bind(this)}  class="btn btn-outline-warning">My Orders</button>
                    </div>
                </div>
                </div>
                    {errorSectionContent}
                </div>
            );
    }
}

export default Navbar;
