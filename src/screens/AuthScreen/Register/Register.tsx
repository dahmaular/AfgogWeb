import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "@/services/auth/api";
import { registerValidationSchema } from "@/utils/auth-validations";
import { InputText } from "@/components/Inputs/InputText";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";
import { toast } from "react-toastify";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      registrationType: "user",
      agencyName: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        // Transform form values to match API payload
        const payload = {
          fullName: `${values.firstName} ${values.lastName}`,
          email: values.email,
          phone: values.phoneNumber,
          password: values.password,
          isAgent: values.registrationType === "agent" ? "true" : "false",
          agencyName:
            values.registrationType === "agent" ? values.agencyName : "",
        };

        console.log("Registration payload:", payload);

        const response = await createUser(payload).unwrap();
        console.log("User created successfully", response);
        if (response.isSuccess) {
          toast.success("Registration successful! Please verify your email.");
          navigate(`/verify-email?email=${encodeURIComponent(values.email)}`);
        } else {
          toast.error(
            response.message || "Registration failed. Please try again."
          );
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message || "Registration failed. Please try again."
        );
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

  const benefitBoxStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "start",
    gap: "16px",
    marginBottom: "24px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const benefitIconStyles: React.CSSProperties = {
    fontSize: "32px",
    minWidth: "40px",
  };

  const benefitTextStyles: React.CSSProperties = {
    flex: 1,
  };

  const benefitTitleStyles: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "8px",
  };

  const benefitDescStyles: React.CSSProperties = {
    fontSize: "14px",
    opacity: 0.9,
    lineHeight: "1.5",
  };

  const rightPanelStyles: React.CSSProperties = {
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    overflowY: "auto",
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
    justifyContent: "center",
    gap: "8px",
    marginTop: "24px",
    padding: "12px",
    background: "#f0fdf4",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#166534",
  };

  const badgeIconStyles: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "700",
  };

  const badgeTextStyles: React.CSSProperties = {
    fontSize: "14px",
  };

  const registrationTypeContainerStyles: React.CSSProperties = {
    marginBottom: "24px",
  };

  const registrationTypeLabelStyles: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "12px",
    display: "block",
    letterSpacing: "0.3px",
  };

  const registrationTypeGridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  };

  const registrationTypeCardStyles = (
    isSelected: boolean
  ): React.CSSProperties => ({
    padding: "12px",
    borderRadius: "10px",
    border: `2px solid ${isSelected ? colors.primary : "#e5e7eb"}`,
    background: isSelected
      ? `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}08 100%)`
      : "#fafafa",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textAlign: "center",
    position: "relative",
    boxShadow: isSelected
      ? `0 4px 12px ${colors.primary}25`
      : "0 2px 4px rgba(0,0,0,0.04)",
    transform: isSelected ? "translateY(-2px)" : "none",
  });

  const registrationTypeIconStyles = (
    isSelected: boolean
  ): React.CSSProperties => ({
    fontSize: "24px",
    marginBottom: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: isSelected ? colors.primary : "#fff",
    transition: "all 0.3s ease",
  });

  const registrationTypeNameStyles = (
    isSelected: boolean
  ): React.CSSProperties => ({
    fontSize: "13px",
    fontWeight: "600",
    color: isSelected ? colors.primary : "#374151",
    letterSpacing: "0.2px",
  });

  const registrationTypeDescStyles: React.CSSProperties = {
    fontSize: "10px",
    color: "#9ca3af",
    marginTop: "2px",
    lineHeight: "1.3",
  };

  const getIconForType = (type: string, isSelected: boolean) => {
    const iconWrapperStyle: React.CSSProperties = {
      filter: isSelected ? "brightness(0) invert(1)" : "none",
    };

    switch (type) {
      case "user":
        return <span style={iconWrapperStyle}>🔍</span>;
      case "agent":
        return <span style={iconWrapperStyle}>🏆</span>;
      case "landlord":
        return <span style={iconWrapperStyle}>🏘️</span>;
      case "developer":
        return <span style={iconWrapperStyle}>🏗️</span>;
      default:
        return <span style={iconWrapperStyle}>👤</span>;
    }
  };

  const getDescForType = (type: string) => {
    switch (type) {
      case "user":
        return "Find your dream home";
      case "agent":
        return "Connect & close deals";
      case "landlord":
        return "List your properties";
      case "developer":
        return "Showcase projects";
      default:
        return "";
    }
  };

  return (
    <div style={containerStyles}>
      <div style={leftPanelStyles}>
        <div style={decorativeCircle1}></div>
        <div style={decorativeCircle2}></div>

        <div style={heroContentStyles}>
          <h1 style={heroTitleStyles}>🏘️ Start Your Property Journey</h1>
          <p style={heroSubtitleStyles}>
            Join thousands of property seekers and sellers on Nigeria's fastest
            growing real estate platform
          </p>

          <div style={benefitBoxStyles}>
            <div style={benefitIconStyles}>🔍</div>
            <div style={benefitTextStyles}>
              <h3 style={benefitTitleStyles}>Advanced Search</h3>
              <p style={benefitDescStyles}>
                Filter by location, price, amenities, and more to find your
                perfect property
              </p>
            </div>
          </div>

          <div style={benefitBoxStyles}>
            <div style={benefitIconStyles}>💾</div>
            <div style={benefitTextStyles}>
              <h3 style={benefitTitleStyles}>Save Favorites</h3>
              <p style={benefitDescStyles}>
                Bookmark properties you love and get instant updates on price
                changes
              </p>
            </div>
          </div>

          <div style={benefitBoxStyles}>
            <div style={benefitIconStyles}>📊</div>
            <div style={benefitTextStyles}>
              <h3 style={benefitTitleStyles}>Market Insights</h3>
              <p style={benefitDescStyles}>
                Access real-time market data and trends to make informed
                decisions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={rightPanelStyles}>
        <div style={formContainerStyles}>
          <div style={logoContainerStyles}>
            <img src="/logo.png" alt="Afgog Properties" style={logoStyles} />
          </div>

          <h2 style={titleStyles}>Create Account</h2>
          <p style={subtitleStyles}>
            Join our community and discover your dream property
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div style={registrationTypeContainerStyles}>
              <label style={registrationTypeLabelStyles}>I'M JOINING AS</label>
              <div style={registrationTypeGridStyles}>
                <div
                  style={registrationTypeCardStyles(
                    formik.values.registrationType === "user"
                  )}
                  onClick={() =>
                    formik.setFieldValue("registrationType", "user")
                  }
                >
                  <div
                    style={registrationTypeIconStyles(
                      formik.values.registrationType === "user"
                    )}
                  >
                    {getIconForType(
                      "user",
                      formik.values.registrationType === "user"
                    )}
                  </div>
                  <div
                    style={registrationTypeNameStyles(
                      formik.values.registrationType === "user"
                    )}
                  >
                    User
                  </div>
                  <div style={registrationTypeDescStyles}>
                    {getDescForType("user")}
                  </div>
                </div>
                <div
                  style={registrationTypeCardStyles(
                    formik.values.registrationType === "agent"
                  )}
                  onClick={() =>
                    formik.setFieldValue("registrationType", "agent")
                  }
                >
                  <div
                    style={registrationTypeIconStyles(
                      formik.values.registrationType === "agent"
                    )}
                  >
                    {getIconForType(
                      "agent",
                      formik.values.registrationType === "agent"
                    )}
                  </div>
                  <div
                    style={registrationTypeNameStyles(
                      formik.values.registrationType === "agent"
                    )}
                  >
                    Agent
                  </div>
                  <div style={registrationTypeDescStyles}>
                    {getDescForType("agent")}
                  </div>
                </div>
                <div
                  style={registrationTypeCardStyles(
                    formik.values.registrationType === "landlord"
                  )}
                  onClick={() =>
                    formik.setFieldValue("registrationType", "landlord")
                  }
                >
                  <div
                    style={registrationTypeIconStyles(
                      formik.values.registrationType === "landlord"
                    )}
                  >
                    {getIconForType(
                      "landlord",
                      formik.values.registrationType === "landlord"
                    )}
                  </div>
                  <div
                    style={registrationTypeNameStyles(
                      formik.values.registrationType === "landlord"
                    )}
                  >
                    Landlord
                  </div>
                  <div style={registrationTypeDescStyles}>
                    {getDescForType("landlord")}
                  </div>
                </div>
                <div
                  style={registrationTypeCardStyles(
                    formik.values.registrationType === "developer"
                  )}
                  onClick={() =>
                    formik.setFieldValue("registrationType", "developer")
                  }
                >
                  <div
                    style={registrationTypeIconStyles(
                      formik.values.registrationType === "developer"
                    )}
                  >
                    {getIconForType(
                      "developer",
                      formik.values.registrationType === "developer"
                    )}
                  </div>
                  <div
                    style={registrationTypeNameStyles(
                      formik.values.registrationType === "developer"
                    )}
                  >
                    Developer
                  </div>
                  <div style={registrationTypeDescStyles}>
                    {getDescForType("developer")}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <InputText
                label="First Name"
                name="firstName"
                placeholder="John"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : ""
                }
              />
              <InputText
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : ""
                }
              />
            </div>

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
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                placeholder="+234 800 000 0000"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : ""
                }
              />
            </div>

            {formik.values.registrationType === "agent" && (
              <div style={inputWrapperStyles}>
                <InputText
                  label="Agency Name"
                  name="agencyName"
                  placeholder="Enter your agency name"
                  value={formik.values.agencyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.agencyName && formik.errors.agencyName
                      ? formik.errors.agencyName
                      : ""
                  }
                />
              </div>
            )}

            <div style={inputWrapperStyles}>
              <InputText
                label="Password"
                type="password"
                name="password"
                placeholder="Create a strong password"
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

            <div style={inputWrapperStyles}>
              <InputText
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : ""
                }
              />
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div style={trustBadgeStyles}>
              <span style={badgeIconStyles}>✓</span>
              <span style={badgeTextStyles}>
                Your data is protected and encrypted
              </span>
            </div>

            <div style={footerStyles}>
              Already have an account?{" "}
              <a style={linkStyles} onClick={() => navigate("/login")}>
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
