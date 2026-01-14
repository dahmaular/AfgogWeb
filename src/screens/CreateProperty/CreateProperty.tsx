import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreatePropertyMutation,
  useGetCategoriesQuery,
} from "@/services/property/api";
import { InputText } from "@/components/Inputs/InputText";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";
import { toast } from "react-toastify";
import { uploadImageToFirebase } from "@/services/firebase";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),
  categoryId: Yup.string().required("Category is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  type: Yup.string().required("Property type is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  condition: Yup.string().required("Condition is required"),
  price: Yup.string().required("Price is required"),
  bedroom: Yup.string(),
  bathroom: Yup.string(),
  size: Yup.string(),
  facilities: Yup.string(),
});

export const CreateProperty: React.FC = () => {
  const navigate = useNavigate();
  const [createProperty, { isLoading }] = useCreatePropertyMutation();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [currentStep, setCurrentStep] = useState(1);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  console.log("Categories Data:", categoriesData);

  const formik = useFormik({
    initialValues: {
      title: "",
      categoryId: "",
      address: "",
      type: "sale",
      description: "",
      condition: "new",
      images: [],
      mainImage: "",
      agentId: "12345",
      price: "",
      bedroom: "",
      bathroom: "",
      size: "",
      facilities: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!values.agentId) values.agentId = "12345";
        console.log("values", values);
        const response = await createProperty(values).unwrap();
        console.log("create property response", response);
        if (response.isSuccess) {
          toast.success("Property created successfully!");
          navigate("/properties");
        } else {
          toast.error(response.message || "Failed to create property");
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message || "Failed to create property. Please try again."
        );
      }
    },
  });

  const handleMainImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const path = `properties/${Date.now()}_${file.name}`;
        const downloadURL = await uploadImageToFirebase(file, path);
        setMainImagePreview(URL.createObjectURL(file)); // For preview
        formik.setFieldValue("mainImage", downloadURL);
        toast.success("Main image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload main image. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploading(true);
      try {
        const previews: string[] = [];
        const urls: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const path = `properties/${Date.now()}_${file.name}`;
          const downloadURL = await uploadImageToFirebase(file, path);
          previews.push(URL.createObjectURL(file));
          urls.push(downloadURL);
        }

        setImagesPreview(previews);
        formik.setFieldValue("images", urls);
        toast.success(`${files.length} images uploaded successfully!`);
      } catch (error) {
        toast.error("Failed to upload images. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const isVehicle =
    formik.values.categoryId === "vehicle" ||
    formik.values.categoryId === "car";

  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  };

  const backgroundPatternStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.02) 0%, transparent 50%)",
    zIndex: 0,
  };

  const headerStyles: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "40px",
    position: "relative",
    zIndex: 1,
  };

  const mainTitleStyles: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "900",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "12px",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    animation: "fadeInUp 1s ease-out",
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: "18px",
    color: "#6b7280",
    fontWeight: "400",
    animation: "fadeInUp 1s ease-out 0.2s both",
  };

  const formWrapperStyles: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const progressBarContainerStyles: React.CSSProperties = {
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "32px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  };

  const stepsContainerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    position: "relative",
  };

  const stepStyles = (): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    zIndex: 2,
  });

  const stepCircleStyles = (stepNumber: number): React.CSSProperties => ({
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
    background:
      currentStep >= stepNumber
        ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
        : "#e5e7eb",
    color: currentStep >= stepNumber ? "#fff" : "#9ca3af",
    transition: "all 0.3s ease",
    border:
      currentStep === stepNumber ? `4px solid ${colors.primary}40` : "none",
  });

  const stepLabelStyles = (stepNumber: number): React.CSSProperties => ({
    fontSize: "14px",
    fontWeight: "600",
    color: currentStep >= stepNumber ? colors.primary : "#9ca3af",
    textAlign: "center",
  });

  const progressLineStyles: React.CSSProperties = {
    position: "absolute",
    top: "28px",
    left: "10%",
    right: "10%",
    height: "4px",
    background: "#e5e7eb",
    zIndex: 1,
  };

  const progressFillStyles: React.CSSProperties = {
    height: "100%",
    background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    width: `${((currentStep - 1) / 2) * 100}%`,
    transition: "width 0.3s ease",
  };

  const formCardStyles: React.CSSProperties = {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    animation: "slideInUp 0.8s ease-out",
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px",
  };

  const sectionSubtitleStyles: React.CSSProperties = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "32px",
  };

  const gridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "24px",
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

  const selectStyles: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    background: "#fff",
  };

  const textareaStyles: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    minHeight: "120px",
    resize: "vertical",
  };

  const buttonGroupStyles: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
    justifyContent: currentStep === 1 ? "flex-end" : "space-between",
  };

  const backButtonStyles: React.CSSProperties = {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: `2px solid ${colors.primary}`,
    background: "#fff",
    color: colors.primary,
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const facilityTagStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "#f3f4f6",
    borderRadius: "20px",
    fontSize: "14px",
    margin: "4px",
  };

  const renderStep1 = () => (
    <div style={formCardStyles}>
      <h3 style={sectionTitleStyles}>📝 Basic Information</h3>
      <p style={sectionSubtitleStyles}>
        Let's start with the essential details about your property
      </p>

      <InputText
        label="Property Title"
        name="title"
        placeholder="e.g., Luxury 3 Bedroom Apartment in Lekki"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.title && formik.errors.title ? formik.errors.title : ""
        }
      />

      <div style={gridStyles}>
        <div>
          <label style={labelStyles}>Category</label>
          <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={selectStyles}
            disabled={categoriesLoading}
          >
            <option value="">
              {categoriesLoading ? "Loading categories..." : "Select category"}
            </option>
            {categoriesData?.data?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.touched.categoryId && formik.errors.categoryId && (
            <div
              style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px" }}
            >
              {formik.errors.categoryId}
            </div>
          )}
        </div>

        <div>
          <label style={labelStyles}>Listing Type</label>
          <select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={selectStyles}
          >
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="lease">For Lease</option>
          </select>
        </div>
      </div>

      <InputText
        label="Address"
        name="address"
        placeholder="Full property address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.address && formik.errors.address
            ? formik.errors.address
            : ""
        }
      />

      <div style={inputWrapperStyles}>
        <label style={labelStyles}>Description</label>
        <textarea
          name="description"
          placeholder="Describe your property in detail..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={textareaStyles}
        />
        {formik.touched.description && formik.errors.description && (
          <div style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px" }}>
            {formik.errors.description}
          </div>
        )}
      </div>

      <div>
        <label style={labelStyles}>Condition</label>
        <select
          name="condition"
          value={formik.values.condition}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={selectStyles}
        >
          <option value="new">✨ New</option>
          <option value="excellent">⭐ Excellent</option>
          <option value="good">👍 Good</option>
          <option value="fair">👌 Fair</option>
          <option value="needs-renovation">🔧 Needs Renovation</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={formCardStyles}>
      <h3 style={sectionTitleStyles}>🏡 Property Details</h3>
      <p style={sectionSubtitleStyles}>
        Add specific details and features of your property
      </p>

      <InputText
        label={`Price (₦)`}
        name="price"
        type="text"
        placeholder="e.g., 45000000"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.price && formik.errors.price ? formik.errors.price : ""
        }
      />

      {!isVehicle && (
        <>
          <div style={gridStyles}>
            <InputText
              label="Bedrooms"
              name="bedroom"
              type="text"
              placeholder="Number of bedrooms"
              value={formik.values.bedroom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bedroom && formik.errors.bedroom
                  ? formik.errors.bedroom
                  : ""
              }
            />
            <InputText
              label="Bathrooms"
              name="bathroom"
              type="text"
              placeholder="Number of bathrooms"
              value={formik.values.bathroom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bathroom && formik.errors.bathroom
                  ? formik.errors.bathroom
                  : ""
              }
            />
          </div>

          <InputText
            label="Size (sq ft)"
            name="size"
            placeholder="e.g., 2500"
            value={formik.values.size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.size && formik.errors.size
                ? formik.errors.size
                : ""
            }
          />

          <div style={inputWrapperStyles}>
            <label style={labelStyles}>Facilities & Amenities</label>
            <textarea
              name="facilities"
              placeholder="e.g., Swimming Pool, Gym, 24/7 Security, Parking (comma-separated)"
              value={formik.values.facilities}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={textareaStyles}
            />
            <div style={{ marginTop: "12px" }}>
              {formik.values.facilities
                .split(",")
                .filter((f) => f.trim())
                .map((facility, idx) => (
                  <span key={idx} style={facilityTagStyles}>
                    ✓ {facility.trim()}
                  </span>
                ))}
            </div>
          </div>
        </>
      )}

      <InputText
        label="Agent ID (Optional)"
        name="agentId"
        placeholder="Your agent ID if applicable"
        value={formik.values.agentId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>
  );

  const renderStep3 = () => (
    <div style={formCardStyles}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19Z"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 15L16 10L5 21"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          Property Gallery
        </h3>
        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          Showcase your property with stunning visuals that capture its true
          essence
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          marginBottom: "48px",
        }}
      >
        {/* Main Image Upload */}
        <div style={{ position: "relative" }}>
          <div style={{ marginBottom: "16px" }}>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "4px",
              }}
            >
              Cover Photo
            </h4>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              The hero image that represents your property
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            style={{ display: "none" }}
            id="mainImage"
          />
          <label
            htmlFor="mainImage"
            style={{
              display: "block",
              width: "100%",
              height: "200px",
              border: mainImagePreview ? "none" : "2px dashed #d1d5db",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: mainImagePreview
                ? "transparent"
                : "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {mainImagePreview ? (
              <img
                src={mainImagePreview}
                alt="Cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "20px",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginBottom: "16px", color: "#9ca3af" }}
                >
                  <path
                    d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 12H16V14H8V12ZM8 16H16V18H8V16ZM8 8H10V10H8V8Z"
                    fill="currentColor"
                  />
                </svg>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Upload Cover Photo
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    textAlign: "center",
                  }}
                >
                  High-resolution image recommended
                </div>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(255,255,255,0.9)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                  fill="#374151"
                />
                <path
                  d="M8 12H16V14H8V12ZM8 16H16V18H8V16ZM8 8H10V10H8V8Z"
                  fill="#374151"
                />
              </svg>
            </div>
          </label>
        </div>

        {/* Additional Images Upload */}
        <div style={{ position: "relative" }}>
          <div style={{ marginBottom: "16px" }}>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "4px",
              }}
            >
              Gallery Images
            </h4>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Showcase different angles and features
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            style={{ display: "none" }}
            id="images"
          />
          <label
            htmlFor="images"
            style={{
              display: "block",
              width: "100%",
              height: "200px",
              border: imagesPreview.length > 0 ? "none" : "2px dashed #d1d5db",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background:
                imagesPreview.length > 0
                  ? "transparent"
                  : "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {imagesPreview.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "8px",
                  height: "100%",
                  padding: "8px",
                }}
              >
                {imagesPreview.slice(0, 4).map((preview, idx) => (
                  <img
                    key={idx}
                    src={preview}
                    alt={`Gallery ${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
                {imagesPreview.length > 4 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      background: "rgba(0,0,0,0.7)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    +{imagesPreview.length - 4} more
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "20px",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginBottom: "16px", color: "#9ca3af" }}
                >
                  <path
                    d="M22 16V4C22 2.9 21.1 2 20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16ZM11 12L13.03 14.71L16 11L20 16H8L11 12ZM2 6V20C2 21.1 2.9 22 4 22H18V20H4V6H2Z"
                    fill="currentColor"
                  />
                </svg>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Upload Gallery Images
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    textAlign: "center",
                  }}
                >
                  Multiple images supported
                </div>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(255,255,255,0.9)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16V4C22 2.9 21.1 2 20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16ZM11 12L13.03 14.71L16 11L20 16H8L11 12ZM2 6V20C2 21.1 2.9 22 4 22H18V20H4V6H2Z"
                  fill="#374151"
                />
              </svg>
            </div>
          </label>
        </div>
      </div>

      {/* Upload Status */}
      {uploading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "#f0f9ff",
            border: "1px solid #0ea5e9",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "12px", color: "#0ea5e9" }}
          >
            <path
              d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
          <span
            style={{ fontSize: "14px", color: "#0c4a6e", fontWeight: "500" }}
          >
            Uploading images to cloud storage...
          </span>
        </div>
      )}

      {/* Tips */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
          marginTop: "32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#64748b", marginTop: "2px" }}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
              fill="currentColor"
            />
          </svg>
          <div>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#334155",
                marginBottom: "8px",
              }}
            >
              Photography Tips
            </h4>
            <div
              style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}
            >
              <p style={{ marginBottom: "8px" }}>
                • Use natural lighting and clean backgrounds
              </p>
              <p style={{ marginBottom: "8px" }}>
                • Capture wide shots and detailed close-ups
              </p>
              <p>• Include exterior views and key features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyles}>
      <div style={backgroundPatternStyles}></div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={headerStyles}>
          <h1 style={mainTitleStyles}>🏠 List Your Property</h1>
          <p style={subtitleStyles}>
            Fill in the details below to list your property on our platform
          </p>
        </div>

        <div style={formWrapperStyles}>
          <div style={progressBarContainerStyles}>
            <div style={stepsContainerStyles}>
              <div style={progressLineStyles}>
                <div style={progressFillStyles}></div>
              </div>
              <div style={stepStyles()}>
                <div style={stepCircleStyles(1)}>1</div>
                <span style={stepLabelStyles(1)}>Basic Info</span>
              </div>
              <div style={stepStyles()}>
                <div style={stepCircleStyles(2)}>2</div>
                <span style={stepLabelStyles(2)}>Details</span>
              </div>
              <div style={stepStyles()}>
                <div style={stepCircleStyles(3)}>3</div>
                <span style={stepLabelStyles(3)}>Images</span>
              </div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div style={buttonGroupStyles}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={backButtonStyles}
                >
                  ← Back
                </button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  fullWidth={currentStep === 1}
                >
                  Continue →
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || uploading}
                  fullWidth
                >
                  {isLoading || uploading
                    ? "Creating Property..."
                    : "🎉 Create Property"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          input:focus, select:focus, textarea:focus {
            border-color: ${colors.primary} !important;
            box-shadow: 0 0 0 3px ${colors.primary}20;
          }
          
          label[for="mainImage"]:hover,
          label[for="images"]:hover {
            border-color: ${colors.primary} !important;
            boxShadow: 0 0 0 2px ${colors.primary}20;
            transform: translateY(-2px);
          }
          
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
};
