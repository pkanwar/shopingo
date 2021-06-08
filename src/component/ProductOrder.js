import React from 'react';
import '../css/productCart.css';
import OrderItem from '../util/OrderItem';
import Navbar from '../util/Navbar';
import {getOrder,makePayment} from '../action/productOrderAction.js';


class ProductCart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items : [],
            cartQuantity : null, 
            actualPrice : null,
            discount : null,
            totalPrice : null
        }
    }

    componentDidMount(){
        getOrder.call(this)
    }

    onPayClick(e){
        makePayment.call(this,e)
    }

    render()
    {
        const items = this.state.items;
        const orderList = items.map((item,index)=>
            <OrderItem  key={index} item={item}  />
        )

        return (
            <div>
                <Navbar />
                <div className="productCart-container" >
                    <div className="productCart-detail-container" >
                        <div className="cart-list" >
                            <div className="cart-list-title" ><span className="cart-title">My Order Details</span><span className="cart-quantity" >({this.state.cartQuantity} items)</span></div>
                            <div className="cart-list-content" >
                                {orderList}
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
                                        <div className="place-order-btn" ><input class="btn btn-primary btn-lg btn-block" type="button" onClick={this.onPayClick} value="PAY NOW" /> </div>
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

