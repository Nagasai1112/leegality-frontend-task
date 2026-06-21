import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./navbar";
import { getProductById } from "../services/productApi";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(0);
      })
      .catch((err) => {
        setError(err?.response?.data?.message ?? err.message ?? "Product not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handlePrev = () => {
    setActiveImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  };

  const handleNext = () => {
    setActiveImage((i) => (i === product.images.length - 1 ? 0 : i + 1));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar onMenuClick={() => {}} searchQuery="" onSearchChange={() => {}} />

      <main className="max-w-5xl mx-auto p-6">
        {loading && (
          <p className="text-center text-slate-500 py-20">Loading product…</p>
        )}

        {error && (
          <p className="text-center text-red-500 py-20">{error}</p>
        )}

        {!loading && !error && product && (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">

            {/* Main content grid */}
            <div className="grid md:grid-cols-2 gap-0">

              {/* Left — Image with Prev/Next */}
              <div className="p-6 border-r border-slate-100">

                {/* Back button */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 mb-4 transition-colors border border-slate-200 px-3 py-1.5 rounded-md"
                >
                  <ChevronLeft size={16} /> Back
                </Link>

                {/* Main image */}
                <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={product.images?.[activeImage] ?? product.thumbnail}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Prev / Page indicators / Next */}
                {product.images?.length > 1 && (
                  <div className="flex items-center justify-between gap-2">
                    {/* Prev */}
                    <button
                      onClick={handlePrev}
                      className="flex items-center gap-1 text-sm text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                            i === activeImage
                              ? "bg-blue-600 text-white"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    {/* Next */}
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1 text-sm text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Right — Product info */}
              <div className="p-6">

                {/* Title */}
                <h1 className="text-2xl font-bold text-slate-900 mb-3">
                  {product.title}
                </h1>

                {/* Price + Rating inline */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-slate-500">
                      ({product.rating?.toFixed(1)})
                    </span>
                  </div>
                </div>

                {/* Brand + Category */}
                <div className="mb-4 space-y-1">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Brand:</span> {product.brand}
                  </p>
                  <p className="text-sm text-slate-700 capitalize">
                    <span className="font-semibold">Category:</span> {product.category}
                  </p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm font-medium text-green-600">
                      {Math.round(product.discountPercentage)}% off
                    </p>
                  )}
                </div>

                <hr className="border-slate-100 mb-4" />

                {/* Description */}
                <div className="mb-4">
                  <h2 className="text-base font-bold text-slate-900 mb-2">
                    Description
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <hr className="border-slate-100 mb-4" />

                {/* Stock status */}
                <p
                  className={`text-sm font-medium mb-4 ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `In stock (${product.stock} available)`
                    : "Out of stock"}
                </p>

                <hr className="border-slate-100 mb-4" />

                {/* Reviews */}
                {product.reviews?.length > 0 && (
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-3">
                      Reviews
                    </h2>
                    <div className="space-y-4">
                      {product.reviews.map((review, i) => (
                        <div key={i} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-slate-800">
                              {review.reviewerName}
                            </span>
                            <StarRating rating={review.rating} />
                            <span className="text-xs text-slate-400">
                              ({review.rating?.toFixed(1)})
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{review.comment}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {formatDate(review.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;