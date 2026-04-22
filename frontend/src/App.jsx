import React, { useState, useEffect } from 'react';
import assetService from './services/assetService';
import Dashboard from './components/Dashboard';
import AssetTable from './components/AssetTable';
import AssetForm from './components/AssetForm';
import { Plus, Search, Filter } from 'lucide-react';

function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await assetService.getAssets();
      setAssets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch assets. Please check if backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = () => {
    setEditingAsset(null);
    setIsFormOpen(true);
  };

  const handleEditAsset = (asset) => {
    setEditingAsset(asset);
    setIsFormOpen(true);
  };

  const handleDeleteAsset = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await assetService.deleteAsset(id);
        setAssets(assets.filter(a => a._id !== id));
      } catch (err) {
        alert('Failed to delete asset');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingAsset) {
        await assetService.updateAsset(editingAsset._id, formData);
      } else {
        await assetService.createAsset(formData);
      }
      setIsFormOpen(false);
      fetchAssets();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving asset');
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-container">
      <div className="max-w-7xl mx-auto">
        <header>
          <div>
            <h1>IT Asset Management</h1>
            <p className="subtitle">Track and manage company hardware</p>
          </div>
          <button 
            onClick={handleAddAsset}
            className="btn-primary"
          >
            <Plus size={20} />
            Add Asset
          </button>
        </header>

        {loading ? (
          <div className="text-center py-20">Loading assets...</div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-8">{error}</div>
        ) : (
          <>
            <Dashboard assets={assets} />

            <div className="filters-bar">
              <div className="search-box">
                <Search className="search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or serial..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-select-group">
                <Filter size={18} className="text-gray-400" />
                <select 
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="In Use">In Use</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Under Repair">Under Repair</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
            </div>

            <AssetTable 
              assets={filteredAssets} 
              onEdit={handleEditAsset} 
              onDelete={handleDeleteAsset} 
            />
          </>
        )}

        {isFormOpen && (
          <AssetForm 
            asset={editingAsset} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
