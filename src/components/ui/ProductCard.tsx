import { SearchResult } from "@/src/services/api";

interface ProductCardProps {
    product: SearchResult;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Try to extract meaningful display fields from the product
    const title = product.title || product.name || "Untitled Product";
    const description = product.description || "";
    const price = product.price;
    const image = product.image || product.imageUrl || product.thumbnail;
    const category = product.category;
    const brand = product.brand;

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
                        {String(description).length > 100
                            ? String(description).substring(0, 100) + "..."
                            : String(description)}
                    </p>
                )}
                {price !== undefined && price !== null && (
                    <p className="product-price">₹{Number(price).toLocaleString("en-IN")}</p>
                )}
            </div>
        </div>
    );
}
