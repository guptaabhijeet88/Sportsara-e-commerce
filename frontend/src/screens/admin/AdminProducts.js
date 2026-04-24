import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Badge, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', mrp: '', category: 'Team Sports', brand: '', image: '', stock: '', rating: 4, featured: false, sizes: '', colors: '' });
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/admin/products`, { headers });
      setProducts(data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Smart Auto-Categorization based on product name
  useEffect(() => {
    if (editing) return; // Skip if editing existing
    const n = form.name.toLowerCase();
    let autoCat = form.category;

    if (n.includes('shoe') || n.includes('sneaker') || n.includes('cleat') || n.includes('boot')) autoCat = 'Footwear';
    else if (n.includes('shirt') || n.includes('tshirt') || n.includes('t-shirt') || n.includes('jersey') || n.includes('pant') || n.includes('short')) autoCat = 'Apparel';
    else if (n.includes('ball') || n.includes('bat') || n.includes('racket') || n.includes('glove') || n.includes('pad')) autoCat = 'Team Sports';
    else if (n.includes('dumbell') || n.includes('mat') || n.includes('band') || n.includes('weight') || n.includes('fitness')) autoCat = 'Fitness';
    else if (n.includes('bag') || n.includes('bottle') || n.includes('cap') || n.includes('sock')) autoCat = 'Accessories';

    if (autoCat !== form.category) setForm(prev => ({ ...prev, category: autoCat }));
  }, [form.name, editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (typeof payload.sizes === 'string') {
        payload.sizes = payload.sizes.split(',').map(s => s.trim()).filter(s => s);
      }
      if (typeof payload.colors === 'string') {
        payload.colors = payload.colors.split(',').map(c => {
          const val = c.trim();
          const isHex = val.startsWith('#');
          return { name: isHex ? 'Color' : val, hex: isHex ? val : val.toLowerCase(), stock: payload.stock || 10 };
        }).filter(c => c.hex);
      }

      if (editing) {
        await axios.put(`${API}/admin/products/${editing}`, payload, { headers });
        toast.success('Product updated! ✅');
      } else {
        await axios.post(`${API}/admin/products`, payload, { headers });
        toast.success('Product created! ✅');
      }
      setShowModal(false); setEditing(null);
      setForm({ name: '', description: '', price: '', mrp: '', category: 'Team Sports', brand: '', image: '', stock: '', rating: 4, featured: false, sizes: '', colors: '' });
      fetchProducts();
    } catch (e) { toast.error(e.response?.data?.message || 'Error'); }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await axios.post(`${API}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      const baseUrl = API.split('/api')[0];
      setForm({ ...form, image: `${baseUrl}${data}` });
      toast.success('Image Uploaded Successfully');
    } catch (error) {
      console.error(error);
      toast.error('Image Upload Failed');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (p) => {
    setEditing(p._id);
    setForm({ 
      name: p.name, description: p.description, price: p.price, mrp: p.mrp, 
      category: p.category, brand: p.brand, image: p.image, stock: p.stock, 
      rating: p.rating, featured: p.featured,
      sizes: p.sizes?.join(', ') || '',
      colors: p.colors?.map(c => c.hex).join(', ') || '' 
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${API}/admin/products/${id}`, { headers });
      toast.success('Product deleted');
      fetchProducts();
    } catch (e) { toast.error('Failed to delete'); }
  };

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">📦 Products</h2>
        <Button variant="dark" onClick={() => { setEditing(null); setForm({ name: '', description: '', price: '', mrp: '', category: 'Team Sports', brand: '', image: '', stock: '', rating: 4, featured: false }); setShowModal(true); }}>
          <FaPlus className="me-2" />Add Product
        </Button>
      </div>

      <Table responsive hover className="shadow-sm bg-white rounded">
        <thead className="table-dark"><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Featured</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td><img src={p.image} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }} /></td>
              <td className="fw-bold">{p.name}</td>
              <td><Badge bg="secondary">{p.category}</Badge></td>
              <td>₹{p.price}</td>
              <td><Badge bg={p.stock < 15 ? 'danger' : 'success'}>{p.stock}</Badge></td>
              <td>{p.featured ? '⭐' : '-'}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(p)}><FaEdit /></Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>{editing ? 'Edit Product' : 'Add Product'}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-3"><Form.Label>Brand</Form.Label><Form.Control value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required /></Form.Group></Col>
            </Row>
            <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></Form.Group>
            <Row>
              <Col md={4}><Form.Group className="mb-3"><Form.Label>Price (₹)</Form.Label><Form.Control type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></Form.Group></Col>
              <Col md={4}><Form.Group className="mb-3"><Form.Label>MRP (₹)</Form.Label><Form.Control type="number" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })} required /></Form.Group></Col>
              <Col md={4}><Form.Group className="mb-3"><Form.Label>Stock</Form.Label><Form.Control type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required /></Form.Group></Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sizes (Comma separated)</Form.Label>
                  <Form.Control placeholder="e.g. S, M, L, XL or 8, 9, 10" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Colors (Hex codes or names, Comma separated)</Form.Label>
                  <Form.Control placeholder="e.g. #ff0000, #00ff00, black" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category <Badge bg="info" className="ms-2">Auto-detects</Badge></Form.Label>
                  <Form.Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {['Team Sports', 'Apparel', 'Footwear', 'Accessories', 'Fitness'].map((c) => <option key={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={uploadFileHandler} className="mb-2" />
                  <Form.Control value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required placeholder="Or paste image URL here..." />
                  {uploading && <div className="text-center small text-primary mt-1">Uploading...</div>}
                </Form.Group>
                {form.image && (
                  <div className="text-center mb-3 p-2 border rounded" style={{ background: '#f8f9fa' }}>
                    <p className="small text-muted mb-1">Image Preview</p>
                    <img src={form.image} alt="Preview" style={{ maxHeight: '100px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} onLoad={(e) => { e.target.style.display = 'inline-block'; }} />
                  </div>
                )}
              </Col>
            </Row>
            <Form.Check type="switch" label="Featured Product" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="mb-3" />
            <Button type="submit" variant="dark" className="w-100 py-2 fw-bold">{editing ? 'Update Product' : 'Create Product'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminProducts;
