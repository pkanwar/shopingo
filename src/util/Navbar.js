import React from 'react';
import '.././css/navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
          <div className='navGrid'>
            <div className='navItem' id='navItem1' >
                <div id='logoImg' ><img src='/images/home/book.png' alt='cart' /></div>
                <div id='title' >Reader's Club</div>
            </div>
            <div className='navItem' id='navItem2' >
                 <form>
                   <div id='formItem1' ><input placeholder="search for books,title,authors..."  id="searchInput" /></div>
                   <div id='formItem2' ><button id='searchBtn' class="btn btn-success btn-lg" ><span class="glyphicon glyphicon-search"></span></button></div>
                </form>
            </div>
            <div className='navItem' id='navItem3' >
                 <div className='loginSection' >
                    <input id="loginBtn" type="button" value="LOGIN" />
                </div> 
            </div>
            <div className='navItem' id='navItem4' >
               More
            </div>
            <div className='navItem' id='navItem5' >
                <div id='cartItem1' ><img src='/images/home/shopping-cart.png' alt='cart' /></div>
                <div id='cartItem2' >0</div>
            </div>

          </div>
        </div>
    );
}

export default Navbar;
