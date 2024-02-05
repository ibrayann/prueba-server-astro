import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 1280 1000"
    backgroundColor="#DDDFE0"
    foregroundColor="#CECECE"
    className="mt-20"
  >
    <rect x="4" y="13" rx="3" ry="3" width="100%" height="10%" />
    <rect x="4" y="150" rx="3" ry="3" width="100%" height="5%" />
    <rect x="4" y="300" rx="3" ry="3" width="100%" height="30%" />
    <rect x="4" y="700" rx="3" ry="3" width="100%" height="50%" />
  </ContentLoader>
);

export default MyLoader;
