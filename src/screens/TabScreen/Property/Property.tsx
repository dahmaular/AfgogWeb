import React from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Card } from "@/components/Card/Card";
import { colors } from "@/theme/colorPalette";

export const Property: React.FC = () => {
  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: colors.background,
  };

  const contentStyles: React.CSSProperties = {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const gridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  };

  const propertyCardStyles: React.CSSProperties = {
    cursor: "pointer",
  };

  const imageStyles: React.CSSProperties = {
    width: "100%",
    height: "200px",
    backgroundColor: colors.carton,
    borderRadius: "8px",
    marginBottom: "12px",
  };

  return (
    <div style={containerStyles}>
      <Navbar />
      <div style={contentStyles}>
        <div style={gridStyles}>
          {[1, 2, 3].map((item) => (
            <Card key={item} style={propertyCardStyles}>
              <div style={imageStyles} />
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Property {item}
              </h3>
              <p
                style={{
                  color: colors.textLight,
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                Beautiful property in prime location
              </p>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: colors.primary,
                }}
              >
                $500,000
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
