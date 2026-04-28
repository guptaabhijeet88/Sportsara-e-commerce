import { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Product = ({ product }) => {
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const [fav, setFav] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('sport_favs') || '[]');
    return favs.includes(product._id);
  });
  const { addToCart } = useCart();

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('sport_favs') || '[]');
    let updated;
    if (fav) {
      updated = favs.filter(id => id !== product._id);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      updated = [...favs, product._id];
      toast.success('Added to wishlist! ❤️');
    }
    localStorage.setItem('sport_favs', JSON.stringify(updated));
    setFav(!fav);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Use the first size and color as default when adding directly from the product card
    const defaultSize = product.sizes?.length > 0 ? product.sizes[0] : undefined;
    const defaultColor = product.colors?.length > 0 ? product.colors[0].name : undefined;

    const productWithDefaults = {
      ...product,
      selectedSize: defaultSize,
      selectedColor: defaultColor,
    };

    const success = await addToCart(productWithDefaults);
    if (success) toast.success('Added to cart! 🛒');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} color="#f39c12" size={13} />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="#f39c12" size={13} />);
      else stars.push(<FaRegStar key={i} color="#f39c12" size={13} />);
    }
    return stars;
  };

  // Simulated review count based on rating
  const reviewCount = Math.floor((product.rating || 4) * 12 + (product.price % 37));

  return (
    <Card className="my-3 p-3 rounded h-100 shadow-sm border-0 product-card">
      <Link to={`/product/${product._id}`}>
        <div style={{ position: 'relative' }}>
          <Card.Img src={product.image} variant="top" loading="lazy" style={{ borderRadius: '8px' }} />
          {discount > 0 && (
            <Badge bg="danger" className="position-absolute" style={{ top: 10, right: 10, fontSize: '0.75rem' }}>
              {discount}% OFF
            </Badge>
          )}
          {product.featured && (
            <Badge bg="warning" text="dark" className="position-absolute" style={{ top: 10, left: 10, fontSize: '0.7rem' }}>
              ⭐ Featured
            </Badge>
          )}
        </div>
      </Link>

      <Card.Body className="d-flex flex-column p-0 pt-2">
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Title as="div" className="product-title">
            <strong style={{ fontSize: '1.05rem' }}>{product.name}</strong>
          </Card.Title>
        </Link>

        <small className="text-muted mb-1">{product.brand}</small>

        {/* Star Rating + Review Count */}
        <div className="d-flex align-items-center gap-1 mb-2">
          {renderStars(product.rating || 4)}
          <span className="text-muted ms-1" style={{ fontSize: '0.8rem' }}>{reviewCount}</span>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ color: '#1a1a2e', fontWeight: 'bold', fontSize: '1.3rem' }}>₹{product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <small className="text-muted text-decoration-line-through">MRP ₹{product.mrp}</small>
            )}
          </div>

          {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
            <small className="text-danger fw-bold d-block mb-2">Only {product.stock} left!</small>
          )}

          {/* Favourite + Add to Cart */}
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-secondary" size="sm" onClick={toggleFav}
              style={{ borderRadius: '8px', padding: '6px 10px', borderColor: '#ddd' }}>
              {fav ? <FaHeart color="#e74c3c" size={16} /> : <FaRegHeart size={16} />}
            </Button>
            <Button variant="outline-dark" size="sm" className="flex-grow-1 fw-bold" onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{ borderRadius: '8px', padding: '6px 12px' }}>
              <FaShoppingCart className="me-1" size={13} /> Add to cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;