import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar/Navbar";
import { Card } from "@/components/Card/Card";
import { colors } from "@/theme/colorPalette";
import { useGetPropertiesQuery, PropertyData } from "@/services/property/api";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [activeTab, setActiveTab] = useState("Buy");

  // Fetch properties from API
  const { data: propertiesData, isLoading, isError } = useGetPropertiesQuery();

  // Transform API data to match the component's expected format
  const featuredProperties = useMemo(() => {
    if (!propertiesData?.data) return [];
    return propertiesData.data
      .filter((prop: PropertyData) => prop.approved)
      .slice(0, 4)
      .map((prop: PropertyData) => ({
        id: prop._id,
        title: prop.title.toUpperCase(),
        price: prop.price,
        location: prop.address,
        bedrooms: parseInt(prop.bedroom) || 0,
        image:
          prop.mainImage ||
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
        type: prop.type,
      }));
  }, [propertiesData]);

  // Luxury homes - using approved properties with higher prices
  const luxuryHomes = useMemo(() => {
    if (!propertiesData?.data) return [];
    return propertiesData.data
      .filter((prop: PropertyData) => prop.approved)
      .slice(4, 8)
      .map((prop: PropertyData) => ({
        id: prop._id,
        title: prop.title.toUpperCase(),
        price: prop.price,
        location: prop.address,
        area: prop.address.split(",").slice(-1)[0]?.trim() || "Lagos",
        bedrooms: parseInt(prop.bedroom) || 0,
        image:
          prop.mainImage ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      }));
  }, [propertiesData]);

  // Neighborhood guide
  const neighborhoods = [
    {
      name: "Lagos",
      coordinates: "6° 27' 4.104\" N 3° 23' 18.24\" E",
      image:
        "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=300&h=200&fit=crop",
    },
    {
      name: "Abuja",
      coordinates: "9° 4' 35.3244\" N 7° 23' 54.8664\" E",
      image:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
    },
    {
      name: "Port Harcourt",
      coordinates: "4° 46' 17.364\" N 7° 0' 51.66\" E",
      image:
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=300&h=200&fit=crop",
    },
    {
      name: "Delta",
      coordinates: "6° 11' 9.18\" N 6° 43' 46.95\" E",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
    },
    {
      name: "Ibadan",
      coordinates: "7° 20' 55.392'' N 3° 52' 45.444'' E",
      image:
        "https://images.unsplash.com/photo-1589378218726-89a0bb4d9aea?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section with Search */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=600&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            marginBottom: "20px",
            margin: 0,
          }}
        >
          Search for your Next Property here
        </h1>

        {/* Search Bar */}
        <div
          style={{
            maxWidth: "900px",
            margin: "40px auto 0",
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
            {["Buy", "Rent", "Short Let", "Land"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "15px 20px",
                  border: "none",
                  background:
                    activeTab === tab ? colors.primary : "transparent",
                  color: activeTab === tab ? "#fff" : "#666",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", padding: "10px" }}>
            <input
              type="text"
              placeholder="Search by location, property name..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{
                flex: 1,
                padding: "15px 20px",
                border: "none",
                fontSize: "16px",
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "15px 40px",
                background: colors.primary,
                border: "none",
                color: "#fff",
                fontWeight: "700",
                fontSize: "16px",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Homes Section */}
      <section
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#333",
              margin: 0,
            }}
          >
            Featured properties
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

        {isLoading && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "18px", color: "#666" }}>
              Loading properties...
            </div>
          </div>
        )}

        {!isLoading && !isError && featuredProperties.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {featuredProperties.map((property) => (
              <Card
                key={property.id}
                onClick={() => navigate(`/properties/${property.id}`)}
                style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginBottom: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    {property.bedrooms} bedroom {property.type}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#333",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {property.title}
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                      color: colors.primary,
                      marginBottom: "8px",
                    }}
                  >
                    {property.price}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#888",
                      textTransform: "capitalize",
                    }}
                  >
                    {property.location}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Market Overview Section */}
      {/* <section style={{ background: "#fff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            Market Overview of Nigeria
          </h2>
          <p style={{ color: "#666", marginBottom: "40px" }}>01/2026</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: colors.primary,
                  marginBottom: "20px",
                }}
              >
                Top Gainers
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {[
                  {
                    location: "MetaLand estate",
                    change: "1066.67%",
                    price: "₦35,000,000/month",
                  },
                  {
                    location: "Uyo Akwa",
                    change: "1900.00%",
                    price: "₦30,000,000",
                  },
                  {
                    location: "Aviance Delta",
                    change: "400.00%",
                    price: "₦15,000,000",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "15px",
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        {item.location}
                      </div>
                      <div style={{ fontSize: "13px", color: "#888" }}>
                        {item.price}
                      </div>
                    </div>
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#22c55e",
                        fontSize: "16px",
                      }}
                    >
                      +{item.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#ef4444",
                  marginBottom: "20px",
                }}
              >
                Top Losers
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {[
                  {
                    location: "Palmgroove",
                    change: "60.00%",
                    price: "₦2,000,000/year",
                  },
                  {
                    location: "Wuye Abuja",
                    change: "99.85%",
                    price: "₦1,500,000/year",
                  },
                  {
                    location: "Rumuodumaya",
                    change: "90.00%",
                    price: "₦25,000,000",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "15px",
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        {item.location}
                      </div>
                      <div style={{ fontSize: "13px", color: "#888" }}>
                        {item.price}
                      </div>
                    </div>
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#ef4444",
                        fontSize: "16px",
                      }}
                    >
                      -{item.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Luxury Homes Section */}
      <section
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#333",
              margin: 0,
            }}
          >
            Luxury homes
          </h2>
          <a
            href="/properties?luxury=true"
            style={{
              color: colors.primary,
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            See all for sale
          </a>
        </div>

        {!isLoading && !isError && luxuryHomes.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {luxuryHomes.map((property) => (
              <Card
                key={property.id}
                onClick={() => navigate(`/properties/${property.id}`)}
                style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginBottom: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    {property.bedrooms} bedroom House for sale{" "}
                    {property.location}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#333",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {property.title}
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                      color: colors.primary,
                      marginBottom: "8px",
                    }}
                  >
                    {property.price}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#888",
                      textTransform: "capitalize",
                    }}
                  >
                    {property.area}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Neighbourhood Guide Section */}
      <section style={{ background: "#fff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "40px",
            }}
          >
            Neighbourhood Guide
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {neighborhoods.map((area, idx) => (
              <Card
                key={idx}
                onClick={() => navigate(`/properties?location=${area.name}`)}
                style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}
              >
                <img
                  src={area.image}
                  alt={area.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    {area.name}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
                    {area.coordinates}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <section
        style={{
          background: colors.primary,
          padding: "60px 20px",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              15,000+
            </div>
            <div style={{ fontSize: "16px", opacity: 0.9 }}>
              Properties Listed
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              8,500+
            </div>
            <div style={{ fontSize: "16px", opacity: 0.9 }}>Happy Clients</div>
          </div>
          <div>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              750+
            </div>
            <div style={{ fontSize: "16px", opacity: 0.9 }}>
              Verified Agents
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              50+
            </div>
            <div style={{ fontSize: "16px", opacity: 0.9 }}>Cities Covered</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#1a1a1a",
          color: "#fff",
          padding: "60px 20px 30px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                AFGOG
              </h3>
              <p style={{ color: "#999", lineHeight: "1.6", fontSize: "14px" }}>
                Discover the most rapidly expanding real estate platform. When
                you choose us, you'll experience a seamless journey while
                searching for homes.
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                Properties For Sale
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Commercial Properties",
                  "Flat & Apartments",
                  "Houses",
                  "Block Of Flats",
                ].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <a
                      href="#"
                      style={{
                        color: "#999",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                Properties For Rent
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Commercial Properties",
                  "Flat & Apartments",
                  "Mini Flats",
                  "Houses",
                ].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <a
                      href="#"
                      style={{
                        color: "#999",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                Company
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "About Us",
                  "Blog",
                  "Terms And Conditions",
                  "Privacy Policy",
                ].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <a
                      href="#"
                      style={{
                        color: "#999",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #333",
              paddingTop: "30px",
              textAlign: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            © AFGOG — 2026
          </div>
        </div>
      </footer>
    </div>
  );
};
