import React from 'react';
import {activePageStyle,passivePageStyle} from '../action/productListAction.js';


function PageLink(props) {
    console.log('current page page link : ',props.currentPage)
    let currentPageNumber = props.currentPage;
    const pages = props.totalPages;
    let pageLinks = [];
    let link = "";
    for(let i=1;i<=pages;i++)
    {
       
        if(parseInt(i) === parseInt(currentPageNumber))
        {
            link =  <input type="button" className="anchor" style={activePageStyle} key={i} value={i} onClick={props.handleAnchorClick} />;
        }else{
            link =  <input type="button" className="anchor" style={passivePageStyle} key={i} value={i} onClick={props.handleAnchorClick} />;
        }
        pageLinks.push(
            link
        ) 
    }
    return pageLinks   
}

export default PageLink;