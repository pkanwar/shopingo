import React from 'react';
import '../css/productCart.css';
import Navbar from '../util/Navbar';
import ErrorPage from '../util/ErrorPage';

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

    fetchCartItems()
    {
        const fetchCartUrl = '/api/cart/items/';
        fetch(fetchCartUrl).then((res)=>{
            console.log('res : ' + res.status);
            return res.json();
            
        }).then((cartItem)=>{
            console.log('cartItem : '+ cartItem);
            if(cartItem.status === "SUCCEEDED"){
                this.setState({
                    items : cartItem.items,
                    cartQuantity : cartItem.cartQuantity,
                    actualPrice : cartItem.actualPrice,
                    discount : cartItem.discount,
                    totalPrice : cartItem.totalPrice,
                    isDeleteAction : false,
                    isIncrementAction : false
                });
            }else if(cartItem.status === "FAILED"){
                let msg = "";
                let location = "";
                msg = cartItem.message;
                const redirect = '/error/' + msg + '|' + location;
                window.location = redirect;
            }
        })
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
        let postMap = {};
       console.log('product id : ',item.productId);
        postMap['productId'] = item.productId;
        postMap['title'] = item.title;
        postMap['imageUrl'] = item.imageUrl;
        postMap['discount'] = item.discount;
        postMap['quantity'] = 1;
        postMap['actualPrice'] = item.actualPrice;
        postMap['discountedPrice'] = item.discountedPrice;
        console.log('postmap : ',postMap);
        return postMap;
    }

    placeOrderClick(){
        const requestOptions = {
            method: 'POST',
        };
        fetch('/api/orders/', requestOptions).then(res=>{
           return res.json();
        }).then(result=>{
            let redirect = '/productOrder/'
            if(result.errorCode === 'ER008'){
                let msg = "";
                let location = "";
                msg = result.message;
                redirect = '/error/' + msg + '|' + location;
            }
            window.location = redirect;
        })
    }

    addItem(item){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.createPostRequest(item))
        };
        fetch('/api/cart/', requestOptions).then(res=>{
            return res.json();
        }).then(result=>{
            if(result.status === 'SUCCEEDED'){
                this.setState({
                    isIncrementAction : true
                })
            }
        })
    }

    deleteItem(productId,isDecrement){
        let reqBody = {
            productId,
            isDecrement
        };
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        };
        fetch('/api/cart/', requestOptions).then((res)=>{
            return res.json();
        }).then((result)=>{
            if(result.status === 'SUCCEEDED'){
                this.setState({
                    isDeleteAction : true
                })
            }
        })
    }
    getCartItem(item)
    {
        let priceItem ="";
        let isPlusDisabled = false;
        if(item.quantity >= 10){
           isPlusDisabled = true;
        }
        if(item.discount)
        {
            priceItem = 
            <div className="itemPriceClass" >&#8377;<span className="itemDiscountPriceClass" >{item.discountedPrice}</span> <span className="itemActualPriceClass" ><del>&#8377;{item.actualPrice}</del></span> <span className="itemDiscountClass" >{item.discount}%off </span>
            </div>
        }else{
            priceItem = 
            <div className="itemPriceClass" >&#8377;<span className="actualPriceClass" >{item.actualPrice}</span> </div>
        }

        return  <div className="cart-list-item" >
            <div className="cart-item-image-btn" >
                <div className="cart-item-image" >
                    <div className="cart-item-img" >
                        <img src={item.imageUrl} alt="BOOK" />
                    </div>
                </div>
            </div>
            <div className="cart-item-info" >
                    <div className="cart-item-title" ><div className="item-title" >{item.title}</div></div>
                    <div className="cart-item-price" >{priceItem}</div>
                    <div className="cart-item-remove-qty" >
                        <div className="cart-item-btn" >
                            <div className="plus-qty-minus" >
                                <input class="btn btn-primary btn-sm" type="button" onClick={this.deleteItem.bind(this,item.productId,'N')} value="-" />
                                <input className="quantity" disabled type="text" value={item.quantity}  />
                                <input class="btn btn-primary btn-sm" disabled={isPlusDisabled} type="button" onClick={this.addItem.bind(this,item)} value="+" />
                            </div>
                            <div className="cart-item-remove" ><input class="btn btn-danger btn-lg" type="button" onClick={this.deleteItem.bind(this,item.productId,'N')} value="REMOVE" /></div>
                        </div>
                    </div>
            </div>
        </div>
    }

    getCartBody(items)
    {
        const cartList = items.map((item,index)=>
            this.getCartItem(item)  
        )
        return cartList;
    }



    render()
    {
        const items = this.state.items;
        const cartList = this.getCartBody(items);
        return (
            <div>
                <Navbar cartQuantity={this.state.cartQuantity} />
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

