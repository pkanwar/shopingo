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
        console.log('i : type ',typeof i)
        console.log('currentPageNumber : ',typeof currentPageNumber)
        console.log(i === currentPageNumber)
        if(parseInt(i) === parseInt(currentPageNumber))
        {
            console.log('i : ',i)
            link =  <input type="button" className="anchor" style={activePageStyle} key={i} value={i} onClick={props.handleAnchorClick} />;
        }else{
            console.log('i p : ',i)
            link =  <input type="button" className="anchor" style={passivePageStyle} key={i} value={i} onClick={props.handleAnchorClick} />;
        }
        pageLinks.push(
            link
        ) 
    }
    return pageLinks   
}

export default PageLink;