import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container max-w-none mx-auto footer">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 footer-grid">
          <div className="col-span-6 copyright">
            <p>Copyright 2022 - Rely</p>
          </div>
          <div className="col-span-6 links">
            <ul>
              <li>
                <Link to={"/privacy"} className="nav-link">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to={"/terms"} className="nav-link">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="nav-link">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
