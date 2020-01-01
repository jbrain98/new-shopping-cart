import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column } from 'rbx';

const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL']

const SizeContainer = () => {
  return (
    <React.Fragment>
      <SizeHeader />
      <SizeButtons />
      <GithubReviewBox />
    </React.Fragment>
  );
}

const GithubReviewBox = () => (
  <h2 style={{textAlign: 'center', color: 'gray'}}>Leave a start on Github if this repository was useful :)</h2>
)

const SizeHeader = () => (
  <Title size={4}> Sizes: </Title>
)

const SizeButtons = () => (
  <React.Fragment>
        { Object.values(sizes).map(value => <button style={{margin: '5px', border: '0px', width: '40px', height: '40px', borderRadius: '100%', backgroundColor: '#DDDDDD'}} key={value}> {value}</button>)}
  </React.Fragment>
)

const ProductsContainer = ({products}) => (
  <React.Fragment>
    <ul>
      {products.map(product => <li key={product.sku}>{product.title}</li>)}
    </ul>
  </React.Fragment>
)

const ShoppingPage = ({ products }) => (
  <Column.Group>
  <Column size = {1} />
  <Column size= {2}>
    <SizeContainer />
  </Column>
  <Column size="three-fifth">
    <ProductsContainer products = {products}/>
    </Column>
  </Column.Group>
)

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <ShoppingPage products = {products}/>
  );
};

export default App;