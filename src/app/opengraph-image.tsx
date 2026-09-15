import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.fullName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card, generated from the same profile data as the page itself. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090C",
          backgroundImage:
            "radial-gradient(900px 500px at 78% 8%, rgba(255,106,61,0.20), transparent 60%), radial-gradient(700px 420px at 8% 92%, rgba(120,140,255,0.10), transparent 60%)",
          padding: "64px 72px",
          color: "#F4F1EA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 34, letterSpacing: "-0.03em" }}>{profile.monogram}</div>
            <div style={{ width: 7, height: 7, borderRadius: 99, background: "#FF6A3D" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 99,
              padding: "10px 18px",
              fontSize: 17,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#A5A7AD",
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: 99, background: "#FF6A3D" }} />
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {/* Reads the same headline the hero does, so the two never drift. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              maxWidth: 1000,
            }}
          >
            {profile.headline.map((part) => (
              <div
                key={part.text}
                style={{ display: "flex", ...(part.italic ? { color: "#FF6A3D" } : {}) }}
              >
                {part.text}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 30, letterSpacing: "-0.02em" }}>{profile.fullName}</div>
            <div style={{ fontSize: 21, color: "#A5A7AD" }}>{profile.role}</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7C7F87",
            }}
          >
            {profile.siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
