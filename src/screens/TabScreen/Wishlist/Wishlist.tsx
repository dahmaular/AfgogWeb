import React from "react";
import { Header } from "@/components/Header/Header";
import { colors } from "@/theme/colorPalette";

export const Wishlist: React.FC = () => {
  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: colors.background,
  };

  const contentStyles: React.CSSProperties = {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const emptyStateStyles: React.CSSProperties = {
    textAlign: "center",
    padding: "60px 20px",
    color: colors.textLight,
  };

  return (
    <div style={containerStyles}>
      <Header title="Wishlist" />
      <div style={contentStyles}>
        <div style={emptyStateStyles}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>❤️</div>
          <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
            Your Wishlist is Empty
          </h3>
          <p>Save items you love to your wishlist</p>
        </div>
      </div>
    </div>
  );
};
