import express from 'express';
import Asset from '../models/Asset.js';

const router = express.Router();

// GET all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter by type (Must be before :id routes)
router.get('/type/:assetType', async (req, res) => {
  try {
    const assets = await Asset.find({ assetType: req.params.assetType });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter by status (Must be before :id routes)
router.get('/status/:status', async (req, res) => {
  try {
    const assets = await Asset.find({ status: req.params.status });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET asset by ID
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create asset
router.post('/', async (req, res) => {
  const asset = new Asset(req.body);
  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Serial number already exists' });
    }
    res.status(400).json({ message: error.message });
  }
});

// PUT update asset
router.put('/:id', async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAsset) return res.status(404).json({ message: 'Asset not found' });
    res.json(updatedAsset);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Serial number already exists' });
    }
    res.status(400).json({ message: error.message });
  }
});

// DELETE asset
router.delete('/:id', async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
