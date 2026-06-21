import { useState, useEffect, useCallback } from "react";
import { Filter, X } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductsCard";
import Pagination from "./Pagination";
import { getAllProducts, searchProducts, getProductsByCategory } from "../services/productApi";
import { getAllCategories } from "../services/categoryApi";
import useFilters from "./useFilters";
import SkeletonGrid from "./SkeletonGrid";

const PAGE_SIZE = 8;

const Dashboard = () => {
  const { filters, updateFilter, clearFilters } = useFilters();
  const { searchQuery, selectedCategories, selectedBrands, priceRange, currentPage } = filters;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

const [allBrands, setAllBrands] = useState([]);

useEffect(() => {
  getAllProducts(1, 100)
    .then((data) => {
      const brands = [
        ...new Set(
          data.products
            .map((p) => p.brand)
            .filter(Boolean)
        ),
      ].sort();
      setAllBrands(brands);
    })
    .catch(() => setAllBrands([]));
}, []);

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange.min !== "" ||
    priceRange.max !== ""
  );

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let allResults = [];
      let total = 0;

      if (searchQuery.trim()) {
        const data = await searchProducts(searchQuery, currentPage, PAGE_SIZE);
        allResults = data.products;
        total = data.total;

      } else if (selectedCategories.length > 0) {
        const responses = await Promise.all(
          selectedCategories.map((cat) =>
            getProductsByCategory(cat, 1, 100)
          )
        );

        const merged = responses.flatMap((r) => r.products);
        const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values());

        const start = (currentPage - 1) * PAGE_SIZE;
        allResults = unique.slice(start, start + PAGE_SIZE);
        total = unique.length;

      } else {
        const data = await getAllProducts(currentPage, PAGE_SIZE);
        allResults = data.products;
        total = data.total;
      }

      if (priceRange.min !== "") {
        allResults = allResults.filter((p) => p.price >= Number(priceRange.min));
      }
      if (priceRange.max !== "") {
        allResults = allResults.filter((p) => p.price <= Number(priceRange.max));
      }

      if (selectedBrands.length > 0) {
        allResults = allResults.filter((p) => selectedBrands.includes(p.brand));
      }

      setProducts(allResults);
      setTotalProducts(total);
    } catch (err) {
      setError(err?.response?.data?.message ?? err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedCategories, selectedBrands, priceRange]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar
        onMenuClick={() => setSidebarOpen((o) => !o)}
        searchQuery={searchQuery}
        onSearchChange={(val) => updateFilter("searchQuery", val)}
      />

      <div className="flex">
        <Sidebar
          categories={categories}
          brands={allBrands}
          selectedCategories={selectedCategories}
          onSelectCategory={(val) => updateFilter("selectedCategories", val)}
          selectedBrands={selectedBrands}
          onBrandsChange={(val) => updateFilter("selectedBrands", val)}
          priceRange={priceRange}
          onPriceChange={(val) => updateFilter("priceRange", val)}
          sidebarSearch={searchQuery}
          onSidebarSearchChange={(val) => updateFilter("searchQuery", val)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-6">

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-700" />
              <h1 className="text-lg font-semibold text-slate-800">
                {loading ? "Loading…" : `${totalProducts} Products`}
              </h1>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-md transition-colors"
              >
                <X size={14} /> Clear All Filters
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                  Search: "{searchQuery}"
                  <button onClick={() => updateFilter("searchQuery", "")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full capitalize"
                >
                  {cat}
                  <button
                    onClick={() =>
                      updateFilter("selectedCategories", selectedCategories.filter((c) => c !== cat))
                    }
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full"
                >
                  {b}
                  <button
                    onClick={() =>
                      updateFilter("selectedBrands", selectedBrands.filter((x) => x !== b))
                    }
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {(priceRange.min !== "" || priceRange.max !== "") && (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                  ${priceRange.min || "0"} – ${priceRange.max || "∞"}
                  <button onClick={() => updateFilter("priceRange", { min: "", max: "" })}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}

          {loading && <SkeletonGrid count={8} />}
          {error && (
            <p className="text-center text-red-500 py-10">{error}</p>
          )}
          {!loading && !error && products.length === 0 && (
            <p className="text-center text-slate-500 py-10">
              No products match your filters.
            </p>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => updateFilter("currentPage", page)}
              />
            </>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;