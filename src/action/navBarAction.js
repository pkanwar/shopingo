
function updateCart(){
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

export function fetchUser() {
    fetch('/api/users/me/').then(res=>{
        if(res.status !== 200){
            this.setState({
                isLoggedIn : false
            })
        }
         return res.json();
    }).then(user=>{
        if(user.status === "SUCCEEDED"){
            this.setState({
                isLoggedIn : true,
                user : {...user},
                show : false
            })
        }
        updateCart();
        fetch('/api/cart/items/').then(res=>{       
            return res.json();
        }).then(cart=>{
            if(cart.status === "SUCCEEDED"){
                this.setState({
                    cartQuantity : cart.cartQuantity
                })
            }
        })
    })
}

export function logoutUser()
{
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

export function  myCartClick(){
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

export function myOrderClick(){
    if(this.state.isLoggedIn === false){
        let errorObject = this.getErrorObject('You are not logged in. Please login to contine',window.location.pathname);
        this.setState({
            errorObject : errorObject
        })
        this.setErrorShow(true);
    }else{
        window.location = '/productOrder/'
    }
}