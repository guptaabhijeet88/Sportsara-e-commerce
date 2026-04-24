import { useState, useEffect } from 'react';
import { Modal, Button, Form, Tab, Tabs, Badge } from 'react-bootstrap';
import { FaCreditCard, FaMobile, FaUniversity, FaCheckCircle, FaShieldAlt, FaLock } from 'react-icons/fa';

const PaymentModal = ({ amount, onSuccess, onClose }) => {
  const [step, setStep] = useState(1); // 1: form, 2: processing, 3: success
  const [cardNumber, setCardNumber] = useState('4111 1111 1111 1111');
  const [cardName, setCardName] = useState('DEMO USER');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [upiId, setUpiId] = useState('user@upi');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { clearInterval(interval); return 100; }
          return prev + 4;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handlePay = () => {
    setStep(2);
    setProgress(0);
    setTimeout(() => {
      setStep(3);
      setTimeout(() => onSuccess(), 2500);
    }, 3000);
  };

  return (
    <Modal show={true} onHide={onClose} centered backdrop="static" size="md" className="payment-modal">
      <Modal.Header closeButton={step === 1} style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: 'white', border: 'none', borderRadius: '12px 12px 0 0' }}>
        <Modal.Title className="fw-bold d-flex align-items-center">
          <FaShieldAlt className="me-2" />
          {step === 1 ? 'Secure Payment' : step === 2 ? 'Processing...' : 'Payment Successful!'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {step === 1 && (
          <>
            <div className="text-center mb-4 p-3 rounded" style={{ background: '#f8f9fa' }}>
              <small className="text-muted d-block">Amount to Pay</small>
              <h2 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>₹{amount?.toLocaleString()}</h2>
              <div className="d-flex align-items-center justify-content-center gap-1">
                <FaLock size={10} className="text-success" />
                <small className="text-success fw-bold">Demo Payment — No real charges</small>
              </div>
            </div>

            <Tabs defaultActiveKey="card" className="mb-3 payment-tabs">
              <Tab eventKey="card" title={<span className="d-flex align-items-center"><FaCreditCard className="me-2" />Card</span>}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Cardholder Name</Form.Label>
                  <Form.Control value={cardName} onChange={(e) => setCardName(e.target.value)} className="rounded-3" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Card Number</Form.Label>
                  <Form.Control value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="rounded-3"
                    style={{ letterSpacing: '2px' }} />
                </Form.Group>
                <div className="d-flex gap-3">
                  <Form.Group className="flex-fill mb-3">
                    <Form.Label className="fw-bold small">Expiry</Form.Label>
                    <Form.Control value={expiry} onChange={(e) => setExpiry(e.target.value)} className="rounded-3" />
                  </Form.Group>
                  <Form.Group className="flex-fill mb-3">
                    <Form.Label className="fw-bold small">CVV</Form.Label>
                    <Form.Control type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} className="rounded-3" />
                  </Form.Group>
                </div>
                <div className="d-flex gap-2 mb-3 align-items-center">
                  <span className="badge px-3 py-2" style={{ background: '#1a237e', color: 'white', fontWeight: 'bold' }}>VISA</span>
                  <span className="badge px-3 py-2" style={{ background: '#ff5722', color: 'white', fontWeight: 'bold' }}>MasterCard</span>
                  <span className="badge px-3 py-2" style={{ background: '#2e7d32', color: 'white', fontWeight: 'bold' }}>RuPay</span>
                  <span className="badge px-3 py-2" style={{ background: '#0288d1', color: 'white', fontWeight: 'bold' }}>Amex</span>
                </div>
              </Tab>
              <Tab eventKey="upi" title={<span className="d-flex align-items-center"><FaMobile className="me-2" />UPI</span>}>
                <div className="text-center py-3">
                  <div style={{ width: 150, height: 150, background: '#f0f0f0', margin: '0 auto', borderRadius: 16, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc' }}>
                    <div style={{ width: 100, height: 100, background: 'repeating-conic-gradient(#333 0% 25%, #fff 0% 50%) 50% / 10px 10px',
                      borderRadius: 8 }}></div>
                  </div>
                  <p className="mt-3 text-muted mb-2 fw-bold">Scan with any UPI app</p>
                  <div className="d-flex gap-2 justify-content-center mb-3">
                    <span className="badge bg-light text-dark border px-2 py-1">GPay</span>
                    <span className="badge bg-light text-dark border px-2 py-1">PhonePe</span>
                    <span className="badge bg-light text-dark border px-2 py-1">Paytm</span>
                    <span className="badge bg-light text-dark border px-2 py-1">BHIM</span>
                  </div>
                  <Form.Control value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID"
                    className="text-center rounded-3" style={{ maxWidth: '250px', margin: '0 auto' }} />
                </div>
              </Tab>
              <Tab eventKey="netbanking" title={<span className="d-flex align-items-center"><FaUniversity className="me-2" />Net Banking</span>}>
                <div className="py-2">
                  <p className="fw-bold small mb-2">Popular Banks</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'BOB', 'Yes Bank'].map((bank) => (
                      <Button key={bank} variant="outline-secondary" size="sm" className="rounded-pill">{bank}</Button>
                    ))}
                  </div>
                  <Form.Select className="rounded-3">
                    <option>Other Banks — Select</option>
                    <option>Bank of India</option>
                    <option>Canara Bank</option>
                    <option>Indian Bank</option>
                    <option>Union Bank</option>
                  </Form.Select>
                </div>
              </Tab>
            </Tabs>

            <Button variant="dark" className="w-100 py-3 fw-bold mt-2" onClick={handlePay}
              style={{ fontSize: '1.1rem', borderRadius: '12px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
              <FaLock className="me-2" />Pay ₹{amount?.toLocaleString()}
            </Button>
            <p className="text-center text-muted mt-2 mb-0" style={{ fontSize: '0.75rem' }}>
              🔒 Secured by 256-bit SSL encryption
            </p>
          </>
        )}

        {step === 2 && (
          <div className="text-center py-5">
            <div className="position-relative d-inline-block mb-4">
              <div className="spinner-border text-primary" style={{ width: 80, height: 80, borderWidth: 4 }}></div>
              <div className="position-absolute top-50 start-50 translate-middle fw-bold" style={{ fontSize: '0.9rem' }}>
                {progress}%
              </div>
            </div>
            <h5 className="fw-bold">Processing your payment...</h5>
            <p className="text-muted mb-3">Verifying card details and processing transaction</p>
            <div className="mx-auto" style={{ maxWidth: '300px', height: 6, background: '#e9ecef', borderRadius: 3 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: 3, transition: 'width 0.1s' }} />
            </div>
            <small className="text-muted d-block mt-2">Please don't close this window</small>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-5">
            <div className="payment-success-icon mb-3">
              <FaCheckCircle size={90} color="#27ae60" />
            </div>
            <h3 className="fw-bold text-success mb-2">Payment Successful!</h3>
            <p className="text-muted mb-1">Transaction ID: SPORT_{Date.now().toString(36).toUpperCase()}</p>
            <p className="text-muted">Your order is being prepared for dispatch</p>
            <div className="d-flex justify-content-center gap-2 mt-3">
              <Badge bg="success" className="px-3 py-2">₹{amount?.toLocaleString()} Paid</Badge>
              <Badge bg="light" text="dark" className="px-3 py-2 border">Redirecting...</Badge>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
