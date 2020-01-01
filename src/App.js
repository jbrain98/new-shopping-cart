import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Card, Image } from 'rbx';

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
  <h2
    style={{ textAlign: 'center', color: 'gray' }}>
    Leave a star on Github if this repository was useful :)
  </h2>
)

const SizeHeader = () => (
  <Title size={4}> Sizes: </Title>
)

const SizeButtons = () => (
  <React.Fragment>
    {Object.values(sizes).map(value =>
      <Button
        style={{ margin: '5px', border: '0px', width: '40px', height: '40px', borderRadius: '100%', backgroundColor: '#DDDDDD' }}
        key={value}>
        {value}
      </Button>)}
  </React.Fragment>
)

const ProductsContainer = ({ products }) => (
  <Column.Group vcentered multiline>

    {products.map(product =>
      <Column
        fullhd={{ size: 'one-quarter' }}
        widescreen={{ size: 'one-quarter' }}
        desktop={{ size: 'one-third' }}
        tablet={{ size: 'half' }}
        mobile={{ size: 'full' }}
      >
        <ProductCard product={product} />
      </Column>
    )}

  </Column.Group>
)

const ProductCard = ({ product }) => (
  <Card>
    <Card.Content>
      <ProductPicture product={product} />
    </Card.Content>
    <Card.Content>
      <ProductTitle product={product} />
    </Card.Content>
  </Card>
)

const ProductTitle = ({ product }) => (
  <Title size={5} style={{ textAlign: 'center'}}> {product.title} </Title>
)


const ProductPicture = ({ product }) => (
  <Card.Image>
    <Image.Container>
      <Image src={`data/products/${product.sku}_1.jpg`} />
    </Image.Container>
  </Card.Image>
)

const ShoppingPage = ({ products }) => (
  <Column.Group>
    <Column size={1} />
    <Column size={2}>
      <SizeContainer />
    </Column>
    <Column size={8}>
      <ProductsContainer products={products} />
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
    <ShoppingPage products={products} />
  );
};

export default App;