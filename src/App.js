import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Card, Image, Media, Content } from 'rbx';
import Sidebar from "react-sidebar";

const sizes = ['S', 'M', 'L', 'XL']

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
      <ProductDescription product={product} />
      <ProductPrice product={product} />
      <SizeButtons />
    </Card.Content>
  </Card>
)

const ProductTitle = ({ product }) => (
  <Title size={5} style={{ textAlign: 'center'}}> {product.title} </Title>
)

const ProductDescription = ({ product }) => (
  <Title size={6} style={{ textAlign: 'center'}}> {product.description} </Title>
)

const ProductPrice = ({ product }) => (
  <Title size={6} style={{ textAlign: 'center'}}> {`${product.currencyFormat}${product.price}`} </Title>
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
    <Column size={2} />
    <Column size={8}>
      <ProductsContainer products={products} />
    </Column>
  </Column.Group>
)

const ShoppingCart = ({products}) => {
  const [sidebarState, sidebarSwitch] = useState({sidebarOpen: false});
  {products.map(product =>
      <ProductCard product={product} />
  )}
  const [cartItems, changeCart] = useState([]);//[products[0], products[1]]);
  const onSetSidebarOpen = ({open}) => {
    var nextstate = true;
    if (sidebarState.sidebarOpen == true)
    {
      nextstate = false
    }
    sidebarSwitch({ sidebarOpen: nextstate });
  };
    return(
      <Sidebar sidebar = {<ShoppingCartList selected = {products}></ShoppingCartList>}
      open = {sidebarState.sidebarOpen}
      onSetOpen = {onSetSidebarOpen} 
      styles={{ sidebar: { background: "white" } }}
      > <button onClick={() => onSetSidebarOpen(true)}>
      <Title>Cart</Title>
    </button></Sidebar>
    );

}


const ShoppingCartList = ({selected}) => 
{
  var totalPrice = 0;
  return (
  <Container>

    {selected.map(product =>
        {totalPrice += product.price;
        return(
          <ShoppingCartItem product={product} />
        )}
      
    )}
  <Title>Total Price: ${totalPrice}</Title>
  </Container>
)
    }


const ShoppingCartItem = ({product}) =>(
  <Media>
  <Media.Item as="figure" align="left">
    <Image.Container>
      <Image
        src={`data/products/${product.sku}_2.jpg`}/>
    </Image.Container>
  </Media.Item>
  <Media.Item align="content">
    <Content>
      <h6>
        <h5>{product.title}</h5>
        <br />
        {product.description}
      </h6>
    </Content>
  </Media.Item>
  <Media.Item align="right">
    <Button> X </Button>
    <br />
    <h3> {product.price} </h3>
  </Media.Item>
</Media>
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
    <React.Fragment>
      <ShoppingPage products={products} />
      <ShoppingCart products= {products}/>
    </React.Fragment>
    
  );
};

export default App;