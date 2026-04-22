import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  assetName: {
    type: String,
    required: true,
    trim: true
  },
  assetType: {
    type: String,
    required: true,
    enum: ['Laptop', 'Desktop', 'Server', 'Mobile', 'Tablet', 'Networking', 'Peripheral', 'Other']
  },
  manufacturer: String,
  model: String,
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  purchaseDate: Date,
  purchasePrice: {
    type: Number,
    min: 0
  },
  warrantyExpiry: Date,
  status: {
    type: String,
    required: true,
    enum: ['In Use', 'In Stock', 'Under Repair', 'Retired', 'Broken', 'Lost'],
    default: 'In Stock'
  },
  assignedTo: String,
  department: String,
  location: String,
  configurations: {
    processor: String,
    ram: String,
    storage: String,
    os: String,
    ipAddress: String,
    macAddress: String
  },
  notes: String
}, {
  timestamps: true
});

// Indexes
assetSchema.index({ assetName: 1, serialNumber: 1 });

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
