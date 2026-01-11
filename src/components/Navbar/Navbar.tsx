import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";
import { useAppSelector, useAppDispatch } from "@/store";
import { logout } from "@/services/auth/slice";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const user = useAppSelector((state) => state.user.user);

  const navbarStyles: React.CSSProperties = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoContainerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  };

  const logoIconStyles: React.CSSProperties = {
    fontSize: "24px",
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: "0px",
  };

  const navMenuStyles: React.CSSProperties = {
    display: "flex",
    gap: "28px",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const navItemStyles: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  const authButtonsStyles: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  };

  const userMenuStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const userNameStyles: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "600",
    color: colors.text,
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUploadProperty = () => {
    if (isAuthenticated) {
      navigate("/create-property");
    } else {
      navigate("/login");
    }
  };

  const menuItems = [
    { label: "Recent", onClick: () => navigate("/home") },
    {
      label: "New Projects",
      //   onClick: () => navigate("/properties?filter=new"),
    },
    {
      label: "Luxury Listing",
      onClick: () => navigate("/home?luxury=true"),
    },
    { label: "Land", onClick: () => navigate("/home?type=land") },
  ];

  return (
    <nav style={navbarStyles}>
      <div style={containerStyles}>
        {/* Logo */}
        <div style={logoContainerStyles} onClick={() => navigate("/")}>
          <img
            src="/logo.svg"
            alt="AFGOG Property"
            style={{ height: "40px", width: "auto" }}
          />
        </div>

        {/* Navigation Menu - Desktop */}
        <ul style={navMenuStyles}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              style={navItemStyles}
              onClick={item.onClick}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.primary)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.text)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Auth Buttons / User Menu */}
        <div style={authButtonsStyles}>
          {isAuthenticated ? (
            <div style={userMenuStyles}>
              <span style={userNameStyles}>
                Hi, {user?.firstName || "User"}
              </span>
              <Button
                variant="outline"
                size="small"
                // onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button variant="outline" size="small" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                variant="secondary"
                size="small"
                // onClick={handleUploadProperty}
              >
                + Upload Property
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="small"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button size="small" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={handleUploadProperty}
              >
                + Upload Property
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
