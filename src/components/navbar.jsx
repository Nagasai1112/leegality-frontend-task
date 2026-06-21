import { Menu, Search, ShoppingCart, RotateCcw, User } from "lucide-react";

const Navbar = ({ onMenuClick, searchQuery, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-800 px-4 py-3 flex items-center gap-4">

      <button
        onClick={onMenuClick}
        className="text-white hover:bg-slate-700 p-2 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-xl mx-auto relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-md border-0 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div className="flex items-center gap-4 text-white">
        <button className="hover:text-blue-400 transition-colors" aria-label="Cart">
          <ShoppingCart size={22} />
        </button>
        <button className="hover:text-blue-400 transition-colors" aria-label="Order history">
          <RotateCcw size={22} />
        </button>
        <button className="hover:text-blue-400 transition-colors" aria-label="Account">
          <User size={22} />
        </button>
      </div>
    </header>
  );
}

export default Navbar