import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090C",
          color: "#F4F1EA",
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          borderRadius: 7,
        }}
      >
        {profile.monogram}
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: 99,
            background: "#FF6A3D",
            marginLeft: 1,
            marginTop: 8,
          }}
        />
      </div>
    ),
    size,
  );
}
