import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Card, Button, Container, Form, Badge } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTruck, FaShieldAlt, FaUndo, FaCheckCircle, FaMapMarkerAlt, FaMoneyBillWave, FaBolt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API from '../utils/api';
import Product from '../components/Product';
import toast from 'react-hot-toast';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const relatedRef = useRef(null);
  const { addToCart } = useCart();
  const { token } = useAuth();

  const scrollRelated = (dir) => {
    if (relatedRef.current) relatedRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API}/products/${id}`);
        setProduct(data);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
        if (data.colors?.length) setSelectedColor(data.colors[0]?.name);
        // Fetch related products from same category
        try {
          const res = await axios.get(`${API}/products`, { params: { category: data.category } });
          setRelatedProducts(res.data.filter(p => p._id !== data._id).slice(0, 10));
        } catch (e) { /* ignore */ }
      } catch (error) { console.error("Error fetching product:", error); }
    };
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${API}/reviews/${id}`);
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
      } catch (error) { console.error("Error fetching reviews:", error); }
    };
    fetchProduct();
    fetchReviews();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color first');
      return;
    }
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    const success = await addToCart({ ...product, selectedColor, selectedSize });
    if (success) toast.success(`${product.name} added to cart!`);
  };

  const handleOrderNow = async () => {
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color first');
      return;
    }
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    const success = await addToCart({ ...product, selectedColor, selectedSize });
    if (success) navigate('/checkout');
  };

  const handlePincodeCheck = () => {
    if (!pincode || pincode.length !== 6) { toast.error('Enter valid 6-digit pincode'); return; }
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4 + Math.floor(Math.random() * 3));
    setPincodeResult({
      available: true,
      date: deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }),
      cod: true,
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) { toast.error('Please login to write a review'); return; }
    try {
      await axios.post(`${API}/reviews/${id}`, reviewForm, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Review submitted! ⭐');
      setReviewForm({ rating: 5, title: '', comment: '' });
      const { data } = await axios.get(`${API}/reviews/${id}`);
      setReviews(data.reviews); setAvgRating(data.avgRating);
    } catch (error) { toast.error(error.response?.data?.message || 'Failed to submit review'); }
  };

  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} color="#f39c12" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="#f39c12" />);
      else stars.push(<FaRegStar key={i} color="#f39c12" />);
    }
    return stars;
  };

  return (
    <Container className="pt-4 pb-5">
      <Link className="btn btn-outline-dark my-3" to="/shop" style={{ borderRadius: '8px', fontWeight: 'bold' }}>← Back to Shop</Link>

      <Row>
        {/* LEFT — Product Image */}
        <Col lg={5}>
          <div className="d-flex align-items-center justify-content-center shadow-sm rounded"
            style={{ background: '#f5f5f5', height: '480px', padding: '30px', borderRadius: '16px', position: 'sticky', top: '100px' }}>
            <Image src={product.image} alt={product.name} fluid style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        </Col>

        {/* MIDDLE — Product Details */}
        <Col lg={4}>
          <h3 className="fw-bold mb-1">{product.name}</h3>
          <p className="text-muted mb-2">{product.brand}</p>

          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge bg="success" className="px-2 py-1 d-flex align-items-center gap-1">
              {(avgRating || product.rating || 0).toFixed(1)} <FaStar size={10} />
            </Badge>
            <span className="text-muted small">({reviews.length} Reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-3 pb-3" style={{ borderBottom: '1px solid #eee' }}>
            <span className="fw-bold" style={{ fontSize: '2rem', color: '#1a1a2e' }}>₹{product.price}</span>
            {product.mrp > product.price && <span className="ms-2 text-muted text-decoration-line-through fs-5">₹{product.mrp}</span>}
            {discount > 0 && <span className="ms-2 text-success fw-bold">{discount}% off</span>}
            <p className="text-muted small mb-0 mt-1">Inclusive of all taxes</p>
          </div>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-3">
              <p className="fw-bold mb-2">Color: <span className="fw-normal text-muted">{selectedColor}</span></p>
              <div className="d-flex gap-2">
                {product.colors.map((c, i) => {
                  const isOutOfStock = c.stock === 0;
                  return (
                    <div key={i} onClick={() => !isOutOfStock && setSelectedColor(c.name)} title={`${c.name} ${isOutOfStock ? '(Out of Stock)' : ''}`}
                      className="color-option"
                      style={{ 
                        width: 38, height: 38, borderRadius: '50%', backgroundColor: c.hex, 
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                        border: selectedColor === c.name ? '3px solid #1a1a2e' : '2px solid #ddd',
                        boxShadow: selectedColor === c.name ? '0 0 0 2px white, 0 0 0 4px #1a1a2e' : 'none',
                        opacity: isOutOfStock ? 0.3 : 1,
                        position: 'relative',
                        transition: 'all 0.2s' 
                      }}>
                      {isOutOfStock && (
                        <div style={{ position: 'absolute', top: '50%', left: '-2px', right: '-2px', height: '3px', background: '#e74c3c', transform: 'rotate(-45deg)' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-3">
              <p className="fw-bold mb-2">Size:</p>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <Button key={i} variant={selectedSize === s ? 'dark' : 'outline-dark'} size="sm"
                    onClick={() => setSelectedSize(s)}
                    style={{ borderRadius: '8px', minWidth: '50px', fontWeight: '600', padding: '8px 16px' }}>{s}</Button>
                ))}
              </div>
            </div>
          )}

          {/* Warranty */}
          {product.warranty && (
            <div className="d-flex align-items-center gap-2 mb-3 p-2 rounded" style={{ background: '#e8f5e9' }}>
              <FaShieldAlt color="#2e7d32" />
              <span className="small fw-bold" style={{ color: '#2e7d32' }}>{product.warranty}</span>
            </div>
          )}

          {/* Description */}
          <div className="mb-3 pb-3" style={{ borderBottom: '1px solid #eee' }}>
            <p className="fw-bold mb-1">Description</p>
            <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>{product.description}</p>
          </div>

          {/* Benefits */}
          {product.benefits?.length > 0 && (
            <div className="mb-3 pb-3" style={{ borderBottom: '1px solid #eee' }}>
              <p className="fw-bold mb-2">✅ Product Benefits</p>
              {product.benefits.map((b, i) => (
                <div key={i} className="d-flex align-items-start gap-2 mb-1">
                  <FaCheckCircle color="#27ae60" size={14} className="mt-1 flex-shrink-0" />
                  <span className="small">{b}</span>
                </div>
              ))}
            </div>
          )}

          {/* Specifications */}
          {product.specifications?.length > 0 && (
            <div className="mb-3">
              <p className="fw-bold mb-2">📋 Product Specifications</p>
              <div className="rounded overflow-hidden" style={{ border: '1px solid #eee' }}>
                {product.specifications.map((spec, i) => (
                  <div key={i} className="d-flex" style={{ borderBottom: i < product.specifications.length - 1 ? '1px solid #eee' : 'none' }}>
                    <div className="p-2 px-3 fw-bold small" style={{ width: '40%', background: '#f8f9fa' }}>{spec.key}</div>
                    <div className="p-2 px-3 small" style={{ width: '60%' }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Col>

        {/* RIGHT — Order Card */}
        <Col lg={3}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '100px', borderRadius: '14px' }}>
            <Card.Body className="p-3">
              <h5 className="fw-bold mb-1">₹{product.price}</h5>
              {discount > 0 && <small className="text-success fw-bold">You save ₹{product.mrp - product.price}</small>}

              <div className="my-3 d-flex align-items-center gap-2">
                {product.stock > 0
                  ? <Badge bg="success" className="px-2 py-1">In Stock</Badge>
                  : <Badge bg="danger" className="px-2 py-1">Out of Stock</Badge>}
                {product.stock > 0 && product.stock <= 10 && <small className="text-danger fw-bold">Only {product.stock} left!</small>}
              </div>

              {/* Pincode Check */}
              <div className="mb-3 pb-3" style={{ borderBottom: '1px solid #eee' }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-muted" />
                  <span className="fw-bold small">Delivery Details</span>
                </div>
                <div className="d-flex gap-2">
                  <Form.Control size="sm" placeholder="Enter Pincode" maxLength={6} value={pincode}
                    onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setPincodeResult(null); }}
                    style={{ borderRadius: '8px' }} />
                  <Button size="sm" variant="outline-dark" onClick={handlePincodeCheck}
                    style={{ borderRadius: '8px', whiteSpace: 'nowrap', fontWeight: '600' }}>Check</Button>
                </div>
                {pincodeResult && (
                  <div className="mt-2 p-2 rounded" style={{ background: '#e8f5e9' }}>
                    <div className="d-flex align-items-center gap-2">
                      <FaTruck color="#2e7d32" size={14} />
                      <small className="fw-bold" style={{ color: '#2e7d32' }}>Delivery by {pincodeResult.date}</small>
                    </div>
                    {pincodeResult.cod && (
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <FaMoneyBillWave color="#2e7d32" size={14} />
                        <small className="fw-bold" style={{ color: '#2e7d32' }}>Pay on Delivery available</small>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <Button className="w-100 mb-2 fw-bold py-2" variant="dark" disabled={product.stock === 0}
                onClick={handleAddToCart} style={{ borderRadius: '10px', fontSize: '1rem' }}>
                🛒 Add to Cart
              </Button>
              <Button className="w-100 fw-bold py-2" disabled={product.stock === 0}
                onClick={handleOrderNow}
                style={{ borderRadius: '10px', fontSize: '1rem', background: 'linear-gradient(135deg, #f39c12, #e74c3c)', border: 'none' }}>
                <FaBolt className="me-1" /> Order Now
              </Button>

              {/* Quick Benefits */}
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid #eee' }}>
                {[
                  { icon: <FaTruck />, text: 'Free Delivery on orders above ₹999' },
                  { icon: <FaUndo />, text: '7 Day Easy Returns' },
                  { icon: <FaShieldAlt />, text: '100% Genuine Product' },
                  { icon: <FaMoneyBillWave />, text: 'Cash on Delivery Available' },
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: '#555', fontSize: '0.85rem' }}>{item.icon}</span>
                    <small className="text-muted">{item.text}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col md={6}>
          <h4 className="fw-bold mb-3">Customer Reviews ({reviews.length})</h4>
          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((review) => (
              <Card key={review._id} className="mb-3 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: 36, height: 36, background: '#e9ecef', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        {review.user?.name?.[0] || '?'}
                      </div>
                      <strong>{review.user?.name}</strong>
                    </div>
                    <Badge bg="success" className="px-2 py-1 d-flex align-items-center gap-1">
                      {review.rating} <FaStar size={10} />
                    </Badge>
                  </div>
                  <h6 className="mt-2 mb-1">{review.title}</h6>
                  <p className="text-muted mb-1 small">{review.comment}</p>
                  <small className="text-muted">{new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

        <Col md={6}>
          <h4 className="fw-bold mb-3">Write a Review</h4>
          {token ? (
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Rating</Form.Label>
                    <Form.Select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}>
                      {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Title</Form.Label>
                    <Form.Control value={reviewForm.title} onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} required />
                  </Form.Group>
                  <Button type="submit" variant="dark" className="w-100 fw-bold">Submit Review</Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-muted"><Link to="/login">Sign in</Link> to write a review</p>
          )}
        </Col>
      </Row>

      {/* Customers Also Liked */}
      {relatedProducts.length > 0 && (
        <div className="mt-5 pt-4" style={{ borderTop: '2px solid #eee' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Customers Also Liked</h4>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm" className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }} onClick={() => scrollRelated('left')}>‹</Button>
              <Button variant="outline-secondary" size="sm" className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }} onClick={() => scrollRelated('right')}>›</Button>
            </div>
          </div>
          <div ref={relatedRef} className="d-flex overflow-auto pb-3" style={{ gap: '20px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {relatedProducts.map((p) => (
              <div key={p._id} style={{ flex: '0 0 auto', width: '280px' }}>
                <Product product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductScreen;