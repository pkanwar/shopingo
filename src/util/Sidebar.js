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

function CheckBox (props) {
        const items = props.items;
        let itemList = "";
        if(props.name === 'rating'){
            itemList = items.map((value,index)=>
                <table key={index} className="filterItemClass" >
                    <tr>
                    <td className="itemCheckbox" ><input type="checkbox"  name={props.name} value={value} onClick={props.handleCheckboxClick} /></td>
                    <td className="itemLabel"  ><label className="labelClass" ><span className="starClass" >{value} <i class="fa fa-star"></i></span></label></td>
                    </tr>
                </table>
            )
        }else{
            itemList = items.map((value,index)=>
                <table key={index} className="filterItemClass" >
                    <tr>
                    <td className="itemCheckbox" ><input type="checkbox" name={props.name} value={value} onClick={props.handleCheckboxClick}  /></td>
                    <td className="itemLabel"  ><label className="labelClass" >{value}</label></td>
                    </tr>
                </table>
            )
        }
        return itemList;
}

function Sidebar(props) {

    const products = props.products;
    let authorList = getAuthors(products);
    let genreList = getGenres(products);
    let ratingList = getRatings(products);
    const authorName = "author";
    const genreName = "genre"
    const ratingName = "rating"
    const sideBar = 
    <div className="sidebar" >
        <div className="sidebar-grid" >
            <div className="sidebar-item" id="sidebar-item1" >
                <div>
                    <span id='book-filter-title' >Books Filter</span>
                </div>
                <div>
                    <button id="filter-btn" onClick={props.handleClearFilterClick} >Clear all filters</button>
                </div>
            </div>
            <div className="sidebar-item" id="sidebar-item2" >
                <div className='filterTitle'>Genre</div>
                <div className='filterContent'>
                <div className="filterColumns" >
                    <CheckBox items={genreList} name={genreName} handleCheckboxClick={props.onCheckBoxClick} />
                </div>
                </div>
            </div>
            <div className="sidebar-item" id="sidebar-item3" >
                <div className='filterTitle'>Author</div>
                <div className='filterContent'>
                <div className="filterColumns" >
                    <CheckBox items={authorList} name={authorName} handleCheckboxClick={props.onCheckBoxClick} />
                </div>
                </div>
            </div>
            <div className="sidebar-item" id="sidebar-item4" >
                <div className='filterTitle'>Customer Rating</div>
                <div className='filterContent'>
                <div className="filterColumns" >
                <div className="filterColumns" >
                    <CheckBox items={ratingList} name={ratingName} handleCheckboxClick={props.onCheckBoxClick} />
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    return sideBar;
}

export default Sidebar;