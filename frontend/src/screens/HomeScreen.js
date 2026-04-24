import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Carousel, Card, Container, Image, Button } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import API from '../utils/api';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [hitArrival, setHitArrival] = useState([]);
  const [hotPicks, setHotPicks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const scrollRefArrivals = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollArrivals = (direction) => {
    if (scrollRefArrivals.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRefArrivals.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API}/products`);

        const footballGear = data.filter(item => item.name.includes('Football'));
        const newArrivals = data.filter(item => item.category === 'Team Sports' && !item.name.includes('Football'));
        const trendingPicks = data.filter(item => item.category !== 'Team Sports');
        const featuredItems = data.filter(item => item.featured);

        const rotateArray = (arr, offset) => {
          if (arr.length === 0) return arr;
          const shift = offset % arr.length;
          return [...arr.slice(shift), ...arr.slice(0, shift)];
        };

        const periodOffset = Math.floor(Date.now() / (12 * 60 * 60 * 1000));

        setProducts(footballGear);
        setHitArrival(newArrivals);
        setHotPicks(rotateArray(trendingPicks, periodOffset).slice(0, 10));
        setFeatured(rotateArray(featuredItems, periodOffset));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  // Each category strip item maps to a search/category filter on the Shop page
  const topCategories = [
    { name: 'T-shirts', image: '/images/tshirts.png', search: 'T-Shirt' },
    { name: 'Running Shoes', image: '/images/running-shoes.png', search: 'Shoes' },
    { name: 'Cricket Gear', image: '/images/cricket-gear.png', search: 'Cricket' },
    { name: 'Pants', image: '/images/pants.png', search: 'Pants' },
    { name: 'Kids cycle', image: '/images/kids-cycle.png', search: 'Cycle' },
    { name: 'Jackets', image: '/images/jackets.png', search: 'Jacket' },
    { name: 'Yoga Mats', image: '/images/yoga-mats.png', search: 'Yoga' },
    { name: 'Swim Essentials', image: '/images/swim.png', search: 'Swim' },
  ];

  return (
    <div className="homepage-wrapper">
      {/* 1. QUICK CATEGORY STRIP — each navigates to filtered shop */}
      <Container className="pt-4 pb-3">
        <div className="d-flex justify-content-between overflow-auto category-strip">
          {topCategories.map((cat, index) => (
            <div key={index} className="category-item text-center mx-3" style={{ minWidth: '120px', cursor: 'pointer' }}
              onClick={() => navigate(`/shop?search=${encodeURIComponent(cat.search)}`)}>
              <div className="category-img-box d-flex align-items-center justify-content-center p-2 mb-2 shadow-sm"
                style={{ backgroundColor: '#e9ecef', borderRadius: '16px', height: '110px', width: '110px', margin: '0 auto' }}>
                <Image src={cat.image} alt={cat.name} fluid style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#444' }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* 2. TOP CAROUSEL */}
      <Carousel pause="hover" className="mb-5 shadow-sm">
        <Carousel.Item>
          <Image className="d-block w-100" src="/images/banner1.jpg" alt="First slide" />
          <Carousel.Caption>
            <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '10px', padding: '15px', display: 'inline-block' }}>
              <h2 style={{ fontWeight: 'bold', margin: 0 }}>Premium Training Gear</h2>
              <p style={{ margin: 0 }}>Built for the toughest hard ground conditions.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100" src="/images/banner2.jpg" alt="Second slide" />
          <Carousel.Caption>
            <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '10px', padding: '15px', display: 'inline-block' }}>
              <h2 style={{ fontWeight: 'bold', margin: 0 }}>Hit the Pavement</h2>
              <p style={{ margin: 0 }}>Upgrade your daily 5K road runs with our new footwear collection.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        {/* 3. FEATURED PRODUCTS */}
        {featured.length > 0 && (
          <>
            <h2 className="text-center mb-4" style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>⭐ Featured Products</h2>
            <Row className="mb-5">
              {featured.slice(0, 4).map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* 4. SHOP BY CATEGORY — each navigates to filtered shop */}
        <h2 className="text-center mb-2" style={{ fontWeight: '900', letterSpacing: '-0.5px', fontSize: '2.5rem' }}>Explore Categories</h2>
        <p className="text-center text-muted mb-5">Find exactly what you need to elevate your game</p>
        <Row className="mb-5">
          {[
            { name: 'Team Sports', subtitle: 'Gear up for the match', icon: '⚽', gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
            { name: 'Footwear', subtitle: 'Shoes for every terrain', icon: '👟', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
            { name: 'Fitness', subtitle: 'Weights & accessories', icon: '💪', gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },
            { name: 'Apparel', subtitle: 'Performance clothing', icon: '👕', gradient: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)' },
            { name: 'Accessories', subtitle: 'Bags, bottles & more', icon: '🎒', gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
          ].map((cat, i) => (
            <Col key={i} xs={12} sm={6} lg className="mb-4">
              <Card 
                className="border-0 shadow-sm category-card h-100" 
                style={{ 
                  cursor: 'pointer', 
                  borderRadius: '20px', 
                  background: cat.gradient,
                  color: 'white',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '8rem', opacity: '0.15', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
                  {cat.icon}
                </div>
                <Card.Body className="p-4 d-flex flex-column justify-content-between" style={{ minHeight: '180px', position: 'relative', zIndex: 2 }}>
                  <div className="mb-3" style={{ fontSize: '2rem', background: 'rgba(255,255,255,0.2)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', backdropFilter: 'blur(5px)' }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 'bold', margin: 0, fontSize: '1.25rem', letterSpacing: '0.5px' }}>{cat.name}</h5>
                    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>{cat.subtitle}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 5. HOT PICKS */}
        <h2 className="mt-5 mb-4" style={{ fontWeight: 'bold' }}>Hot Picks for you 🌟</h2>
        <div className="position-relative">
          <Button variant="light" className="rounded-circle shadow"
            style={{ position: 'absolute', top: '40%', left: '-20px', transform: 'translateY(-50%)', zIndex: 10, width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => scroll('left')}>
            ‹
          </Button>

          <div className="d-flex overflow-auto category-strip pb-4 mb-5"
            style={{ gap: '20px', outline: 'none' }} ref={scrollRef} tabIndex="0">
            {hotPicks.map((product) => (
              <div key={product._id} style={{ width: '280px', flex: '0 0 auto' }}>
                <Product product={product} />
              </div>
            ))}
          </div>

          <Button variant="light" className="rounded-circle shadow"
            style={{ position: 'absolute', top: '40%', right: '-20px', transform: 'translateY(-50%)', zIndex: 10, width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => scroll('right')}>
            ›
          </Button>
        </div>

        {/* 6. MAIN PRODUCTS GRID */}
        <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Latest Footballs ⚽</h2>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>

        <h2 className="mt-5 mb-4" style={{ fontWeight: 'bold' }}>Hit Arrivals 🔥</h2>
        <div className="position-relative">
          <Button variant="light" className="rounded-circle shadow"
            style={{ position: 'absolute', top: '40%', left: '-20px', transform: 'translateY(-50%)', zIndex: 10, width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => scrollArrivals('left')}>
            ‹
          </Button>

          <div className="d-flex overflow-auto category-strip pb-4 mb-5"
            style={{ gap: '20px', outline: 'none' }} ref={scrollRefArrivals} tabIndex="0">
            {hitArrival.map((product) => (
              <div key={product._id} style={{ width: '280px', flex: '0 0 auto' }}>
                <Product product={product} />
              </div>
            ))}
          </div>

          <Button variant="light" className="rounded-circle shadow"
            style={{ position: 'absolute', top: '40%', right: '-20px', transform: 'translateY(-50%)', zIndex: 10, width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => scrollArrivals('right')}>
            ›
          </Button>
        </div>

        {/* 7. BOTTOM PROMO CAROUSEL */}
        <Carousel pause="hover" className="mt-5 mb-5 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <Carousel.Item><Image className="d-block w-100" src="/images/gym-banner.jpg" alt="Promo 1" /></Carousel.Item>
          <Carousel.Item><Image className="d-block w-100" src="/images/bottom-banner2.jpg" alt="Promo 2" /></Carousel.Item>
          <Carousel.Item><Image className="d-block w-100" src="/images/bottom-banner3.jpg" alt="Promo 3" /></Carousel.Item>
          <Carousel.Item><Image className="d-block w-100" src="/images/bottom-banner4.jpg" alt="Promo 4" /></Carousel.Item>
        </Carousel>

        {/* 8. SHOP BY PRICE */}
        <h2 className="mt-5 mb-4 text-center" style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Shop by Price</h2>
        <Row className="mb-5">
          {[
            { label: '499', range: 499, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { label: '999', range: 999, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { label: '1,499', range: 1499, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { label: '1,999', range: 1999, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
          ].map((rangeItem, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="mb-4">
              <Card className="border-0 shadow-sm category-card h-100"
                style={{ cursor: 'pointer', minHeight: '280px', borderRadius: '16px', background: rangeItem.gradient, color: 'white' }}
                onClick={() => navigate(`/price/${rangeItem.range}`)}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
                  <h3 style={{ fontWeight: '400', fontSize: '1.8rem', marginBottom: '10px', letterSpacing: '1px' }}>UNDER</h3>
                  <p style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 20px 0', lineHeight: 1 }}>₹{rangeItem.label}</p>
                  <Button variant="light" size="sm" style={{ fontWeight: 'bold', borderRadius: '20px', padding: '8px 20px' }}>Explore More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <div className="text-center py-5 mb-5" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: '20px', color: 'white' }}>
          <h2 className="fw-bold mb-3">Ready to Level Up Your Game? 🚀</h2>
          <p className="mb-4" style={{ fontSize: '1.1rem', color: '#ccc' }}>Browse our entire collection of premium sports gear</p>
          <Button variant="light" size="lg" className="fw-bold px-5 py-3" style={{ borderRadius: '30px' }}
            onClick={() => navigate('/shop')}>
            Shop Now →
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomeScreen;