import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import Product from '../components/Product';
import axios from 'axios';
import API from '../utils/api';

const PRODUCTS_PER_PAGE = 12; // 3 rows × 4 cols

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState('');
  const prevRequest = useRef(0);

  const categories = ['All', 'Team Sports', 'Apparel', 'Footwear', 'Accessories', 'Fitness'];

  // Sync URL params to state on navigation
  useEffect(() => {
    const urlCategory = searchParams.get('category') || '';
    const urlSearch = searchParams.get('search') || '';
    if (urlCategory) setCategory(urlCategory);
    if (urlSearch) setSearch(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      const requestId = ++prevRequest.current;
      setLoading(true);
      try {
        const params = {};
        if (category && category !== 'All') params.category = category;
        if (search) params.search = search;
        if (sort) params.sort = sort;

        const { data } = await axios.get(`${API}/products`, { params });
        if (requestId === prevRequest.current) {
          setProducts(data);
          setVisibleCount(PRODUCTS_PER_PAGE); // Reset on new filter
          setLoading(false);
        }
      } catch (error) {
        console.error('Fetch products error:', error);
        if (requestId === prevRequest.current) setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [category, search, sort]);

  const handleCategoryClick = (cat) => {
    const newCat = cat === 'All' ? '' : cat;
    setCategory(newCat);
    setSearch('');
    const newParams = {};
    if (newCat) newParams.category = newCat;
    setSearchParams(newParams);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCategory('');
    const newParams = {};
    if (value) newParams.search = value;
    setSearchParams(newParams);
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;
  const remaining = products.length - visibleCount;

  return (
    <Container className="pt-4 pb-5">
      <h2 className="mb-4" style={{ fontWeight: 'bold' }}>🏪 Shop All Products</h2>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
        <div className="d-flex align-items-center flex-grow-1" style={{ maxWidth: '400px' }}>
          <FaSearch className="me-2 text-muted" />
          <Form.Control type="text" placeholder="Search products..." value={search}
            onChange={(e) => handleSearchChange(e.target.value)} className="border-0 shadow-sm" />
        </div>

        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}
          className="border-0 shadow-sm" style={{ maxWidth: '200px' }}>
          <option value="">Sort By</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A-Z</option>
        </Form.Select>
      </div>

      {/* Category buttons */}
      <div className="d-flex flex-wrap gap-2 mb-4 overflow-auto category-strip pb-2">
        {categories.map((cat) => (
          <Button key={cat} variant={category === cat || (!category && cat === 'All') ? 'dark' : 'outline-dark'}
            size="sm" onClick={() => handleCategoryClick(cat)}
            style={{ borderRadius: '20px', padding: '6px 18px', fontWeight: '600', whiteSpace: 'nowrap' }}>
            {cat}
          </Button>
        ))}
      </div>

      {/* Product count */}
      {!loading && products.length > 0 && (
        <p className="text-muted mb-3">
          Showing {visibleProducts.length} of {products.length} products
        </p>
      )}

      {/* Products Grid */}
      {loading ? (
        <Row>
          {[...Array(8)].map((_, i) => (
            <Col key={i} sm={12} md={6} lg={4} xl={3}>
              <div className="skeleton-card mb-4">
                <div className="skeleton-img"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
              </div>
            </Col>
          ))}
        </Row>
      ) : products.length > 0 ? (
        <>
          <Row>
            {visibleProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          {/* Show More Button */}
          {hasMore && (
            <div className="text-center mt-4 mb-3">
              <Button variant="outline-dark" size="lg" className="px-5 py-3 fw-bold"
                onClick={() => setVisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                style={{ borderRadius: '30px', fontSize: '1rem' }}>
                <FaChevronDown className="me-2" />
                Show More ({remaining} remaining)
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <h4 className="text-muted">No products found</h4>
          <p className="text-muted">Try adjusting your filters or search term</p>
          <Button variant="dark" onClick={() => { setCategory(''); setSearch(''); setSearchParams({}); }}>
            Show All Products
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ShopScreen;
