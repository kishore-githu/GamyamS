import { useState, useEffect } from 'react'

export default function ProductForm({ onSubmit, initialData, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: ''
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                price: initialData.price.toString(),
                stock: initialData.stock.toString()
            })
        }
    }, [initialData])

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.price) newErrors.price = 'Price is required'
        else if (isNaN(formData.price) || Number(formData.price) < 0) newErrors.price = 'Price must be a valid positive number'

        if (!formData.category.trim()) newErrors.category = 'Category is required'

        if (formData.stock !== '' && (isNaN(formData.stock) || Number(formData.stock) < 0)) {
            newErrors.stock = 'Stock must be a valid non-negative number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        onSubmit({
            ...formData,
            id: initialData?.id,
            price: Number(formData.price),
            stock: Number(formData.stock || 0)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>
                {initialData ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', borderColor: errors.name ? 'var(--danger)' : undefined }}
                />
                {errors.name && <div className="error-msg">{errors.name}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Price *</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        style={{ width: '100%', borderColor: errors.price ? 'var(--danger)' : undefined }}
                    />
                    {errors.price && <div className="error-msg">{errors.price}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        value={formData.stock}
                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                        style={{ width: '100%', borderColor: errors.stock ? 'var(--danger)' : undefined }}
                    />
                    {errors.stock && <div className="error-msg">{errors.stock}</div>}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', borderColor: errors.category ? 'var(--danger)' : undefined }}
                >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Sports">Sports</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                </select>
                {errors.category && <div className="error-msg">{errors.category}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                />
            </div>

            <div className="flex-between" style={{ marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </form>
    )
}
