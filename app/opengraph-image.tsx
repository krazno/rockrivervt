import { ImageResponse } from "next/og";

import {
  HOME_OG_ALT,
  HOME_OG_DESCRIPTION_LINE,
  HOME_OG_TITLE_LINE,
} from "@/lib/seo";

export const alt = HOME_OG_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(165deg, #0f241c 0%, #1a4d3c 42%, #2d6b52 100%)",
          padding: 56,
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#f8faf8",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {HOME_OG_TITLE_LINE}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#c8e6d8",
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            {HOME_OG_DESCRIPTION_LINE}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", height: 14 }}>
            <div style={{ flex: 1, background: "#E40303" }} />
            <div style={{ flex: 1, background: "#FF8C00" }} />
            <div style={{ flex: 1, background: "#FFED00" }} />
            <div style={{ flex: 1, background: "#008026" }} />
            <div style={{ flex: 1, background: "#24408E" }} />
            <div style={{ flex: 1, background: "#732982" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", height: 10 }}>
            <div style={{ flex: 1, background: "#5BCEFA" }} />
            <div style={{ flex: 1, background: "#F5A9B8" }} />
            <div style={{ flex: 1, background: "#FFFFFF" }} />
            <div style={{ flex: 1, background: "#5BCEFA" }} />
            <div style={{ flex: 1, background: "#F5A9B8" }} />
            <div style={{ flex: 1, background: "#FFFFFF" }} />
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 22,
              fontWeight: 600,
              color: "#9ed4bc",
            }}
          >
            rockrivervt.com · Newfane · Windham County, Vermont
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
