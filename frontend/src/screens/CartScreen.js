import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card, Container } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQty, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <Container className="pt-4 pb-5">
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: '20px', fontWeight: 'bold' }}>🛒 Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="alert alert-info" style={{ fontSize: '1.2rem' }}>
              Your cart is empty. <Link to="/shop" className="fw-bold">Go Shop</Link>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={`${item._id}-${item.color || 'none'}-${item.size || 'none'}-${index}`} className="my-2 shadow-sm rounded border">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
                        {item.name}
                      </Link>
                      <div className="text-muted small mt-1">
                        {item.size && <span className="me-2">Size: <strong>{item.size}</strong></span>}
                        {item.color && (
                          <span className="d-inline-flex align-items-center">
                            Color: <span style={{ background: item.color, width: 12, height: 12, borderRadius: '50%', display: 'inline-block', marginLeft: 4, border: '1px solid #ccc' }}></span>
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={2} className="text-success fw-bold">₹{item.price}</Col>

                    <Col md={3} className="d-flex align-items-center justify-content-center">
                      <Button variant="light" size="sm" onClick={() => decreaseQty(item)}>
                        <FaMinus />
                      </Button>
                      <span className="mx-3 fw-bold fs-5">{item.qty}</span>
                      <Button variant="light" size="sm" onClick={() => addToCart(item)}
                        disabled={item.qty >= (item.stock || item.countInStock || 99)}>
                        <FaPlus />
                      </Button>
                    </Col>

                    <Col md={2} className="text-end">
                      <Button type="button" variant="light" onClick={() => removeFromCart(item)}>
                        <FaTrash color="red" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 mt-5">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartCount}) items</h2>
                <h3 className="text-success mt-2 fw-bold">₹{cartTotal}</h3>
                {cartTotal > 0 && cartTotal < 999 && (
                  <small className="text-muted">Add ₹{999 - cartTotal} more for free shipping!</small>
                )}
                {cartTotal >= 999 && (
                  <small className="text-success fw-bold">✅ Free Shipping!</small>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button type="button" className="btn-dark w-100" disabled={cartItems.length === 0}
                  style={{ padding: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}
                  onClick={() => navigate('/checkout')}>
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;