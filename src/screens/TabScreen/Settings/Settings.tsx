import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { Card } from "@/components/Card/Card";
import { Button } from "@/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/services/auth/slice";
import { colors } from "@/theme/colorPalette";

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/welcome");
  };

  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: colors.background,
  };

  const contentStyles: React.CSSProperties = {
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const profileSection: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "32px",
  };

  const avatarStyles: React.CSSProperties = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    color: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "700",
    margin: "0 auto 16px",
  };

  const menuItemStyles: React.CSSProperties = {
    padding: "16px",
    borderBottom: `1px solid ${colors.border}`,
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const settingsItems = [
    { title: "Profile", icon: "👤" },
    { title: "Notifications", icon: "🔔" },
    { title: "Privacy", icon: "🔒" },
    { title: "Help & Support", icon: "❓" },
    { title: "About", icon: "ℹ️" },
  ];

  return (
    <div style={containerStyles}>
      <Header title="Settings" />
      <div style={contentStyles}>
        <div style={profileSection}>
          <div style={avatarStyles}>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <h2
            style={{ fontSize: "24px", fontWeight: "600", marginBottom: "4px" }}
          >
            {user?.firstName} {user?.lastName}
          </h2>
          <p style={{ color: colors.textLight }}>{user?.email}</p>
        </div>

        <Card style={{ marginBottom: "24px" }}>
          {settingsItems.map((item) => (
            <div key={item.title} style={menuItemStyles}>
              <span style={{ marginRight: "12px" }}>{item.icon}</span>
              {item.title}
            </div>
          ))}
        </Card>

        <Button variant="secondary" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
