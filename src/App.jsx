import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;