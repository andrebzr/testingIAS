import { Img, staticFile } from "remotion";
export const Logo = ({
  image = false,
  width = 370,
}: {
  image?: boolean;
  width?: number;
}) =>
  image ? (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="logo-black-key" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 .7 .7 0 0"
            />
          </filter>
        </defs>
      </svg>
      <Img
        src={staticFile("products/logo.png")}
        style={{
          width,
          height: width * 0.5,
          objectFit: "contain",
          filter: "url(#logo-black-key)",
        }}
      />
    </>
  ) : (
    <div
      data-safe-text
      style={{
        width,
        fontSize: width * 0.27,
        fontWeight: 900,
        fontStyle: "italic",
        letterSpacing: -width * 0.018,
        lineHeight: 0.92,
        color: "#00c4e8",
      }}
    >
      VR
      <span
        style={{
          fontSize: width * 0.078,
          fontStyle: "normal",
          letterSpacing: width * 0.026,
          display: "block",
          paddingLeft: width * 0.065,
          marginTop: 14,
        }}
      >
        AUDIO
      </span>
    </div>
  );
