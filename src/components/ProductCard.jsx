import { Edit2 } from 'lucide-react'

export default function ProductCard({ product, onEdit }) {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span className="badge" style={{ backgroundColor: 'var(--bg-tertiary)' }}>{product.category}</span>
                <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1 }}>
                {product.description}
            </p>

            <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>${product.price}</div>
                <button className="btn btn-secondary btn-icon" onClick={() => onEdit(product)}>
                    <Edit2 size={16} />
                </button>
            </div>
        </div>
    )
}
