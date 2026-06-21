import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";


const Sidebar = ({
  categories,
  brands,
  selectedCategories,
  onSelectCategory,
  selectedBrands,
  onBrandsChange,
  priceRange,
  onPriceChange,
  sidebarSearch,
  onSidebarSearchChange,
  isOpen,
  onClose,
}) => {
  const [draftPrice, setDraftPrice] = useState(priceRange);

  useEffect(() => {
    setDraftPrice(priceRange);
  }, [priceRange]);

  const toggleCategory = (slug) => {
    if (selectedCategories.includes(slug)) {
      onSelectCategory(selectedCategories.filter((c) => c !== slug));
    } else {
      onSelectCategory([...selectedCategories, slug]);
    }
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      onBrandsChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandsChange([...selectedBrands, brand]);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          shrink-0 bg-white border-r border-slate-200 overflow-y-auto
          transition-all duration-300 ease-in-out
          sticky top-0 h-screen
          ${isOpen ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden border-0"}
        `}
      >
        <div className="w-64 p-5">

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Filters</h2>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={sidebarSearch}
              onChange={(e) => onSidebarSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-800 mb-3">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug} className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id={`cat-${cat.slug}`}
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`cat-${cat.slug}`}
                    className="text-sm text-slate-700 capitalize cursor-pointer"
                  >
                    {cat.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-800 mb-3">
              Price Range
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={draftPrice.min}
                onChange={(e) =>
                  setDraftPrice({ ...draftPrice, min: e.target.value })
                }
                className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={draftPrice.max}
                onChange={(e) =>
                  setDraftPrice({ ...draftPrice, max: e.target.value })
                }
                className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => onPriceChange(draftPrice)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-md transition-colors"
            >
              Apply
            </button>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">
              Brands
            </h3>
            <ul className="space-y-2.5">
              {brands.map((brand) => (
                <li key={brand} className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm text-slate-700 cursor-pointer"
                  >
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;