import React, { useState, useEffect } from 'react';

const AssetForm = ({ asset, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    assetName: '',
    assetType: 'Laptop',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    purchasePrice: 0,
    warrantyExpiry: '',
    status: 'In Stock',
    assignedTo: '',
    department: '',
    location: '',
    configurations: {
      processor: '',
      ram: '',
      storage: '',
      os: '',
      ipAddress: '',
      macAddress: ''
    },
    notes: ''
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        ...asset,
        purchaseDate: asset.purchaseDate ? asset.purchaseDate.split('T')[0] : '',
        warrantyExpiry: asset.warrantyExpiry ? asset.warrantyExpiry.split('T')[0] : '',
        configurations: { ...asset.configurations }
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6">{asset ? 'Edit Asset' : 'Add New Asset'}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Asset Name*</label>
              <input type="text" name="assetName" value={formData.assetName} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Asset Type*</label>
              <select name="assetType" value={formData.assetType} onChange={handleChange} className="form-select">
                {['Laptop', 'Desktop', 'Server', 'Mobile', 'Tablet', 'Networking', 'Peripheral', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Serial Number*</label>
              <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required className="form-input" />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Manufacturer</label>
              <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Model</label>
              <input type="text" name="model" value={formData.model} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-select">
                {['In Use', 'In Stock', 'Under Repair', 'Retired', 'Broken', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <h3 className="form-section-title">Assignments & Financials</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Assigned To</label>
              <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Purchase Date</label>
              <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Price</label>
              <input type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <h3 className="form-section-title">Technical Configuration</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Processor</label>
              <input type="text" name="configurations.processor" value={formData.configurations.processor} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">RAM</label>
              <input type="text" name="configurations.ram" value={formData.configurations.ram} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Storage</label>
              <input type="text" name="configurations.storage" value={formData.configurations.storage} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">IP Address</label>
              <input type="text" name="configurations.ipAddress" value={formData.configurations.ipAddress} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">MAC Address</label>
              <input type="text" name="configurations.macAddress" value={formData.configurations.macAddress} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">OS</label>
              <input type="text" name="configurations.os" value={formData.configurations.os} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Asset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;
