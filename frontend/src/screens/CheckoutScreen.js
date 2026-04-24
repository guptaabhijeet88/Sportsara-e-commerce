import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, ListGroup, InputGroup } from 'react-bootstrap';
import { FaTruck, FaCreditCard, FaMoneyBill, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';
import axios from 'axios';
import API from '../utils/api';
import toast from 'react-hot-toast';

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", 
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", 
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", 
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const CheckoutScreen = () => {
  const { cartItems, cartTotal } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', area: '', city: '', state: '', pincode: '', phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const skipSuggestionFetch = useRef(false);

  useEffect(() => {
    const fetchPincodeData = async () => {
      if (address.pincode.length === 6 && /^\d+$/.test(address.pincode)) {
        setPincodeLoading(true);
        try {
          const { data } = await axios.get(`https://api.postalpincode.in/pincode/${address.pincode}`, { timeout: 6000 });
          if (data && data[0] && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            setAddress(prev => ({
              ...prev,
              city: prev.city || postOffice.District || postOffice.Block || postOffice.Name,
              state: prev.state || postOffice.State
            }));
            toast.success('City and State auto-filled!');
          }
        } catch (error) {
          console.error("Pincode fetch error", error);
        } finally {
          setPincodeLoading(false);
        }
      }
    };
    
    // Slight debounce for pincode to prevent instant multiple requests
    const timeoutId = setTimeout(() => fetchPincodeData(), 300);
    return () => clearTimeout(timeoutId);
  }, [address.pincode]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (skipSuggestionFetch.current) {
        skipSuggestionFetch.current = false;
        return;
      }
      
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      if (address.area.length > 2 && apiKey) {
        setSuggestionLoading(true);
        try {
          const { data } = await axios.post(
            'https://places.googleapis.com/v1/places:autocomplete',
            {
              input: address.area,
              includedRegionCodes: ['in'],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat,suggestions.placePrediction.text'
              }
            }
          );
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Google Maps API Error:", error.response?.data || error.message);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setSuggestionLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setSuggestionLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [address.area]);

  const handleSuggestionSelect = async (suggestion) => {
    const prediction = suggestion.placePrediction;
    if (!prediction) return;

    const fullAddressText = prediction.text?.text || prediction.structuredFormat?.mainText?.text;
    skipSuggestionFetch.current = true;
    setAddress(prev => ({ ...prev, area: fullAddressText }));
    setShowSuggestions(false);

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (apiKey && prediction.placeId) {
      try {
        const { data } = await axios.get(
          `https://places.googleapis.com/v1/places/${prediction.placeId}`,
          {
            headers: {
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': 'addressComponents,formattedAddress'
            }
          }
        );

        if (data) {
          let newCity = '';
          let newState = '';
          let newPincode = '';

          let locality = '';
          let admin2 = '';
          let admin3 = '';
          let sublocality = '';

          if (data.addressComponents) {
            data.addressComponents.forEach(component => {
              const types = component.types || [];
              if (types.includes('locality')) locality = component.longText;
              if (types.includes('administrative_area_level_3')) admin3 = component.longText;
              if (types.includes('administrative_area_level_2')) admin2 = component.longText;
              if (types.includes('sublocality') || types.includes('sublocality_level_1') || types.includes('neighborhood')) {
                if (!sublocality) sublocality = component.longText;
              }
              
              if (types.includes('administrative_area_level_1')) {
                newState = component.longText;
              }
              if (types.includes('postal_code')) {
                newPincode = component.longText;
              }
            });
          }

          newCity = locality || admin3 || admin2 || sublocality;

          // Normalize State to match Dropdown options
          if (newState) {
            const matchedState = INDIAN_STATES.find(s => newState.toLowerCase().includes(s.toLowerCase()));
            if (matchedState) {
              newState = matchedState;
            } else {
              // Clear it if it's in a regional language (e.g., 'महाराष्ट्र') so the fallback can extract the English name
              newState = '';
            }
          }

          // Fallback: Try to extract from the full prediction text and formatted address
          const fullText = prediction.text?.text || prediction.structuredFormat?.secondaryText?.text || '';
          
          if (!newCity || !newState || !newPincode) {
            const parts = fullText.split(',').map(s => s.trim());
            
            if (!newState) {
              const matchedState = INDIAN_STATES.find(stateName => 
                parts.some(p => p.toLowerCase().includes(stateName.toLowerCase()))
              );
              if (matchedState) {
                newState = matchedState;
              } else if (parts.length >= 2) {
                newState = parts[parts.length - 2]; 
                const fallbackMatch = INDIAN_STATES.find(s => newState.toLowerCase().includes(s.toLowerCase()));
                if (fallbackMatch) newState = fallbackMatch;
              }
            }

            if (!newCity) {
              if (parts.length >= 3) {
                newCity = parts[parts.length - 3]; 
              } else if (parts.length === 2) {
                newCity = parts[0]; 
              } else if (parts.length > 0) {
                newCity = parts[0];
              }
            }

            if (!newPincode) {
              // Try to find a 6-digit pincode anywhere in the full text or returned formatted address
              const searchString = fullText + ' ' + (data.formattedAddress || '');
              const pincodeMatch = searchString.match(/\b\d{6}\b/);
              if (pincodeMatch) {
                newPincode = pincodeMatch[0];
              }
            }
          }

          setAddress(prev => ({
            ...prev,
            city: newCity || '',
            state: newState || '',
            pincode: newPincode || ''
          }));
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    }
  };

  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;

  const validateAddress = () => {
    const { fullName, street, area, city, state, pincode, phone } = address;
    if (!fullName || !street || !area || !city || !state || !pincode || !phone) {
      toast.error('Please fill in all address fields'); return false;
    }
    if (!/^\d{6}$/.test(pincode)) { toast.error('Invalid pincode (6 digits)'); return false; }
    if (!/^\d{10}$/.test(phone)) { toast.error('Invalid phone (10 digits)'); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress()) return;
    if (cartItems.length === 0) { toast.error('Cart is empty'); return; }

    if (paymentMethod === 'online') {
      setShowPayment(true);
      return;
    }

    const fullAddress = {
      ...address,
      street: `${address.street}, ${address.area}`
    };

    // COD Order
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${API}/orders`, { shippingAddress: fullAddress }, { headers });
      toast.success('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally { setLoading(false); }
  };

  const handlePaymentSuccess = async () => {
    const fullAddress = {
      ...address,
      street: `${address.street}, ${address.area}`
    };
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const { data: paymentOrder } = await axios.post(`${API}/payment/create-order`, {}, { headers });
      await axios.post(`${API}/payment/verify`, {
        orderId: paymentOrder.orderId, shippingAddress: fullAddress,
      }, { headers });
      toast.success('Payment successful! Order placed! 🎉');
      navigate('/orders');
    } catch (error) {
      toast.error('Payment processing failed');
    }
    setShowPayment(false);
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <Container className="pt-4 pb-5">
      <h2 className="mb-4" style={{ fontWeight: 'bold' }}>🛒 Checkout</h2>
      <Row>
        <Col md={8}>
          {/* Shipping Address */}
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3"><FaTruck className="me-2" />Shipping Address</h5>
              <Row>
                <Col md={6}><Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Full Name</Form.Label>
                  <Form.Control value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                </Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Phone</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="fw-bold text-muted bg-light">+91</InputGroup.Text>
                    <Form.Control 
                      value={address.phone} 
                      onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} 
                      placeholder="10-digit number"
                      maxLength={10}
                    />
                  </InputGroup>
                </Form.Group></Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Flat, House no., Building, Company, Apartment</Form.Label>
                <Form.Control value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="e.g. 123, Silver Heights" />
              </Form.Group>
              <Form.Group className="mb-3 position-relative">
                <Form.Label className="fw-bold">Area, Street, Sector, Village {suggestionLoading && <span className="spinner-border spinner-border-sm text-primary ms-2" />}</Form.Label>
                <Form.Control 
                  value={address.area}
                  onChange={(e) => setAddress({ ...address, area: e.target.value })}
                  onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Start typing your area or sector..." 
                />
                {!process.env.REACT_APP_GOOGLE_MAPS_API_KEY && (
                  <Form.Text className="text-danger" style={{fontSize: '0.75rem'}}>
                    * Advanced Autocomplete disabled. Please add REACT_APP_GOOGLE_MAPS_API_KEY in .env
                  </Form.Text>
                )}
                {showSuggestions && suggestions.length > 0 && (
                  <ListGroup className="position-absolute w-100 shadow-sm" style={{ zIndex: 1000, maxHeight: '280px', overflowY: 'auto', top: '100%' }}>
                    {suggestions.map((item, idx) => {
                      const prediction = item.placePrediction;
                      if (!prediction) return null;
                      
                      const title = prediction.structuredFormat?.mainText?.text || prediction.text?.text?.split(',')[0];
                      const subtitle = prediction.structuredFormat?.secondaryText?.text || '';
                      
                      return (
                        <ListGroup.Item 
                          key={prediction.placeId || idx} 
                          action 
                          onMouseDown={() => handleSuggestionSelect(item)}
                          style={{ cursor: 'pointer' }}
                          className="d-flex align-items-center py-2"
                        >
                          <div className="bg-light rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{width: '36px', height: '36px'}}>
                            <FaMapMarkerAlt className="text-muted" />
                          </div>
                          <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
                            <div className="fw-bold text-dark text-truncate" style={{fontSize: '0.95rem'}}>{title}</div>
                            <div className="text-muted text-truncate" style={{fontSize: '0.8rem'}}>{subtitle}</div>
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </Form.Group>
              <Row>
                <Col md={4}><Form.Group className="mb-3">
                  <Form.Label className="fw-bold">City</Form.Label>
                  <Form.Control value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                </Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3">
                  <Form.Label className="fw-bold">State</Form.Label>
                  <Form.Select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Form.Select>
                </Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Pincode {pincodeLoading && <span className="spinner-border spinner-border-sm text-primary ms-2" />}</Form.Label>
                  <Form.Control 
                    value={address.pincode} 
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })} 
                    maxLength={6}
                    placeholder="6-digit Pincode" 
                  />
                  <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>Auto-fills City & State</Form.Text>
                </Form.Group></Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Payment Method */}
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Payment Method</h5>
              <div className="d-flex gap-3">
                <Button variant={paymentMethod === 'cod' ? 'dark' : 'outline-dark'} className="flex-fill py-3"
                  onClick={() => setPaymentMethod('cod')}>
                  <FaMoneyBill className="me-2" /> Cash on Delivery
                </Button>
                <Button variant={paymentMethod === 'online' ? 'dark' : 'outline-dark'} className="flex-fill py-3"
                  onClick={() => setPaymentMethod('online')}>
                  <FaCreditCard className="me-2" /> Pay Online
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '100px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={`${item._id}-${item.color || 'none'}-${item.size || 'none'}-${index}`} className="d-flex justify-content-between px-0">
                    <div>
                      <span>{item.name} × {item.qty}</span>
                      {(item.size || item.color) && (
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {item.size && <span className="me-2">Size: {item.size}</span>}
                          {item.color && <span>Color: <span style={{ background: item.color, width: 10, height: 10, borderRadius: '50%', display: 'inline-block', border: '1px solid #ccc' }}></span></span>}
                        </div>
                      )}
                    </div>
                    <strong>₹{item.price * item.qty}</strong>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Subtotal</span><strong>₹{cartTotal}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Shipping</span>
                  <strong className={shipping === 0 ? 'text-success' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between px-0 border-top pt-3">
                  <span className="fw-bold fs-5">Total</span>
                  <strong className="text-success fs-5">₹{total}</strong>
                </ListGroup.Item>
              </ListGroup>
              <Button variant="dark" className="w-100 mt-3 py-3 fw-bold" onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0} style={{ fontSize: '1.1rem', borderRadius: '10px' }}>
                {loading ? 'Placing Order...' : paymentMethod === 'online' ? 'Proceed to Pay' : 'Place Order'}
              </Button>
              {cartTotal < 999 && (
                <p className="text-muted text-center mt-2 small">Add ₹{999 - cartTotal} more for free shipping!</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showPayment && (
        <PaymentModal amount={total} onSuccess={handlePaymentSuccess} onClose={() => setShowPayment(false)} />
      )}
    </Container>
  );
};

export default CheckoutScreen;
