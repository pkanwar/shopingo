import React from 'react';
import '../css/productList.css';
import '../util/Sidebar';
import '../util/Navbar';
import Sidebar from '../util/Sidebar';
import ProductItem from '../util/ProductItem';
import Navbar from '../util/Navbar';
import SlideShow from '../util/SlideShow';

class ProductList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            products : [],
            page : 1,
            size : 16
        }
    }

    onCheckBoxClick(name,val){
        
        console.log('name clicked !! ',name);
        console.log('value clicked !! ',val);
    }

    componentDidMount(){
        let pageNo = this.page;
        let numberOfItems = this.size;
        const fetchProductsUrl = `/api/products?page=${pageNo}&size=${numberOfItems}&title=&category=&subCategory=`;
        fetch(fetchProductsUrl).then(res=>{
            console.log('products response : '+ res);
            if(res.status===200){
                return res.json();
            }else{
                // throw error 500
            }
        }).then((productList)=>{
            console.log('products list : '+ productList);
            this.setState({
                products : productList
            });
        })
    }

    render(){

        const products = this.state.products;
        let noOfProducts =  products.length;
        let productListSize = 50 + (parseInt(Math.ceil(noOfProducts/4)))*400;
        let productContainerSize = parseInt(420 + (parseInt(Math.ceil(noOfProducts/4)))*400);
        const productListStyle = {
            height : productListSize
        }
        const productContainerStyle = {
            height : productContainerSize
        }

        let productGridHeight = parseInt(50 + (parseInt(Math.ceil(noOfProducts/4)))*400);
        console.log('product grid height:', productGridHeight);
        const productGridStyle = {
            height : productGridHeight
        } 
        console.log('products : ', products);
        const productList = products.map((product,index)=>
            <ProductItem key={index} onCheckBoxClick={this.onCheckBoxClick} product={product} />
        );

        return (
        <div>
        <Navbar />
        <div className="container" >
            <Sidebar products={products} onCheckBoxClick={this.onCheckBoxClick}  />
            <div className="product-container" style={productContainerStyle} >
                <div className="slide-show" >
                    <SlideShow />
                </div>
                <div className="product-list-class" style={productListStyle} >
                    <div className="product-grid" style={productGridStyle} >
                        {productList}
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }
}

export default ProductList;