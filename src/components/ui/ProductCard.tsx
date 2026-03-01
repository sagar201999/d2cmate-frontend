import { SearchResult } from "@/src/services/api";

interface ProductCardProps {
    product: SearchResult;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Try to extract meaningful display fields from the product
    const title = product.title || product.name || "Untitled Product";
    const description = product.desc || product.description || "";
    const price = product.price;
    const image = product.image || product.imageUrl || product.thumbnail;
    const category = product.cat || product.category;
    const brand = product.brand;
    const hsn = product.hsn;
    const igst = product.igst;

    return (
        <div className="product-card" id={`product-${product._id}`}>
            <div className="product-image-wrapper">
                {image ? (
                    <img
                        src={String(image)}
                        alt={String(title)}
                        className="product-image"
                        loading="lazy"
                    />
                ) : (
                    <div className="product-image-placeholder">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="placeholder-icon"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="product-info">
                {(category || brand) && (
                    <div className="product-meta">
                        {brand && <span className="product-brand">{String(brand)}</span>}
                        {category && <span className="product-category">{String(category)}</span>}
                    </div>
                )}
                <h3 className="product-title">{String(title)}</h3>
                {description && (
                    <p className="product-description">
                        {String(description).length > 200
                            ? String(description).substring(0, 200) + "..."
                            : String(description)}
                    </p>
                )}
                {(hsn || igst !== undefined) && (
                    <div className="product-tax-info" style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: '0.5rem', color: '#6b7280' }}>
                        {hsn && <span className="product-hsn" style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', border: '1px solid #e5e7eb' }}>HSN: <strong style={{ color: '#374151' }}>{String(hsn)}</strong></span>}
                        {igst !== undefined && <span className="product-igst" style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', border: '1px solid #e5e7eb' }}>GST: <strong style={{ color: '#374151' }}>{Number(igst)}%</strong></span>}
                    </div>
                )}
                {price !== undefined && price !== null && (
                    <p className="product-price">₹{Number(price).toLocaleString("en-IN")}</p>
                )}
            </div>
        </div>
    );
}
