import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar/Navbar";
import { Card } from "@/components/Card/Card";
import { colors } from "@/theme/colorPalette";
import { useAppSelector } from "@/store";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: colors.background,
  };

  const contentStyles: React.CSSProperties = {
    padding: "40px 24px",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const headerSectionStyles: React.CSSProperties = {
    marginBottom: "40px",
  };

  const greetingStyles: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: "700",
    color: colors.text,
    marginBottom: "8px",
  };

  const subGreetingStyles: React.CSSProperties = {
    fontSize: "16px",
    color: colors.textLight,
  };

  const gridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    marginTop: "32px",
  };

  const quickActions = [
    {
      title: "My Properties",
      icon: "🏠",
      path: "/properties",
      description: "View and manage your listings",
    },
    {
      title: "Saved Wishlist",
      icon: "❤️",
      path: "/wishlist",
      description: "Properties you loved",
    },
    {
      title: "My Orders",
      icon: "🛒",
      path: "/orders",
      description: "Track your transactions",
    },
    {
      title: "Settings",
      icon: "⚙️",
      path: "/settings",
      description: "Manage your account",
    },
  ];

  return (
    <div style={containerStyles}>
      <Navbar />
      <div style={contentStyles}>
        <div style={headerSectionStyles}>
          <h1 style={greetingStyles}>
            Welcome back, {user?.firstName || "User"}! 👋
          </h1>
          <p style={subGreetingStyles}>
            Here's what's happening with your properties today
          </p>
        </div>

        <div style={gridStyles}>
          {quickActions.map((action) => (
            <Card
              key={action.title}
              onClick={() => navigate(action.path)}
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
            >
              <div style={{ padding: "28px" }}>
                <div style={{ fontSize: "56px", marginBottom: "16px" }}>
                  {action.icon}
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: colors.text,
                    marginBottom: "8px",
                  }}
                >
                  {action.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.textLight,
                    margin: 0,
                  }}
                >
                  {action.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div style={{ marginTop: "60px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "24px",
            }}
          >
            Recent Activity
          </h2>
          <Card style={{ padding: "32px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
            <p style={{ color: colors.textLight, fontSize: "16px" }}>
              No recent activity yet. Start exploring properties!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
