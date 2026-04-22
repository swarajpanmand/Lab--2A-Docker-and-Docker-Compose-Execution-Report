import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';

const AssetTable = ({ assets, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'In Use': return 'status-in-use';
      case 'In Stock': return 'status-in-stock';
      case 'Under Repair': return 'status-repair';
      case 'Retired': return 'status-retired';
      case 'Broken': case 'Lost': return 'status-broken';
      default: return '';
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Type</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No assets found.</td>
            </tr>
          ) : (
            assets.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <div className="asset-name">{asset.assetName}</div>
                  <div className="asset-meta">{asset.manufacturer} {asset.model}</div>
                </td>
                <td>{asset.assetType}</td>
                <td>{asset.serialNumber}</td>
                <td>
                  <span className={`badge ${getStatusClass(asset.status)}`}>
                    {asset.status}
                  </span>
                </td>
                <td>
                  {asset.assignedTo || 'Unassigned'}
                </td>
                <td className="actions">
                  <button onClick={() => onEdit(asset)} className="btn-icon text-indigo">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => onDelete(asset._id)} className="btn-icon text-red">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
