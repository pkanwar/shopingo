import React from 'react';
import ReactDOM from 'react-dom';
//import Navbar from './util/Navbar';
//import Sidebar from './util/Sidebar';
import ProductList from './component/ProductList';
import ProductDetail from './component/ProductDetail';
import ProductCart from './component/ProductCart';
import ProductOrder from './component/ProductOrder';
import ProductFilter from './component/ProductFilter';
import LoginPage from './util/LoginPage';
import RegistrationPage from './component/RegistrationPage';
import ErrorPageOrder from './util/ErrorPageOrder';
//import Home from './component/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function ReaderClubApp() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/productDetail/:id" component={ProductDetail} />
          <Route exact path="/productCart/" component={ProductCart} />
          <Route exact path="/productOrder/" component={ProductOrder} />
          <Route exact path="/register/" component={RegistrationPage} />
          <Route exact path="/productFilter/:title" component={ProductFilter} /> 
          <Route exact path="/login/" component={LoginPage} />
          <Route exact path="/error/:errorParam" component={ErrorPageOrder} />
          <Route exact path="/:pageNumber" component={ProductList} />
        </Switch>
      </Router>
    );
}

ReactDOM.render(
  <ReaderClubApp />,
  document.getElementById('root')
);


