import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Issues } from "./pages/Issues";
import { IssueDetail } from "./pages/IssueDetail";
import { Shop } from "./pages/Shop";
import { Join } from "./pages/Join";
import { About } from "./pages/About";
import { Zascandiles } from "./pages/Zascandiles";
import { News } from "./pages/News";
import { Newsletter } from "./pages/Newsletter";
import { NewsletterConfirm } from "./pages/NewsletterConfirm";
import { NotFound } from "./pages/NotFound";

// En GitHub Pages el sitio cuelga de /nombre-del-repo/; React Router necesita
// ese prefijo para construir los enlaces.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="numeros" element={<Issues />} />
          <Route path="numeros/:num" element={<IssueDetail />} />
          <Route path="tienda" element={<Shop />} />
          <Route path="hazte-zascandil" element={<Join />} />
          <Route path="asociacion" element={<About />} />
          <Route path="zascandiles" element={<Zascandiles />} />
          <Route path="actualidad" element={<News />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="newsletter/confirmado" element={<NewsletterConfirm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
