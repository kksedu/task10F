import React, { useEffect, useState } from 'react';
import { getCartById, removeProductFromCart, payForCart, createCart } from '../utils/Server';
import { Product } from '../models/Product';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useAppContext } from './Context';

const Cart: React.FC = () => {
  const { cart, setCart } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const [paying, setPaying] = useState<boolean>(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartById(cart.id);
        setCart(cartData);
      } catch (error) {
        setError('Error fetching cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [cart.id, setCart]);

  const handleRemoveProduct = async (productID: string) => {
    setRemoving(productID);
    try {
      await removeProductFromCart(cart.id.toString(), productID);
      setCart((prevCart) => {
        if (prevCart) {
          const updatedProducts = prevCart.products.filter((product) => product.id.toString() !== productID);
          const updatedTotalPrice = updatedProducts.reduce((total, product) => total + product.price, 0);
          return { ...prevCart, products: updatedProducts, total_price: updatedTotalPrice };
        }
        return prevCart;
      });
    } catch (error) {
      console.error('Error removing product from cart:', error);
    } finally {
      setRemoving(null);
    }
  };

  const handlePay = async () => {
    setPaying(true);
    try {
      await payForCart(cart.id.toString());
      const newCart = await createCart(); // Create a new cart after payment
      setCart(newCart);
    } catch (error) {
      console.error('Error paying for cart:', error);
    } finally {
      setPaying(false);
    }
  };

  if (loading || paying) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative">
      <h1 className="text-black mb-4 position-absolute top-0">Cart</h1>
      <div className="mt-5 pt-5 w-100">
        <ListGroup className="w-100 mb-4">
          {cart && cart.products.length > 0 ? (
            cart.products.map((product: Product) => (
              <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{product.name}</h5>
                  <p>${product.price}</p>
                </div>
                <Button variant="danger" onClick={() => handleRemoveProduct(product.id.toString())} disabled={removing === product.id.toString()}>
                  {removing === product.id.toString() ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  ) : (
                    "Remove"
                  )}
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center">Your cart is empty</ListGroup.Item>
          )}
        </ListGroup>
        {cart && (
          <div className="d-flex justify-content-between align-items-center w-100 mb-4">
            <h4 className="text-black">Total: ${cart.total_price.toFixed(2)}</h4>
            <Button variant="success" onClick={handlePay} disabled={cart.products.length === 0 || paying}>Pay</Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
