// import { useState, useMemo, useEffect } from 'react'
// import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react'
// import productsData from './data/products.json'
// import { useDebounce } from './hooks/useDebounce'
// import ProductList from './components/ProductList'
// import ProductCard from './components/ProductCard'
// import ProductForm from './components/ProductForm'
// import SearchBar from './components/SearchBar'
// import Pagination from './components/Pagination'

// function App() {
//   const [products, setProducts] = useState([])
//   const [viewMode, setViewMode] = useState('list')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [editingProduct, setEditingProduct] = useState(null)

//   const ITEMS_PER_PAGE = 10
//   const debouncedSearch = useDebounce(searchQuery, 500)
//   const API_URL = 'https://mocki.io/v1/116ff739-3e87-4c0a-8cab-f2dfdc5377c4'

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(API_URL)
//       const data = await response.json()
//       setProducts(data)
//     } catch (error) {
//       console.error('Error fetching products:', error)
//     }
//   }

//   const filteredProducts = useMemo(() => {
//     if (!debouncedSearch) return products
//     return products.filter(product =>
//       product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
//     )
//   }, [products, debouncedSearch])

//   const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

//   const currentProducts = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE
//     return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
//   }, [filteredProducts, currentPage, ITEMS_PER_PAGE])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [debouncedSearch])

//   const handleAddProduct = async (newProduct) => {
//     const product = {
//       ...newProduct,
//       createdAt: new Date().toISOString(),
//       isActive: true,
//       tags: []
//     }

//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(product),
//       })
//       const savedProduct = await response.json()
//       setProducts([savedProduct, ...products])
//       setIsModalOpen(false)
//     } catch (error) {
//       console.error('Error adding product:', error)
//     }
//   }

//   const handleUpdateProduct = async (updatedProduct) => {
//     try {
//       const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedProduct),
//       })
//       const savedProduct = await response.json()
//       setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p))
//       setIsModalOpen(false)
//       setEditingProduct(null)
//     } catch (error) {
//       console.error('Error updating product:', error)
//     }
//   }

//   const openAddModal = () => {
//     setEditingProduct(null)
//     setIsModalOpen(true)
//   }

//   const openEditModal = (product) => {
//     setEditingProduct(product)
//     setIsModalOpen(true)
//   }

//   return (
//     <div className="container">
//       <header className="header flex-between">
//         <h1 className="title">Product Dashboard</h1>
//         <button className="btn btn-primary" onClick={openAddModal}>
//           <Plus size={20} />
//           Add Product
//         </button>
//       </header>

//       <div className="controls flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//         <SearchBar value={searchQuery} onChange={setSearchQuery} />

//         <div className="view-toggle flex-gap">
//           <button
//             className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
//             onClick={() => setViewMode('list')}
//             title="List View"
//           >
//             <ListIcon size={20} />
//           </button>
//           <button
//             className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
//             onClick={() => setViewMode('grid')}
//             title="Grid View"
//           >
//             <LayoutGrid size={20} />
//           </button>
//         </div>
//       </div>

//       <div className="content">
//         {currentProducts.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
//             No products found.
//           </div>
//         ) : (
//           <>
//             {viewMode === 'list' ? (
//               <ProductList products={currentProducts} onEdit={openEditModal} />
//             ) : (
//               <div className="grid-view">
//                 {currentProducts.map(product => (
//                   <ProductCard key={product.id} product={product} onEdit={openEditModal} />
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       )}

//       {isModalOpen && (
//         <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <ProductForm
//               onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
//               initialData={editingProduct}
//               onCancel={() => setIsModalOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App


import { useState, useMemo, useEffect } from 'react'
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react'
import productsData from './data/products.json'
import { useDebounce } from './hooks/useDebounce'
import ProductList from './components/ProductList'
import ProductCard from './components/ProductCard'
import ProductForm from './components/ProductForm'
import SearchBar from './components/SearchBar'
import Pagination from './components/Pagination'

function App() {
  const [products, setProducts] = useState([])
  const [viewMode, setViewMode] = useState('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const ITEMS_PER_PAGE = 10
  const debouncedSearch = useDebounce(searchQuery, 500)
  const API_URL = 'https://mocki.io/v1/116ff739-3e87-4c0a-8cab-f2dfdc5377c4'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(API_URL)
      const data = await response.json()
      
      // Handle different possible response structures
      let productsArray = []
      
      if (Array.isArray(data)) {
        productsArray = data
      } else if (data && Array.isArray(data.products)) {
        productsArray = data.products
      } else if (data && typeof data === 'object') {
        // If it's a single product object, wrap it in an array
        productsArray = [data]
      }
      
      console.log('Fetched products:', productsArray) // Debug log
      setProducts(productsArray)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to fetch products')
      // Fallback to local data
      setProducts(productsData || [])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return products
    return products.filter(product =>
      product && product.name && product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [products, debouncedSearch])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const currentProducts = useMemo(() => {
    // Ensure filteredProducts is an array before calling slice
    if (!Array.isArray(filteredProducts)) {
      console.warn('filteredProducts is not an array:', filteredProducts)
      return []
    }
    
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage, ITEMS_PER_PAGE])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  const handleAddProduct = async (newProduct) => {
    const product = {
      ...newProduct,
      id: Date.now().toString(), // Generate unique ID
      createdAt: new Date().toISOString(),
      isActive: true,
      tags: []
    }

    try {
      // For mock API, we'll just update local state
      // In a real app, you'd wait for API response
      setProducts([product, ...products])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      // For mock API, we'll just update local state
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Loading products...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--error)' }}>
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="header flex-between">
        <h1 className="title">Product Dashboard</h1>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={20} />
          Add Product
        </button>
      </header>

      <div className="controls flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="view-toggle flex-gap">
          <button
            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <ListIcon size={20} />
          </button>
          <button
            className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      <div className="content">
        {currentProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No products found.
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <ProductList products={currentProducts} onEdit={openEditModal} />
            ) : (
              <div className="grid-view">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} onEdit={openEditModal} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <ProductForm
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              initialData={editingProduct}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
