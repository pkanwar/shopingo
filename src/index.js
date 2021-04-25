import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './util/Navbar';
//import Sidebar from './util/Sidebar';
import ProductList from './component/ProductList';

class ReaderClubApp extends React.Component {
  render(){
    return <div>
             <Navbar />
             <ProductList />
          </div>
}
}

ReactDOM.render(
  <ReaderClubApp />,
  document.getElementById('root')
);


