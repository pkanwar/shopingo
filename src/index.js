import React from 'react';
import ReactDOM from 'react-dom';
//import Navbar from './util/Navbar';
//import Sidebar from './util/Sidebar';
import ProductList from './component/ProductList';
import ProductDetail from './component/ProductDetail';
import ProductCart from './component/ProductCart';
//import Home from './component/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function ReaderClubApp() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/productDetail/:id" component={ProductDetail} />
          <Route exact path="/productCart/" component={ProductCart} />
        </Switch>
      </Router>
    );
}

ReactDOM.render(
  <ReaderClubApp />,
  document.getElementById('root')
);


