import React, { useState } from 'react';
import { Product } from '../models/Product';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<Props> = ({ product, onAddToCart}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = async () => {
        setIsClicked(true);

        try {
            onAddToCart(product);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } finally {
            setTimeout(() => {
                setIsClicked(false);
            }, 300);
        }
    };

    return (
        <Card className="text-center" style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    Price: ${product.price}
                </Card.Text>
                <Button
                    variant={isClicked ? "success" : "primary"}
                    onClick={handleClick}
                    disabled={isClicked}
                >
                    {isClicked ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Adding...</span>
                        </>
                    ) : (
                        "Add to cart"
                    )}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
