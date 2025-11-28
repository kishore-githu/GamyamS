import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
    return (
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
                type="text"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ paddingLeft: '2.5rem', width: '100%' }}
            />
        </div>
    )
}
