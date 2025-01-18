import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PromoCode.css';

const PromoCodeManagement = ({ url }) => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    discount: '',
    expirationDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch Promo Codes from Backend
  useEffect(() => {
    const fetchPromoCodes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/api/promocode`);
        setPromoCodes(response.data);
      } catch (err) {
        setError('Failed to fetch promo codes. Please try again.');
        console.error('Error fetching promo codes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCodes();
  }, [url]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromoCode({ ...newPromoCode, [name]: value });
  };

  // Create Promo Code
  const handleCreatePromoCode = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${url}/api/promocode/create`, newPromoCode);
      setPromoCodes([...promoCodes, response.data.promoCode]);
      setNewPromoCode({ code: '', discount: '', expirationDate: '' });
    } catch (err) {
      setError('Failed to create promo code. Please try again.');
      console.error('Error creating promo code:', err);
    }
  };

  // Deactivate Promo Code
  const handleDeactivatePromoCode = async (code) => {
    setError('');
    try {
      await axios.delete(`${url}/api/promocode/deactivate`, { data: { code } });
      setPromoCodes(promoCodes.map((promo) =>
        promo.code === code ? { ...promo, isActive: false } : promo
      ));
    } catch (err) {
      setError('Failed to deactivate promo code. Please try again.');
      console.error('Error deactivating promo code:', err);
    }
  };

  return (
    <div className="promo-code-management">
      <h2>Promo Code Management</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}

      <form className="promo-code-form" onSubmit={handleCreatePromoCode}>
        <input
          type="text"
          name="code"
          placeholder="Promo Code"
          value={newPromoCode.code}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={newPromoCode.discount}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="expirationDate"
          value={newPromoCode.expirationDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={!newPromoCode.code || !newPromoCode.discount || !newPromoCode.expirationDate}>
          Create Promo Code
        </button>
      </form>

      <div className="promo-code-list">
        <h3>Existing Promo Codes</h3>
        {promoCodes.length === 0 && !loading && <p>No promo codes available.</p>}
        {promoCodes.map((promo) => (
          <div key={promo.code} className="promo-code-item">
            <p>Code: {promo.code}</p>
            <p>Discount: {promo.discount}%</p>
            <p>Expiration: {promo.expirationDate ? new Date(promo.expirationDate).toLocaleDateString() : 'N/A'}</p>
            <p>Status: {promo.isActive ? 'Active' : 'Inactive'}</p>
            {promo.isActive && (
              <button onClick={() => handleDeactivatePromoCode(promo.code)}>
                Deactivate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoCodeManagement;
