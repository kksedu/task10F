import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Home: React.FC = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="w-100 mb-5">
        <Col>
          <h1 className="text-center text-white">Welcome to Our Online Store</h1>
          <p className="text-center text-white">Discover the best products at unbeatable prices!</p>
        </Col>
      </Row>

      <Row className="w-100 mb-5">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/tablet.webp"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/earbuds.webp"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/smartphone.webp"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row className="w-100 mb-5">
        <Col>
          <h2 className="text-center text-white">Featured Products</h2>
        </Col>
      </Row>

      <Row className="w-100 mb-5">
        {[1, 2, 3].map((product) => (
          <Col key={product} sm={12} md={4} className="d-flex justify-content-center mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product {product}</Card.Title>
                <Card.Text>
                  This is a description of product {product}. It is an excellent product.
                </Card.Text>
                <Button variant="primary">View Product</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="w-100 mb-5">
        <Col>
          <h2 className="text-center text-white">Customer Reviews</h2>
        </Col>
      </Row>

      <Row className="w-100">
        {[1, 2, 3].map((review) => (
          <Col key={review} sm={12} md={4} className="d-flex justify-content-center mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Text>
                  "This is a review {review}. The product quality is amazing and the service is excellent!"
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Customer {review}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

