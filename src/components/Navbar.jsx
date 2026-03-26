import { Link, useNavigate } from "react-router-dom";
import logo from '../Images/logo.png';
import "../CSS/Navbar.css";
import { useState, useRef, useEffect  } from "react";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    /* 
    !"abc"   → false
    !!"abc"  → true

    !null    → true
    !!null   → false
    */

    checkLogin(); //

    window.addEventListener("storage", checkLogin); //if localStorage changes, so does isLoggedIn 

    return () => {
      window.removeEventListener("storage", checkLogin); //cleans the listener when the components is dismounted
    };
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleMouseEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
  };

  return (
    <>
      {/* Overlay que borra la pantalla */}
      {activeMenu && <div className="blur-overlay" ></div>}

      <nav className="navbar">
        <Link to="/" className="logo-area">
          <img src={logo} alt="Logo" className="logo-img" />
          <h2 className="logo-text">E-mart</h2>
        </Link>

        <ul className="nav-links">
            <li onMouseEnter={() => handleMouseEnter("laptops")} onMouseLeave={handleMouseLeave}>
                <Link to="/laptops">Laptops</Link>
                {activeMenu === "laptops" && (
                    <div className="submenu">
                        <ul>
                            <li>MacBook Pro</li>
                            <li>MacBook Air</li>
                            <li>Dell XPS</li>
                            <li>HP Spectre</li>
                        </ul>
                    </div>
                )}
            </li>

            <li onMouseEnter={() => handleMouseEnter("phones")} onMouseLeave={handleMouseLeave}>
                <Link to="/phones">Phones</Link>
                {activeMenu === "phones" && (
                <div className="submenu">
                    <ul>
                    <li>iPhone</li>
                    <li>Sonny Xperia</li>
                    <li>Samsung Glaxy</li>
                    <li>Winodws Phone</li>
                    </ul>
                </div>
                )}
            </li>

            <li onMouseEnter={() => handleMouseEnter("keyboards")} onMouseLeave={handleMouseLeave}>
                <Link to="/keyboards">Keyboards</Link>
                {activeMenu === "keyboards" && (
                <div className="submenu">
                    <ul>
                    <li> RGB keyboards</li>
                    </ul>
                </div>
                )}
            </li>

            <li onMouseEnter={() => handleMouseEnter("mouses")} onMouseLeave={handleMouseLeave}>
                <Link to="/mouses">Mouses</Link>
                {activeMenu === "mouses" && (
                <div className="submenu">
                    <ul>
                    <li>logitech</li>
                    </ul>
                </div>
                )}
            </li>

            <li><Link to="/support">Support</Link></li>
            <i className="fa-solid fa-cart-shopping"></i>
            <li onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              <i className="fa-solid fa-circle-user"></i>
            </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
