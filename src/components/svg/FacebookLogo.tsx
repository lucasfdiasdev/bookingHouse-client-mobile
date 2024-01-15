import * as React from "react"
import Svg, { Path } from "react-native-svg"
const FacebookLogo = (props: any) => (
  <Svg 
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 16 16" {...props}
  >
    <Path
      fill="#1976D2"
      d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"
    />
    <Path
      fill="#FAFAFA"
      fillRule="evenodd"
      d="M13.5 8H11V6c0-.552.448-.5 1-.5h1V3h-2a3 3 0 0 0-3 3v2H6v2.5h2V16h3v-5.5h1.5l1-2.5z"
      clipRule="evenodd"
    />
  </Svg>
)
export default FacebookLogo
