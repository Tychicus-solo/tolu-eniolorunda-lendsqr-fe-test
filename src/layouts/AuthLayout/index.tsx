import { Outlet } from "react-router-dom";
import "./AuthLayout.scss";
import { Logo, LoginIllustration } from "../../assets/icons"; 

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__left">
        <header className="auth-layout__header">
          <img src={Logo} alt="Lendsqr Logo" className="auth-layout__logo" />
        </header>
        <div className="auth-layout__image-container">
          <img src={LoginIllustration} alt="Login Illustration" />
        </div>
      </div>

      <div className="auth-layout__right">
        <div className="auth-layout__mobile-logo">
          <img src={Logo} alt="Lendsqr Logo" className="auth-layout__logo" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
