import React, { useEffect, useState } from 'react';
import { addProductToCart, fetchProducts, getCartById } from '../utils/Server';
import ProductItem from './ProductItem';
import { Product } from '../models/Product';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppContext } from './Context';

const ProductsList: React.FC = () => {
  const { products, setProducts } = useAppContext();
  const { cart, setCart } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);

        const initialCart = await getCartById(cart.id);
        setCart(initialCart);
      } catch (error) {
        setError('Error initializing data');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [cart.id]);

  const onAddToCart = async (product: Product) => {
    if (cart) {
      try {
        const updatedCart = await addProductToCart(cart.id.toString(), product.id.toString());
        setCart(updatedCart);
        console.log('Added to cart:', product);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  if (loading) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="text-white mb-4">Products</h1>
      <Row className="w-100">
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className="d-flex justify-content-center mb-4">
            <ProductItem product={product} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsList;
