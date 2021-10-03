import React from 'react';
import '../css/productCart.css';
import Navbar from '../util/Navbar';
import {filterItem} from '../util/FilterItem';
import {getCartItems,placeOrderRequestMap,placeOrder,addItemForOrder,deleteItemFromOrder,getProductsBySearch} from '../action/productCartAction.js';

class ProductFilter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            products : [],
            items : [],
            cartQuantity : null, 
            actualPrice : null,
            discount : null,
            totalPrice : null,
        }
    }

    onSearchClick(e){
        
        let searchText = document.getElementById("searchInput").value;
        console.log("text val : ", searchText);
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
        getProductsBySearch.call(this,this.props.match.params.title);
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

    viewItemDetails(productId){
        let url = '/productDetail/' + productId;
        window.open(url,'_blank'); 
    }

    getCartItem(item)
    {
        getProductsBySearch.call(this,this.props.match.params.title);
    }

    getCartBody(items)
    {
        const cartList = items.map((item,index)=>
        filterItem.call(this,item)
        )
        return cartList;
    }

    render()
    {
        const items = this.state.items;
        const cartList = this.getCartBody(items);
        //let title = this.props.match.params.title;
        return (
            <div>
                <Navbar onSearchText={this.onSearchText.bind(this)}  onSearchClick={this.onSearchClick.bind(this)} quantity={this.state.cartQauntity} />
                <div className="productCart-container" >
                    <div className="productFilter-detail-container" >
                        <div className="filter-list" >
                            <div className="cart-list-title" ><span className="cart-title">Your search Results</span></div>
                            <div className="cart-list-content" >
                                {cartList}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
   
}

export default ProductFilter;

