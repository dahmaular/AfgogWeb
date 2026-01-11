import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar/Navbar";
import { Card } from "@/components/Card/Card";
import { Button } from "@/components/Button/Button";
import { colors } from "@/theme/colorPalette";
import { useGetSinglePropertyQuery } from "@/services/property/api";

export const PropertyDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch property data from API
  const {
    data: propertyData,
    isLoading,
    isError,
  } = useGetSinglePropertyQuery(id || "");

  // Transform API data to component format
  const property = useMemo(() => {
    if (!propertyData?.data) {
      // Fallback data
      return {
        id: id || "0NQEJ",
        title: "Luxury 3 Bedroom Apartment",
        price: "₦ 200,000/day",
        bedrooms: 3,
        bathrooms: 3,
        toilets: 3,
        location: "Lekki Phase 2 Lekki Lagos",
        type: "3 bedroom Flat / Apartment for shortlet",
        lastUpdated: new Date().toISOString(),
        agent: {
          name: "Mimieshortlet Services",
          phone: "091676***",
          whatsapp: "2349167600033",
        },
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        ],
        description: "Property details loading...",
        features: [],
      };
    }

    const apiData = propertyData.data;
    return {
      id: apiData._id,
      title: apiData.title,
      price: apiData.price,
      bedrooms: parseInt(apiData.bedroom) || 0,
      bathrooms: parseInt(apiData.bathroom) || 0,
      toilets: parseInt(apiData.bathroom) || 0,
      location: apiData.address,
      type: apiData.type,
      lastUpdated: apiData.dateModified || apiData.dateCreated,
      agent: {
        name: "Afgog Property Agent",
        phone: "091676***",
        whatsapp: "2349167600033",
      },
      images: apiData.images.length > 0 ? apiData.images : [apiData.mainImage],
      description: apiData.description,
      features: [
        "24 hours Electricity",
        "Fast Internet",
        "24 Hours Security",
        "Parking Space",
        "Water Treatment",
      ],
    };
  }, [propertyData, id]);

  const similarProperties = [
    {
      id: 1,
      title: "2&3 BEDROOM FLAT",
      price: "₦ 140,000/year",
      location: "Lekki phase 1 Lekki Phase 1 Lekki Lagos",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "3 BEDROOM FLAT",
      price: "₦ 200,000/day",
      location: "Lekki Phase 2 Lekki Lagos",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "2/ 3 BEDROOM POOL",
      price: "₦ 250,000/day",
      location: "Lekki Phase 1 Lekki Lagos",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "2 BEDROOM SHORTLET",
      price: "₦ 250,000/day",
      location: "Lekki Phase 1 Lekki Lagos",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />

      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "100px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "12px",
            }}
          >
            Loading property details...
          </div>
          <div style={{ fontSize: "16px", color: "#666" }}>
            Please wait while we fetch the property information
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "100px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#e53e3e",
              marginBottom: "12px",
            }}
          >
            Failed to load property
          </div>
          <div
            style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}
          >
            We couldn't find this property. It may have been removed or the ID
            is incorrect.
          </div>
          <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
      )}

      {/* Property Content */}
      {!isLoading && !isError && (
        <>
          {/* Breadcrumb */}
          <div
            style={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e5e7eb",
              padding: "12px 0",
            }}
          >
            <div
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 24px",
                display: "flex",
                gap: "8px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              <span
                onClick={() => navigate("/")}
                style={{ cursor: "pointer", color: colors.primary }}
              >
                Home
              </span>
              <span>/</span>
              <span>Property for short_let in Lagos</span>
              <span>/</span>
              <span>Flat Apartment for short_let in Lekki</span>
            </div>
          </div>

          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "40px 24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 400px",
                gap: "32px",
              }}
            >
              {/* Main Content */}
              <div>
                {/* Image Gallery */}
                <div style={{ marginBottom: "32px" }}>
                  <div style={{ position: "relative", marginBottom: "16px" }}>
                    <img
                      src={property.images[selectedImage]}
                      alt={property.title}
                      style={{
                        width: "100%",
                        height: "500px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                    <button
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "rgba(255,255,255,0.9)",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      ❤️ Save to Favourites
                    </button>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(5, 1fr)",
                      gap: "12px",
                    }}
                  >
                    {property.images.slice(0, 5).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`View ${idx + 1}`}
                        onClick={() => setSelectedImage(idx)}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                          border:
                            selectedImage === idx
                              ? `3px solid ${colors.primary}`
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Property Title and Price */}
                <div style={{ marginBottom: "32px" }}>
                  <h1
                    style={{
                      fontSize: "36px",
                      fontWeight: "700",
                      color: "#1f2937",
                      marginBottom: "16px",
                    }}
                  >
                    {property.title}
                  </h1>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: colors.primary,
                      marginBottom: "16px",
                    }}
                  >
                    {property.price}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>🛏️</span>
                      <span style={{ fontWeight: "600" }}>
                        {property.bedrooms} Beds
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>🚿</span>
                      <span style={{ fontWeight: "600" }}>
                        {property.bathrooms} Baths
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>🚽</span>
                      <span style={{ fontWeight: "600" }}>
                        {property.toilets} Toilets
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <Card style={{ marginBottom: "32px", padding: "32px" }}>
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      marginBottom: "20px",
                    }}
                  >
                    Description
                  </h2>
                  <div
                    style={{
                      whiteSpace: "pre-line",
                      lineHeight: "1.8",
                      color: "#4b5563",
                    }}
                  >
                    {property.description}
                  </div>
                </Card>

                {/* Features */}
                <Card style={{ marginBottom: "32px", padding: "32px" }}>
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      marginBottom: "20px",
                    }}
                  >
                    Features
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                    }}
                  >
                    {property.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{ color: colors.primary, fontSize: "18px" }}
                        >
                          ✓
                        </span>
                        <span style={{ fontSize: "14px", color: "#4b5563" }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Safety Tips */}
                <Card
                  style={{
                    backgroundColor: "#fef3c7",
                    padding: "24px",
                    border: "2px solid #fbbf24",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      marginBottom: "16px",
                      color: "#92400e",
                    }}
                  >
                    ⚠️ Safety Tips
                  </h3>
                  <ol
                    style={{
                      paddingLeft: "20px",
                      lineHeight: "1.8",
                      color: "#78350f",
                    }}
                  >
                    <li>
                      Do not make any inspection fee without seeing the agent
                      and property.
                    </li>
                    <li>
                      Only pay Rental fee, Sales fee or any upfront payment
                      after you verify the Landlord.
                    </li>
                    <li>Ensure you meet the Agent in an open location.</li>
                    <li>
                      The Agent does not represent AFGOG and AFGOG is not liable
                      for any monetary transaction between you and the Agent.
                    </li>
                  </ol>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                {/* Contact Agent Card */}
                <Card
                  style={{
                    padding: "0",
                    marginBottom: "24px",
                    position: "sticky",
                    top: "100px",
                    overflow: "hidden",
                  }}
                >
                  {/* Agent Header with Cover */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                      padding: "24px 24px 60px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(255,255,255,0.95)",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: colors.secondary,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ color: "#22c55e" }}>●</span> Active Now
                    </div>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#fff",
                        marginBottom: "4px",
                      }}
                    >
                      Contact Agent
                    </h3>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.85)",
                        margin: 0,
                      }}
                    >
                      Quick response • Professional service
                    </p>
                  </div>

                  {/* Agent Profile */}
                  <div
                    style={{
                      padding: "0 24px",
                      marginTop: "-50px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px",
                          fontSize: "48px",
                          border: "4px solid #fff",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                          backgroundImage:
                            "url(https://ui-avatars.com/api/?name=Mimie+Services&size=100&background=667eea&color=fff&bold=true)",
                          backgroundSize: "cover",
                        }}
                      ></div>
                      <div
                        style={{
                          fontWeight: "800",
                          fontSize: "18px",
                          marginBottom: "6px",
                          color: "#1f2937",
                        }}
                      >
                        {property.agent.name}
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          background: "#ecfdf5",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#059669",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>✓</span> Verified
                        Agent
                      </div>

                      {/* Agent Stats */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "12px",
                          marginTop: "16px",
                          padding: "16px",
                          background: "#f9fafb",
                          borderRadius: "12px",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontWeight: "800",
                              fontSize: "18px",
                              color: colors.primary,
                            }}
                          >
                            245
                          </div>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>
                            Properties
                          </div>
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            borderLeft: "1px solid #e5e7eb",
                            borderRight: "1px solid #e5e7eb",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: "800",
                              fontSize: "18px",
                              color: colors.primary,
                            }}
                          >
                            4.9
                          </div>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>
                            Rating ⭐
                          </div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontWeight: "800",
                              fontSize: "18px",
                              color: colors.primary,
                            }}
                          >
                            3yrs
                          </div>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>
                            Experience
                          </div>
                        </div>
                      </div>

                      {/* Quick Contact Buttons */}
                      <div style={{ marginTop: "20px" }}>
                        <Button
                          fullWidth
                          style={{
                            marginBottom: "10px",
                            background: `linear-gradient(135deg, ${colors.primary} 0%, #a57844 100%)`,
                            border: "none",
                            boxShadow: "0 4px 12px rgba(201, 136, 72, 0.3)",
                            fontSize: "15px",
                            padding: "14px",
                          }}
                          onClick={() => alert(`Call: ${property.agent.phone}`)}
                        >
                          📞 Call {property.agent.phone}
                        </Button>

                        <Button
                          fullWidth
                          variant="outline"
                          style={{
                            marginBottom: "10px",
                            background: "#25D366",
                            color: "#fff",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                            fontSize: "15px",
                            padding: "14px",
                          }}
                          onClick={() =>
                            window.open(
                              `https://wa.me/${property.agent.whatsapp}`,
                              "_blank"
                            )
                          }
                        >
                          💬 WhatsApp Chat
                        </Button>

                        <Button
                          fullWidth
                          variant="outline"
                          style={{
                            borderColor: "#e5e7eb",
                            color: "#6b7280",
                            fontSize: "14px",
                            padding: "12px",
                          }}
                          onClick={() =>
                            navigate(`/agent/${property.agent.name}`)
                          }
                        >
                          👁️ View All Properties
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Property Address Section */}
                  <div
                    style={{
                      padding: "20px 24px",
                      background: "#fafafa",
                      borderTop: "1px solid #e5e7eb",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        marginBottom: "12px",
                        color: "#374151",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      📍 Property Location
                    </h4>
                    <div
                      style={{
                        fontSize: "14px",
                        marginBottom: "12px",
                        color: "#1f2937",
                        fontWeight: "500",
                      }}
                    >
                      {property.location}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px",
                        background: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        marginTop: "12px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#6b7280",
                            marginBottom: "2px",
                          }}
                        >
                          Property ID
                        </div>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            color: colors.primary,
                          }}
                        >
                          {property.id}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#6b7280",
                            marginBottom: "2px",
                          }}
                        >
                          Last Updated
                        </div>
                        <div style={{ fontSize: "11px", color: "#1f2937" }}>
                          Dec 5, 2025
                        </div>
                      </div>
                    </div>

                    {/* Response Time Badge */}
                    <div
                      style={{
                        marginTop: "16px",
                        padding: "12px",
                        background:
                          "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>⚡</span>
                      <div>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#92400e",
                          }}
                        >
                          Fast Response
                        </div>
                        <div style={{ fontSize: "11px", color: "#78350f" }}>
                          Typically replies within 5 minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Property Verified Badge */}
                <Card
                  style={{
                    padding: "20px",
                    background: "#f0fdf4",
                    border: "2px solid #22c55e",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>🛡️</span>
                    <div>
                      <div
                        style={{
                          fontWeight: "700",
                          color: "#166534",
                          marginBottom: "4px",
                        }}
                      >
                        Property is verified as real
                      </div>
                      <div style={{ fontSize: "12px", color: "#166534" }}>
                        If reported as fake, we'll investigate to confirm if
                        this listing isn't real.
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Recommended Properties */}
            <section style={{ marginTop: "60px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h2 style={{ fontSize: "28px", fontWeight: "700" }}>
                  Recommended Properties
                </h2>
                <a
                  href="/properties"
                  style={{
                    color: colors.primary,
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  See all
                </a>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "24px",
                }}
              >
                {similarProperties.map((prop) => (
                  <Card
                    key={prop.id}
                    onClick={() => navigate(`/properties/${prop.id}`)}
                    style={{
                      padding: 0,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={prop.image}
                      alt={prop.title}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "16px" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#1f2937",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                        }}
                      >
                        {prop.title}
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "800",
                          color: colors.primary,
                          marginBottom: "8px",
                        }}
                      >
                        {prop.price}
                      </div>
                      <div style={{ fontSize: "13px", color: "#6b7280" }}>
                        {prop.location}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};
