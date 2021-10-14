import React from 'react';
import '../css/productCart.css';
import Navbar from '../util/Navbar';
import {cartItem} from '../util/CartItem';
import {getCartItems,placeOrderRequestMap,placeOrder,addItemForOrder,deleteItemFromOrder} from '../action/productCartAction.js';

class ProductCart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items : [],
            cartQuantity : null, 
            actualPrice : null,
            discount : null,
            totalPrice : null,
            isDeleteAction : false,
            isIncrementAction : false
        }
    }

    onSearchClick(e){
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

    fetchCartItems()
    {
        getCartItems.call(this)
    }

    componentDidMount(){
        this.fetchCartItems();
    }

    componentDidUpdate(prevProps, prevState){
        if((prevState.isDeleteAction !== this.state.isDeleteAction)||(prevState.isIncrementAction !== this.state.isIncrementAction)){
            if(this.state.isDeleteAction === true || this.state.isIncrementAction === true){
                this.fetchCartItems();
            }
        }
    }

    createPostRequest(item)
    {
        return placeOrderRequestMap.call(this,item)
    }

    placeOrderClick(){
        placeOrder.call(this)
    }

    addItem(item){
        addItemForOrder.call(this,item)
    }

    deleteItem(productId,isDecrement){
        deleteItemFromOrder.call(this,productId,isDecrement)
    }

    getCartItem(item)
    {
       
    }

    getCartBody(items)
    {
        const cartList = items.map((item,index)=>
            cartItem.call(this,item)
        )
        return cartList;
    }

    render()
    {
        const items = this.state.items;
        const cartList = this.getCartBody(items);
        return (
            <div>
                <Navbar onSearchText={this.onSearchText.bind(this)}  onSearchClick={this.onSearchClick.bind(this)} cartQuantity={this.state.cartQuantity} />
                <div className="productCart-container" >
                    <div className="productCart-detail-container" >
                        <div className="cart-list" >
                            <div className="cart-list-title" ><span className="cart-title">MY CART</span><span className="cart-quantity" >({this.state.cartQuantity})</span></div>
                            <div className="cart-list-content" >
                                {cartList}
                            </div>
                        </div>
                        <div className="price-details-info" >
                            <div className="price-details">
                                <div className="price-detail-title" ><span className="price-title" >PRICE DETAILS</span></div>
                                <div className="cart-price-details" >
                                    <div className="cart-actual-price" ><div className="actualPriceTitle" >Price ({this.state.cartQuantity} items)</div><div className="actualPrice" >&#8377;{this.state.actualPrice}</div></div>
                                    <div className="cart-discount" ><div className="actualPriceTitle" >Discount</div><div className="discount" > - &#8377;{this.state.discount}</div></div>
                                    <div className="cart-total-amount" ><div className="actualPriceTitle" >Total Amount</div><div className="totalAmount" >&#8377;{this.state.totalPrice}</div></div>
                                    <div className="order-btn" >
                                        <div className="place-order-btn" ><input class="btn btn-primary btn-lg btn-block" type="button" onClick={this.placeOrderClick.bind(this)} value="PLACE ORDER" /> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
   
}

export default ProductCart;

