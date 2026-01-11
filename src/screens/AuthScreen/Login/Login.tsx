import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/services/auth/api";
import { useAppDispatch } from "@/store";
import { setCredentials } from "@/services/auth/slice";
import { loginValidationSchema } from "@/utils/auth-validations";
import { InputText } from "@/components/Inputs/InputText";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";
import { toast } from "react-toastify";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        console.log("result", result);
        dispatch(setCredentials(result));
        toast.success("Login successful!");
        navigate("/home");
      } catch (error: any) {
        toast.error(error?.data?.message || "Login failed. Please try again.");
        console.log("Login error:", error);
      }
    },
  });

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
  };

  const heroTitleStyles: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "900",
    marginBottom: "24px",
    lineHeight: "1.2",
  };

  const heroSubtitleStyles: React.CSSProperties = {
    fontSize: "18px",
    marginBottom: "40px",
    opacity: 0.95,
    lineHeight: "1.6",
  };

  const statsContainerStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginTop: "60px",
  };

  const statBoxStyles: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const statNumberStyles: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: "900",
    marginBottom: "8px",
  };

  const statLabelStyles: React.CSSProperties = {
    fontSize: "13px",
    opacity: 0.9,
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

  const inputWrapperStyles: React.CSSProperties = {
    marginBottom: "24px",
  };

  const trustBadgeStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    background: "#f0fdf4",
    borderRadius: "12px",
    marginTop: "24px",
    border: "1px solid #d1fae5",
  };

  const badgeIconStyles: React.CSSProperties = {
    fontSize: "20px",
  };

  const badgeTextStyles: React.CSSProperties = {
    fontSize: "13px",
    color: "#065f46",
    fontWeight: "600",
  };

  return (
    <div style={containerStyles}>
      <div style={leftPanelStyles}>
        <div style={decorativeCircle1}></div>
        <div style={decorativeCircle2}></div>

        <div style={heroContentStyles}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🏡</div>
          <h1 style={heroTitleStyles}>Find Your Dream Property Today</h1>
          <p style={heroSubtitleStyles}>
            Join thousands of property seekers who trust AfgogProperty to
            discover their perfect home. Access exclusive listings, market
            insights, and personalized recommendations.
          </p>

          <div style={statsContainerStyles}>
            <div style={statBoxStyles}>
              <div style={statNumberStyles}>50K+</div>
              <div style={statLabelStyles}>Active Listings</div>
            </div>
            <div style={statBoxStyles}>
              <div style={statNumberStyles}>15K+</div>
              <div style={statLabelStyles}>Happy Clients</div>
            </div>
            <div style={statBoxStyles}>
              <div style={statNumberStyles}>500+</div>
              <div style={statLabelStyles}>Verified Agents</div>
            </div>
          </div>

          <div style={{ marginTop: "60px", opacity: 0.8 }}>
            <div style={{ fontSize: "13px", marginBottom: "12px" }}>
              Trusted by leading property companies
            </div>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ fontSize: "20px" }}>🏢</div>
              <div style={{ fontSize: "20px" }}>🏘️</div>
              <div style={{ fontSize: "20px" }}>🏗️</div>
              <div style={{ fontSize: "20px" }}>🏠</div>
            </div>
          </div>
        </div>
      </div>

      <div style={rightPanelStyles}>
        <div style={formContainerStyles}>
          <div style={logoContainerStyles}>
            <img src="/logo.svg" alt="AFGOG Property" style={logoStyles} />
          </div>

          <h2 style={titleStyles}>Welcome Back</h2>
          <p style={subtitleStyles}>
            Sign in to access your property portfolio
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div style={inputWrapperStyles}>
              <InputText
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
              />
            </div>

            <div style={inputWrapperStyles}>
              <InputText
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#6b7280",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                Remember me
              </label>
              <a
                style={linkStyles}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </a>
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div style={trustBadgeStyles}>
              <span style={badgeIconStyles}>✓</span>
              <span style={badgeTextStyles}>
                Secure SSL Encrypted Connection
              </span>
            </div>

            <div style={footerStyles}>
              Don't have an account?{" "}
              <a style={linkStyles} onClick={() => navigate("/register")}>
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
