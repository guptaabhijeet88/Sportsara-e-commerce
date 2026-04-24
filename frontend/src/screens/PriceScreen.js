import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import axios from 'axios';
import API from '../utils/api';

const PriceScreen = () => {
  const { maxPrice } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const { data } = await axios.get(`${API}/products`, { params: { maxPrice } });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    };
    fetchFilteredProducts();
  }, [maxPrice]);

  return (
    <Container className="pt-5 pb-5">
      <Link className='btn btn-outline-dark mb-4' to='/' style={{ borderRadius: '8px', fontWeight: 'bold' }}>
        ← Go Back Home
      </Link>

      <h2 className="mb-4" style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Products Under ₹{maxPrice}
      </h2>

      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <div className="text-center py-5 w-100">
            <h4 className="text-muted">No products found in this price range.</h4>
            <Link to="/shop" className="btn btn-dark mt-3">Explore All Products</Link>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default PriceScreen;