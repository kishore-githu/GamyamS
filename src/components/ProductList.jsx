import { Edit2 } from 'lucide-react'

export default function ProductList({ products, onEdit }) {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <div style={{ fontWeight: 500 }}>{product.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{product.description}</div>
                            </td>
                            <td>
                                <span className="badge" style={{ backgroundColor: 'var(--bg-tertiary)' }}>{product.category}</span>
                            </td>
                            <td style={{ fontWeight: 600 }}>${product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </td>
                            <td>
                                <button className="btn btn-secondary btn-icon" onClick={() => onEdit(product)}>
                                    <Edit2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
