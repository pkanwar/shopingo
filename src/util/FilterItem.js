import React from 'react';
import '.././css/productCart.css';

export function filterItem(item) {

    let priceItem ="";
    if(item.discount)
    {
        priceItem = 
        <div className="itemPriceClass" >&#8377;<span className="itemDiscountPriceClass" >{item.price.discountedPrice}</span> <span className="itemActualPriceClass" ><del>&#8377;{item.price.actualPrice}</del></span> <span className="itemDiscountClass" >{item.discount}%off </span>
        </div>
    }else{
        priceItem = 
        <div className="itemPriceClass" >&#8377;<span className="actualPriceClass" >{item.price.actualPrice}</span> </div>
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
                    <div className="filter-item-block" >
                        <div className="author-block" >
                            <div className="author-title" >Author : </div>
                            <div className="author-name" >{item.author}</div>
                        </div>
                        <div className="view-details" ><input class="btn btn-primary btn-lg" type="button" onClick={this.viewItemDetails.bind(this,item._id)} value="View Details" /></div>
                    </div>
                </div>
        </div>
    </div>


}
