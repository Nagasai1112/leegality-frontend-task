import { useState, useEffect } from "react";

const SESSION_KEY = "product_filters";
const CAME_FROM_KEY = "came_from_product";

const defaultFilters = {
  searchQuery: "",
  selectedCategories: [],
  selectedBrands: [],
  priceRange: { min: "", max: "" },
  currentPage: 1,
};

const sanitizeFilters = (saved) => ({
  searchQuery: typeof saved.searchQuery === "string" ? saved.searchQuery : "",
  selectedCategories: Array.isArray(saved.selectedCategories)
    ? saved.selectedCategories
    : [],
  selectedBrands: Array.isArray(saved.selectedBrands)
    ? saved.selectedBrands
    : [],
  priceRange:
    saved.priceRange && typeof saved.priceRange === "object"
      ? saved.priceRange
      : { min: "", max: "" },
  currentPage: typeof saved.currentPage === "number" ? saved.currentPage : 1,
});

const useFilters = () => {
  const [filters, setFilters] = useState(() => {
    const cameFromProduct = sessionStorage.getItem(CAME_FROM_KEY) === "true";
    if (cameFromProduct) {
      try {
        const saved = sessionStorage.getItem(SESSION_KEY);
        return saved ? sanitizeFilters(JSON.parse(saved)) : defaultFilters;
      } catch {
        return defaultFilters;
      }
    }
    sessionStorage.removeItem(SESSION_KEY);
    return defaultFilters;
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(filters));
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "currentPage" ? { currentPage: 1 } : {}),
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(CAME_FROM_KEY);
  };

  return { filters, updateFilter, clearFilters };
};

export default useFilters;