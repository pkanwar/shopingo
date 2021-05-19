import React from 'react';
import '.././css/productCart.css';

class CartItem extends React.Component {
   

    render ()
    {
        const item = this.props.item;
        let priceItem ="";
        if(item.discount)
        {
            priceItem = 
            <div className="itemPriceClass" >&#8377;<span className="itemDiscountPriceClass" >{item.discountedPrice}</span> <span className="itemActualPriceClass" ><del>&#8377;{item.actualPrice}</del></span> <span className="itemDiscountClass" >{item.discount}%off </span>
            </div>
        }else{
            priceItem = 
            <div className="itemPriceClass" >&#8377;<span className="actualPriceClass" >{item.actualPrice}</span> </div>
        }

        const cartItem = 
            <div className="cart-list-item" >
                <div className="cart-item-image-btn" >
                    <div className="cart-item-image" >
                        <div className="cart-item-img" >
                            <img src={item.imageUrl} alt="BOOK" />
                        </div>
                    </div>
                    {/* <div className="cart-item-btn" ></div> */}
                </div>
                <div className="cart-item-info" >
                        <div className="cart-item-title" ><div className="item-title" >{item.title}</div></div>
                        <div className="cart-item-price" >{priceItem}</div>
                        <div className="cart-item-remove-qty" >
                            <div className="cart-item-btn" >
                                <div className="plus-qty-minus" >
                                    
                                    <input class="btn btn-primary btn-sm" type="button" value="-" />
                                    <input className="quantity" disabled type="text" value={item.quantity}  />
                                    <input class="btn btn-primary btn-sm" type="button" value="+" />
                                </div>
                                <div className="cart-item-remove" ><input class="btn btn-danger btn-lg" type="button" value="REMOVE" /></div>
                            </div>
                            {/* <div className="cart-item-remove" ></div> */}
                        </div>
                </div>
            </div>
        

        return (cartItem);
    }
}

export default CartItem;