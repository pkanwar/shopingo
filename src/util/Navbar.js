import React from 'react';
import '.././css/navbar.css';
import '.././css/loginPage.css';
import LoginPage from './LoginPage';
import ErrorPage from '../util/ErrorPage';


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

    updateCart(){
        fetch('/api/cart/updateCart/',{
            method: 'POST',
             body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
             }
        }).then(res=>{
            if(res.status === 200){
                console.log('cart updated successfully');
            }else{
                console.log('could not update cart');
            }
        })
    }

    fetchCart(){
        fetch('/api/cart/items/').then(res=>{
           
            return res.json();
            
        }).then(cart=>{
            console.log('cart : ',cart);
            if(cart.status === "SUCCEEDED"){
                this.setState({
                    cartQuantity : cart.cartQuantity
                })
            }
        })

    }

    fetchCurrentUser()
    {
        fetch('/api/users/me/').then(res=>{
            if(res.status !== 200){
                this.setState({
                    isLoggedIn : false
                })
            }
            console.log('res status : ',res.status);
             return res.json();
            
        }).then(user=>{
            if(user.status === "SUCCEEDED"){
                this.setState({
                    isLoggedIn : true,
                    user : {...user},
                    show : false
                })
            }
            this.updateCart();
            this.fetchCart();
            console.log('user info : ',user);
        })
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
        console.log('cartQuantity : ',this.props.cartQuantity)
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

    getErrorSection(isError){
        let errorSection = null;
        let errorObject = this.state.errorObject;
        
        let errorClassName = "errorpage-container-passive";
        if(isError === true){
            errorClassName = "errorpage-container-active"
            errorSection = <ErrorPage errorObject={errorObject} />;
        }
        return <div className={errorClassName} onClick={this.setErrorShow.bind(this,false)} >
            {errorSection}
        </div>
    }

    setErrorShow(value){
        this.setState({
            errorShow : value
        });
    }

    getErrorObject(message,location)
    {
        return {
            message : message,
            location : location,
        }
    }

    OnMyCartClick()
    {
        if(this.state.cartQuantity === 0){
            let errorObject = this.getErrorObject('No items present in the cart. Please add books',window.location.pathname);
            this.setState({
                errorObject : errorObject
            })
            this.setErrorShow(true);
        }else{
            window.location = '/productCart/'
        }
    }

    OnMyOrderClick()
    {
        
    }

    logoutAction(){
        fetch('/api/sessions/me',{
            method: 'DELETE',
             body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
             }
        }).then(res=>{
            if(res.status === 204){
                window.location = '/';
            }
        })
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
                    <form>
                    <div id='formItem1' ><input placeholder="search for books,title,authors..."  id="searchInput" /></div>
                    <div id='formItem2' ><button id='searchBtn' class="btn btn-success btn-lg" ><span class="glyphicon glyphicon-search"></span></button></div>
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
