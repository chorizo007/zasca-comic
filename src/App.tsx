import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Issues } from "./pages/Issues";
import { IssueDetail } from "./pages/IssueDetail";
import { Shop } from "./pages/Shop";
import { Join } from "./pages/Join";
import { About } from "./pages/About";
import { News } from "./pages/News";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="numeros" element={<Issues />} />
          <Route path="numeros/:num" element={<IssueDetail />} />
          <Route path="tienda" element={<Shop />} />
          <Route path="hazte-zascandil" element={<Join />} />
          <Route path="asociacion" element={<About />} />
          <Route path="actualidad" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
