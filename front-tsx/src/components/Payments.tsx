import React, { useEffect, useState } from 'react';
import { fetchPayments } from '../utils/Server';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useAppContext } from './Context';


const Payments: React.FC = () => {
  const { payments, setPayments } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchPayments();
        setPayments(data);
      } catch (error) {
        setError('Error fetching payments');
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative">
      <h1 className="text-black mb-4 position-absolute top-0">Payments</h1>
      <ListGroup className="w-100">
        {payments.map((payment) => (
          <ListGroup.Item key={payment.id} className="d-flex justify-content-between align-items-center">
            <h5>Payment ID: {payment.id}</h5>
            <h5>Method: {payment.method}</h5>
            <h5>Cart ID: {payment.cart_id}</h5>
            <h5>Amount: ${payment.amount}</h5>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Payments;
