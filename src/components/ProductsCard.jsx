import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const rating = product.rating ?? 0;
  const reviewCount = product.reviews?.length ?? Math.round(rating * 23);

  const handleClick = () => {
    sessionStorage.setItem("came_from_product", "true");
  };

  return (
    <Link
      to={`/product/${product.id}`}
      onClick={handleClick}
      className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="aspect-square mb-4 flex items-center justify-center bg-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h3 className="text-slate-800 font-medium text-sm mb-2 line-clamp-1">
        {product.title}
      </h3>

      <div className="flex items-center gap-2 mt-auto">
        <span className="text-slate-900 font-bold">${Math.round(product.price)}</span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
          <span>({reviewCount})</span>
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;