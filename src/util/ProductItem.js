import React from 'react';
import '.././css/productList.css';

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        console.log('event ',e.target.value);
        this.props.onCheckBoxClick(e.target.value);
    }

    render()
    {
        const product = this.props.product;
        let priceItem ="";    
        if(product.discount)
        {
            priceItem = 
            <div className="priceClass" >&#8377;<span className="discountPriceClass" >{product.price.discountedPrice}</span> <span className="actualPriceClass" ><del>&#8377;{product.price.actualPrice}</del></span> <span className="discountClass" >{product.discount}%off </span>
            </div>
        }else{
            priceItem = 
            <div className="priceClass" >&#8377;<span className="priceClass" >{product.price.actualPrice}</span> </div>
        }
        
        const productItem =
            <div className="productItem" >
                <a onClick={this.handleChange} target="_blank" href={`/productDetail/${product._id}`} rel="noreferrer">
                <div className="productImage" >
                    <div className="imgClass" >
                        <img src={product.imageUrl} alt="BOOK" />
                    </div>
                </div>
                <div className="productTitle" >
                    <h3>{product.title}</h3>
                </div>
                <div className="productAuthor" >
                    Written By : <span className="authorName">{product.author}</span>
                </div>
                <div className="productRating" >
                    Rating : <span className="ratingClass" >{product.rating} <i class="fa fa-star"></i></span>
                </div>
                <div className="productPrice" >
                    {priceItem}
                </div>
                </a>
            </div>

        return (productItem);
    }
}

export default ProductItem;