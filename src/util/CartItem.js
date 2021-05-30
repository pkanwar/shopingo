import React from 'react';
import '.././css/productCart.css';



class CartItem extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            items : this.props.items
        }
    }


    componentDidMount(){
       
    }


   
    render ()
    {
        const items = this.props.items;
        const cartBody = this.getCartBody(items)
        return cartBody;
    }
}

export default CartItem;