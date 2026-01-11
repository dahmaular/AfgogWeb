import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  };

  const backgroundPatternStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.08,
    backgroundImage: `
      repeating-linear-gradient(45deg, transparent, transparent 35px, ${colors.white} 35px, ${colors.white} 70px),
      repeating-linear-gradient(-45deg, transparent, transparent 35px, ${colors.white} 35px, ${colors.white} 70px)
    `,
  };

  const floatingShapeStyles: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${colors.white}20, transparent)`,
    animation: "float 20s ease-in-out infinite",
  };

  const contentWrapperStyles: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: "40px 20px",
    textAlign: "center",
  };

  const logoContainerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-30px)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const logoIconStyles: React.CSSProperties = {
    width: "70px",
    height: "70px",
    background: `linear-gradient(135deg, ${colors.white}, ${colors.white}dd)`,
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    transform: "rotate(-5deg)",
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "800",
    color: colors.white,
    letterSpacing: "2px",
    textShadow: "0 4px 12px rgba(0,0,0,0.3)",
  };

  const titleContainerStyles: React.CSSProperties = {
    marginBottom: "20px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-20px)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
  };

  const titleStyles: React.CSSProperties = {
    fontSize: "56px",
    fontWeight: "700",
    color: colors.white,
    marginBottom: "12px",
    lineHeight: "1.2",
    textShadow: "0 4px 20px rgba(0,0,0,0.2)",
  };

  const highlightTextStyles: React.CSSProperties = {
    background: `linear-gradient(135deg, ${colors.white}, ${colors.white}dd)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "inline-block",
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: "20px",
    color: colors.white,
    opacity: 0.95,
    marginBottom: "16px",
    maxWidth: "600px",
    lineHeight: "1.6",
    fontWeight: "400",
    opacity: isVisible ? 0.95 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-15px)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
  };

  const featuresContainerStyles: React.CSSProperties = {
    display: "flex",
    gap: "24px",
    marginBottom: "48px",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "800px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-10px)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
  };

  const featureCardStyles: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    padding: "20px 28px",
    borderRadius: "16px",
    border: `1px solid rgba(255, 255, 255, 0.2)`,
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    cursor: "default",
  };

  const featureIconStyles: React.CSSProperties = {
    fontSize: "32px",
    marginBottom: "8px",
  };

  const featureTitleStyles: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "600",
    color: colors.white,
    marginBottom: "4px",
  };

  const featureDescStyles: React.CSSProperties = {
    fontSize: "13px",
    color: colors.white,
    opacity: 0.85,
  };

  const buttonContainerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    maxWidth: "420px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.95)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s",
  };

  const primaryButtonStyles: React.CSSProperties = {
    backgroundColor: colors.white,
    color: colors.primary,
    fontWeight: "700",
    fontSize: "18px",
    padding: "16px 32px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    border: "none",
    transform: "scale(1)",
    transition: "all 0.3s ease",
  };

  const secondaryButtonStyles: React.CSSProperties = {
    backgroundColor: "transparent",
    color: colors.white,
    border: `2px solid ${colors.white}`,
    fontWeight: "600",
    fontSize: "18px",
    padding: "16px 32px",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  };

  const statsContainerStyles: React.CSSProperties = {
    display: "flex",
    gap: "48px",
    marginTop: "48px",
    opacity: isVisible ? 1 : 0,
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s",
  };

  const statStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const statNumberStyles: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: "800",
    color: colors.white,
    marginBottom: "4px",
  };

  const statLabelStyles: React.CSSProperties = {
    fontSize: "14px",
    color: colors.white,
    opacity: 0.9,
    fontWeight: "500",
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(10px, -10px) scale(1.05); }
            50% { transform: translate(-10px, 10px) scale(0.95); }
            75% { transform: translate(10px, 10px) scale(1.02); }
          }
          
          .feature-card:hover {
            transform: translateY(-4px);
            background-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          }
          
          .primary-button:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 32px rgba(0,0,0,0.3);
          }
          
          .secondary-button:hover {
            background-color: rgba(255, 255, 255, 0.1);
            transform: scale(1.02);
          }
        `}
      </style>
      <div style={containerStyles}>
        <div style={backgroundPatternStyles} />

        {/* Floating decorative shapes */}
        <div
          style={{
            ...floatingShapeStyles,
            width: "300px",
            height: "300px",
            top: "-100px",
            left: "-100px",
          }}
        />
        <div
          style={{
            ...floatingShapeStyles,
            width: "400px",
            height: "400px",
            bottom: "-150px",
            right: "-150px",
            animationDelay: "-5s",
          }}
        />
        <div
          style={{
            ...floatingShapeStyles,
            width: "200px",
            height: "200px",
            top: "40%",
            right: "10%",
            animationDelay: "-10s",
          }}
        />

        <div style={contentWrapperStyles}>
          <div style={logoContainerStyles}>
            <div style={logoIconStyles}>🏡</div>
            <div style={logoTextStyles}>AFGOG</div>
          </div>

          <div style={titleContainerStyles}>
            <h1 style={titleStyles}>
              Find Your <span style={highlightTextStyles}>Dream Home</span>
            </h1>
          </div>

          <p style={subtitleStyles}>
            Discover exceptional properties, connect with trusted agents, and
            unlock your perfect living space in the most desirable locations.
          </p>

          <div style={featuresContainerStyles}>
            <div className="feature-card" style={featureCardStyles}>
              <div style={featureIconStyles}>🔑</div>
              <div style={featureTitleStyles}>Verified Listings</div>
              <div style={featureDescStyles}>100% authentic properties</div>
            </div>
            <div className="feature-card" style={featureCardStyles}>
              <div style={featureIconStyles}>💎</div>
              <div style={featureTitleStyles}>Premium Locations</div>
              <div style={featureDescStyles}>Exclusive neighborhoods</div>
            </div>
            <div className="feature-card" style={featureCardStyles}>
              <div style={featureIconStyles}>⚡</div>
              <div style={featureTitleStyles}>Quick Process</div>
              <div style={featureDescStyles}>Seamless experience</div>
            </div>
          </div>

          <div style={buttonContainerStyles}>
            <Button
              className="primary-button"
              fullWidth
              onClick={() => navigate("/register")}
              style={primaryButtonStyles}
            >
              Get Started Free
            </Button>
            <Button
              className="secondary-button"
              fullWidth
              onClick={() => navigate("/login")}
              style={secondaryButtonStyles}
            >
              Sign In to Your Account
            </Button>
          </div>

          <div style={statsContainerStyles}>
            <div style={statStyles}>
              <div style={statNumberStyles}>10K+</div>
              <div style={statLabelStyles}>Properties</div>
            </div>
            <div style={statStyles}>
              <div style={statNumberStyles}>5K+</div>
              <div style={statLabelStyles}>Happy Clients</div>
            </div>
            <div style={statStyles}>
              <div style={statNumberStyles}>500+</div>
              <div style={statLabelStyles}>Expert Agents</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
