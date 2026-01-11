import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "@/services/auth/api";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";
import { toast } from "react-toastify";

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState("");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !code) {
      toast.error("Please enter both email and verification code");
      return;
    }

    try {
      const response = await verifyEmail({ email, code }).unwrap();
      toast.success(response.message || "Email verified successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Verification failed. Please try again."
      );
    }
  };

  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    position: "relative",
    overflow: "hidden",
  };

  const leftPanelStyles: React.CSSProperties = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  };

  const decorativeCircle1: React.CSSProperties = {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    top: "-100px",
    right: "-100px",
  };

  const decorativeCircle2: React.CSSProperties = {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.08)",
    bottom: "-50px",
    left: "-50px",
  };

  const heroContentStyles: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    color: "#fff",
    textAlign: "center",
  };

  const iconContainerStyles: React.CSSProperties = {
    fontSize: "120px",
    marginBottom: "32px",
    animation: "pulse 2s ease-in-out infinite",
  };

  const heroTitleStyles: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "900",
    marginBottom: "24px",
    lineHeight: "1.2",
  };

  const heroSubtitleStyles: React.CSSProperties = {
    fontSize: "18px",
    opacity: 0.95,
    lineHeight: "1.6",
    maxWidth: "500px",
  };

  const rightPanelStyles: React.CSSProperties = {
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  };

  const formContainerStyles: React.CSSProperties = {
    width: "100%",
    maxWidth: "480px",
  };

  const logoContainerStyles: React.CSSProperties = {
    marginBottom: "40px",
  };

  const logoStyles: React.CSSProperties = {
    height: "50px",
    width: "auto",
  };

  const titleStyles: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: "8px",
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "40px",
    fontWeight: "400",
    lineHeight: "1.5",
  };

  const inputWrapperStyles: React.CSSProperties = {
    marginBottom: "24px",
  };

  const labelStyles: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  };

  const inputStyles: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  };

  const codeInputStyles: React.CSSProperties = {
    ...inputStyles,
    fontSize: "24px",
    letterSpacing: "8px",
    textAlign: "center",
    fontWeight: "600",
  };

  const linkStyles: React.CSSProperties = {
    color: colors.primary,
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  };

  const footerStyles: React.CSSProperties = {
    marginTop: "32px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
  };

  const infoBoxStyles: React.CSSProperties = {
    background: "#f0f9ff",
    border: "1px solid #bfdbfe",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "24px",
    fontSize: "14px",
    color: "#1e40af",
    lineHeight: "1.6",
  };

  return (
    <div style={containerStyles}>
      <div style={leftPanelStyles}>
        <div style={decorativeCircle1}></div>
        <div style={decorativeCircle2}></div>

        <div style={heroContentStyles}>
          <div style={iconContainerStyles}>📧</div>
          <h1 style={heroTitleStyles}>Check Your Email</h1>
          <p style={heroSubtitleStyles}>
            We've sent a verification code to your email address. Enter the code
            below to verify your account and get started.
          </p>
        </div>
      </div>

      <div style={rightPanelStyles}>
        <div style={formContainerStyles}>
          <div style={logoContainerStyles}>
            <img src="/logo.png" alt="Afgog Properties" style={logoStyles} />
          </div>

          <h2 style={titleStyles}>Verify Your Email</h2>
          <p style={subtitleStyles}>
            Enter the verification code sent to your email to activate your
            account
          </p>

          <form onSubmit={handleSubmit}>
            <div style={infoBoxStyles}>
              💡 Check your spam folder if you don't see the email in your inbox
            </div>

            <div style={inputWrapperStyles}>
              <label style={labelStyles}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyles}
                required
              />
            </div>

            <div style={inputWrapperStyles}>
              <label style={labelStyles}>Verification Code</label>
              <input
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\s/g, ""))}
                style={codeInputStyles}
                maxLength={6}
                required
              />
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <div style={footerStyles}>
              Didn't receive the code?{" "}
              <a
                style={linkStyles}
                onClick={() => toast.info("Resend feature coming soon")}
              >
                Resend Code
              </a>
            </div>

            <div style={{ ...footerStyles, marginTop: "16px" }}>
              <a style={linkStyles} onClick={() => navigate("/login")}>
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.9;
            }
          }
          
          input:focus {
            border-color: ${colors.primary} !important;
            box-shadow: 0 0 0 3px ${colors.primary}20;
          }
        `}
      </style>
    </div>
  );
};
