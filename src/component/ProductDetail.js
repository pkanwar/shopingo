import React from 'react';
import '../css/productDetail.css';
import Navbar from '../util/Navbar';

class ProductDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id : "607319a401611429dc066ccd",
            product: {}
        }
    }

    componentDidMount(){
        console.log('id : ',this.state.id);
        const fetchUrl = '/api/products/' + this.state.id;
        fetch(fetchUrl).then(res=>{
            console.log('product : '+ res);
            if(res.status===200){
                return res.json();
            }
        }).then((product)=>{
            console.log('product : '+ product.title);
            this.setState({
                product : product
            })
        })
    }

    render(){
        const product = this.state.product;
         const price = {...product.price};
         console.log("price ",price['actualPrice'])
       
        let priceItem ="";
        if(product.discount)
        {
            priceItem = 
            <div className="priceClass" >&#8377;<span className="discountPriceClass" >{price['discountedPrice']}</span> <span className="actualPriceClass" ><del>&#8377;{price['actualPrice']}</del></span> <span className="discountClass" >{product.discount}%off </span>
            </div>
        }else{
            priceItem = 
            <div className="priceClass" >&#8377;<span className="priceClass" >{price['actualPrice']}</span> </div>
        }
        return (
            <div>
                <Navbar />
                <div className="pd-container" >
                    <div className="item-detail-container" >
                        <div className="image-buy-container" >
                            <div className="product-image-box" >
                                <div className="product-image-col" >
                                    <img src={product.imageUrl} alt="BOOK" />
                                </div>
                            </div>
                            <div className="product-buy" >
                                <div className="product-button" ><input type="button" value="ADD TO CART" class="btn btn-primary btn-block" /></div>
                            </div>
                        </div>
                        <div className="detail-container" >
                            <div className="product-title-row" >
                                <span className="title-name"><h3>{product.title}</h3></span>
                            </div>
                            <div className="product-author-rating-row" >
                                 <div className="author-col" >Written By : <span>{product.author}</span></div>
                            </div>
                            <div className="product-genre-row" >
                                <div className="genre-col" >Genre : <span className="GenreName">{product.category}</span></div>
                                <div className="rating-col" >
                                 Rating : <span className="rating-style" >{product.rating} <i class="fa fa-star"></i></span>
                                 </div>
                            </div>
                            <div className="product-price-row" >
                                <div className="price-col" >
                                    {priceItem}
                                </div>
                            </div>
                            <div className="product-summary-row" >
                                <div className="summary-title" ><h3>SUMMARY</h3></div>
                                <br />
                                <div className="summary-content" >{product.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
