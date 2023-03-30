import React from "react";
import { useEffect, useState } from "react";

export const MenuIcon = ({desktop, mobile}) => {
  
  const DESKTOP = ["23.7", "18"];
  const MOBILE = ["18", "15"];

  const [iconSize, setIconSize] = useState(DESKTOP);

  useEffect(()=>{
    mobile? setIconSize(MOBILE): '';
  })

  return (<svg
    width={iconSize[0]}
    height={iconSize[1]}
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.125 13.375H16.875M1.125 7.375H16.875M1.125 1.375H16.875"
      stroke="#F8F8F8"
      strokeWidth="1.5"
      strokeLinecap="round"
      
    />
  </svg>)
};

export default MenuIcon;