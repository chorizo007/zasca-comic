import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { site } from "../data/content";
import { Seo } from "./Seo";

const navItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/numeros", label: "Números" },
  { to: "/zascandiles", label: "Zascandiles" },
  { to: "/tienda", label: "Tienda" },
  { to: "/hazte-zascandil", label: "Hazte zascandil" },
  { to: "/asociacion", label: "La asociación" },
  { to: "/actualidad", label: "Actualidad" },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Seo />

      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="brand" aria-label="Zasca! Cómic, inicio">
              <span className="brand-bang">ZASCA!</span>
              <span className="brand-sub">
                Revista
                <br />
                de cómic
              </span>
            </Link>

            <nav className="nav" aria-label="Navegación principal">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="header-actions">
              <a
                className="btn btn--primary btn--sm"
                href={site.links.shop}
                target="_blank"
                rel="noreferrer"
              >
                Ir a la tienda
              </a>
              <button
                type="button"
                className="menu-btn"
                aria-expanded={menuOpen}
                aria-controls="menu-movil"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? "Cerrar" : "Menú"}
              </button>
            </div>
          </div>

          <nav
            id="menu-movil"
            className={menuOpen ? "mobile-nav is-open" : "mobile-nav"}
            aria-label="Navegación móvil"
          >
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="contenido">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <p className="footer-brand">ZASCA! Cómic</p>
              <p className="footer-about">
                Revista colectiva de cómic de humor gamberro. Un número, un
                monográfico, una legión de autores.
              </p>
            </div>

            <div>
              <h4>Navegar</h4>
              <ul>
                <li>
                  <Link to="/numeros">Todos los números</Link>
                </li>
                <li>
                  <Link to="/zascandiles">Zascandiles</Link>
                </li>
                <li>
                  <Link to="/tienda">Tienda y suscripción</Link>
                </li>
                <li>
                  <Link to="/hazte-zascandil">Hazte zascandil</Link>
                </li>
                <li>
                  <Link to="/asociacion">La asociación</Link>
                </li>
                <li>
                  <Link to="/actualidad">Actualidad</Link>
                </li>
                <li>
                  <Link to="/newsletter">Boletín</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Comprar</h4>
              <ul>
                <li>
                  <a href={site.links.shop} target="_blank" rel="noreferrer">
                    Papel · tienda Sumup
                  </a>
                </li>
                <li>
                  <a href={site.links.digital} target="_blank" rel="noreferrer">
                    Digital · Payhip
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.subscription}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Suscripción anual
                  </a>
                </li>
                <li>
                  <a href={site.links.authors} target="_blank" rel="noreferrer">
                    Material para autores
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4>Contacto</h4>
              <address>
                {site.address}
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </address>
              <ul style={{ marginTop: 14 }}>
                {site.socials
                  .filter((social) => social.label !== "Email")
                  .map((social) => (
                    <li key={social.label}>
                      <a href={social.url} target="_blank" rel="noreferrer">
                        {social.label} · {social.handle}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Asociación Zasca Cómic · Sin ánimo de
              lucro
            </span>
            <span>Hecho con viñetas, tinta y malas ideas.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
