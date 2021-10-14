import React from 'react';
import '.././css/sidebar.css';

function getAuthors(products)
{
    let authorList = [];
    products.forEach((product,index)=>{
        if(!authorList.includes(product.author)){
            authorList.push(product.author);
        }
    })
    return authorList;
}

function getGenres(products)
{
    let genreList = [];
    products.forEach((product,index)=>{
        if(!genreList.includes(product.category)){
            genreList.push(product.category);
        }
    })
    return genreList;
}

function getRatings(products)
{
    let ratingList = [];
    products.forEach((product,index)=>{
        let rating = Math.floor(product.rating);
        if(!ratingList.includes(rating)){
            ratingList.push(rating);
        }
    })
    return ratingList;
}

class CheckBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleOnCheck = this.handleOnCheck.bind(this);
    }

    
    handleOnCheck(e)
    {
       this.props.handleCheckboxClick(e.target.name,e.target.value);
    }


    render(){
        const items = this.props.items;
        let itemList = "";
        if(this.props.name === 'rating'){
            itemList = items.map((value,index)=>
                <table key={index} className="filterItemClass" >
                    <tr>
                    <td className="itemCheckbox" ><input type="checkbox"  name={this.props.name} value={value} onClick={this.handleOnCheck} /></td>
                    <td className="itemLabel"  ><label className="labelClass" ><span className="starClass" >{value} <i class="fa fa-star"></i></span></label></td>
                    </tr>
                </table>
            )
        }else{
            itemList = items.map((value,index)=>
                <table key={index} className="filterItemClass" >
                    <tr>
                    <td className="itemCheckbox" ><input type="checkbox" name={this.props.name} value={value} onClick={this.handleOnCheck} /></td>
                    <td className="itemLabel"  ><label className="labelClass" >{value}</label></td>
                    </tr>
                </table>
            )
        }
        return itemList;
    }
}

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    }

    handleCheckboxClick(name,value)
    {
       
        this.props.onCheckBoxClick(name,value);
    }

    render(){
    const products = this.props.products;
    let authorList = getAuthors(products);
    let genreList = getGenres(products);
    let ratingList = getRatings(products);
    //console.log('ratingList : ',ratingList);
    const authorName = "author";
    const genreName = "genre"
    const ratingName = "rating"
    const sideBar = 
    <div className="sidebar" >
        <div className="sidebar-grid" >
            <div className="sidebar-item" id="sidebar-item1" >
                <span id='book-filter-title' >Books Filter</span>
            </div>
            <div className="sidebar-item" id="sidebar-item2" >
                <div className='filterTitle'>Genre</div>
                <div className='filterContent'>
                <div className="filterColumns" >
                    <CheckBox items={genreList} name={genreName} handleCheckboxClick={this.handleCheckboxClick} />
                </div>
                </div>
            </div>
            <div className="sidebar-item" id="sidebar-item3" >
                <div className='filterTitle'>Author</div>
                <div className='filterContent'>
                <div className="filterColumns" >
                    <CheckBox items={authorList} name={authorName} handleCheckboxClick={this.handleCheckboxClick} />
                </div>
                </div>
            </div>
            <div className="sidebar-item" id="sidebar-item4" >
                <div className='filterTitle'>Customer Rating</div>
                <div className='filterContent'>
                <div className="filterColumns" >
                <div className="filterColumns" >
                    <CheckBox items={ratingList} name={ratingName} handleCheckboxClick={this.handleCheckboxClick} />
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    return sideBar;
    }
}

export default Sidebar;