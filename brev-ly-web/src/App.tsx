import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/404";
import { Home } from "./pages/home";
import { Redirect } from "./pages/redirect";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/redirect/:id" element={<Redirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

