import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/404";
import { Home } from "./pages/home";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/item/:id" element={<Item />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

