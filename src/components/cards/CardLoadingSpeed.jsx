import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    className="w-full h-full"
    backgroundColor="#9d9b9b"
    foregroundColor="#8dafbc"
    {...props}
  >
    <rect y="130" rx="3" ry="3" width="100%" height="14" />
    <rect y="150" rx="3" ry="3" width="100%" height="14" />
    <circle cx="50%" cy="50" r="46" />
    <rect y="190" ry="3" width="100%" height="10" />
    <rect y="210" ry="3" width="100%" height="10" />
    <rect y="230" ry="3" width="100%" height="10" />
  </ContentLoader>
)

export default MyLoader
