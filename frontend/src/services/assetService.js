import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/assets';

const assetService = {
  getAssets: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getAssetById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createAsset: async (assetData) => {
    const response = await axios.post(API_URL, assetData);
    return response.data;
  },

  updateAsset: async (id, assetData) => {
    const response = await axios.put(`${API_URL}/${id}`, assetData);
    return response.data;
  },

  deleteAsset: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  getAssetsByType: async (type) => {
    const response = await axios.get(`${API_URL}/type/${type}`);
    return response.data;
  },

  getAssetsByStatus: async (status) => {
    const response = await axios.get(`${API_URL}/status/${status}`);
    return response.data;
  }
};

export default assetService;
