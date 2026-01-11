import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreatePropertyMutation } from "@/services/property/api";
import { InputText } from "@/components/Inputs/InputText";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";
import { toast } from "react-toastify";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      categoryId: "",
      address: "",
      type: "sale",
      description: "",
      condition: "new",
      images: "",
      mainImage: "",
      agentId: "",
      price: "",
      bedroom: "",
      bathroom: "",
      size: "",
      facilities: "",
      carModel: "",
      carYear: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
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

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setMainImagePreview(base64);
        formik.setFieldValue("mainImage", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews: string[] = [];
      const base64Images: string[] = [];

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          previews.push(base64);
          base64Images.push(base64);

          if (index === files.length - 1) {
            setImagesPreview(previews);
            formik.setFieldValue("images", base64Images.join(","));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const isVehicle =
    formik.values.categoryId === "vehicle" ||
    formik.values.categoryId === "car";

  const containerStyles: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
    padding: "40px 20px",
  };

  const headerStyles: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "40px",
  };

  const mainTitleStyles: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "900",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "12px",
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: "18px",
    color: "#6b7280",
    fontWeight: "400",
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

  const stepStyles = (stepNumber: number): React.CSSProperties => ({
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
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
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

  const uploadAreaStyles: React.CSSProperties = {
    border: "2px dashed #e5e7eb",
    borderRadius: "12px",
    padding: "32px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "#fafafa",
  };

  const uploadIconStyles: React.CSSProperties = {
    fontSize: "48px",
    marginBottom: "16px",
  };

  const uploadTextStyles: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  };

  const uploadHintStyles: React.CSSProperties = {
    fontSize: "14px",
    color: "#9ca3af",
  };

  const imagePreviewContainerStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  };

  const imagePreviewStyles: React.CSSProperties = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
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
          >
            <option value="">Select category</option>
            <option value="residential">🏠 Residential</option>
            <option value="commercial">🏢 Commercial</option>
            <option value="land">🌳 Land</option>
            {/* <option value="vehicle">🚗 Vehicle</option> */}
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
        type="number"
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
              type="number"
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
              type="number"
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

      {isVehicle && (
        <div style={gridStyles}>
          <InputText
            label="Car Model"
            name="carModel"
            placeholder="e.g., Toyota Camry"
            value={formik.values.carModel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.carModel && formik.errors.carModel
                ? formik.errors.carModel
                : ""
            }
          />
          <InputText
            label="Year"
            name="carYear"
            placeholder="e.g., 2022"
            value={formik.values.carYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.carYear && formik.errors.carYear
                ? formik.errors.carYear
                : ""
            }
          />
        </div>
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
      <h3 style={sectionTitleStyles}>📸 Property Images</h3>
      <p style={sectionSubtitleStyles}>
        Upload high-quality images to showcase your property
      </p>

      <div style={inputWrapperStyles}>
        <label style={labelStyles}>Main Image (Cover Photo)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          style={{ display: "none" }}
          id="mainImage"
        />
        <label htmlFor="mainImage" style={uploadAreaStyles}>
          <div style={uploadIconStyles}>🖼️</div>
          <div style={uploadTextStyles}>
            {mainImagePreview ? "Change Main Image" : "Upload Main Image"}
          </div>
          <div style={uploadHintStyles}>
            Click to select a high-quality cover photo
          </div>
        </label>
        {mainImagePreview && (
          <div style={imagePreviewContainerStyles}>
            <img src={mainImagePreview} alt="Main" style={imagePreviewStyles} />
          </div>
        )}
      </div>

      <div style={inputWrapperStyles}>
        <label style={labelStyles}>Additional Images (Optional)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          style={{ display: "none" }}
          id="images"
        />
        <label htmlFor="images" style={uploadAreaStyles}>
          <div style={uploadIconStyles}>📷</div>
          <div style={uploadTextStyles}>
            {imagesPreview.length > 0
              ? `${imagesPreview.length} images selected`
              : "Upload Additional Images"}
          </div>
          <div style={uploadHintStyles}>
            Click to select multiple images (hold Ctrl/Cmd)
          </div>
        </label>
        {imagesPreview.length > 0 && (
          <div style={imagePreviewContainerStyles}>
            {imagesPreview.map((preview, idx) => (
              <img
                key={idx}
                src={preview}
                alt={`Preview ${idx}`}
                style={imagePreviewStyles}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "24px",
        }}
      >
        <div style={{ fontSize: "14px", color: "#166534", lineHeight: "1.6" }}>
          💡 <strong>Pro Tips:</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>Use high-resolution images (at least 1200px width)</li>
            <li>Show different angles and rooms</li>
            <li>Ensure good lighting in photos</li>
            <li>Include outdoor/exterior shots if applicable</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyles}>
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
            <div style={stepStyles(1)}>
              <div style={stepCircleStyles(1)}>1</div>
              <span style={stepLabelStyles(1)}>Basic Info</span>
            </div>
            <div style={stepStyles(2)}>
              <div style={stepCircleStyles(2)}>2</div>
              <span style={stepLabelStyles(2)}>Details</span>
            </div>
            <div style={stepStyles(3)}>
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
              <Button type="submit" disabled={isLoading} fullWidth>
                {isLoading ? "Creating Property..." : "🎉 Create Property"}
              </Button>
            )}
          </div>
        </form>
      </div>

      <style>
        {`
          input:focus, select:focus, textarea:focus {
            border-color: ${colors.primary} !important;
            box-shadow: 0 0 0 3px ${colors.primary}20;
          }
          
          label[for="mainImage"]:hover,
          label[for="images"]:hover {
            border-color: ${colors.primary};
            background: ${colors.primary}08;
          }
          
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};
