// import React from "react";
import React, { useRef, useState, useEffect } from "react";

import logo from "../../asset/gemlogo.png";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Loder from "../Loder";

function Logo({ loder, setLoder, setIsScrolled }) {
  const router = useRouter();
  const { pathname } = router;
  const [logoSize, setLogoSize] = useState({ width: 120, height: 120 });
  const logoRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const maxScroll = window.innerHeight * 0.01; // Scroll 1% of the page's height to complete a full rotation
      const rotation = Math.min(window.scrollY / maxScroll, 1) * 360; // Calculate the rotation angle based on scroll position
      const maxScale = 1; // Define the maximum scale factor
      const minScale = 0.9; // Define the minimum scale factor
      const scaleRange = maxScale - minScale; // Calculate the range of scale values
      const scale =
        minScale +
        scaleRange * (1 - Math.min(window.scrollY / (maxScroll * 10), 1)); // Calculate the scale based on scroll position (slow down the scaling effect)

      // Calculate the new logo size based on rotation (reverse the rotation effect)
      const newSize =
        rotation === 0 // If the rotation angle is 0 (initial position), set the size to the original size (130px)
          ? 120
          : 120 - Math.abs((rotation % 360) - 180) * 0.15; // Adjust the factor (0.15) as needed for the desired size change

      if (logoRef.current) {
        logoRef.current.style.transition =
          "transform 0.5s, width 0.5s, height 0.5s"; // Add transition properties for transform, width, and height
        logoRef.current.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        logoRef.current.style.width = `${newSize}px`; // Apply the new width
        logoRef.current.style.height = `${newSize}px`; // Apply the new height
      }

      setIsScrolled(window.scrollY > 200);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    // <Link href="ent" legacyBehavior>

    <Link href="/" legacyBehavior>
      <a
        style={{ transition: "0.5s" }}
        onClick={() => {
          pathname === "/" ? setLoder(false) : setLoder(true);
          // console.log(setLoder);
        }}
      >
        <Image
          id="js-logo"
          src={logo}
          alt="Logo"
          // loading="lazy"
          priority={true} // Add the "priority" property here
          style={{
            width: `${logoSize.width}px`,
            height: `${logoSize.height}px`,
            cursor: "pointer",
            backgroundColor: "black",
            borderRadius: "50%",
            padding: "5px",
          }}
          ref={logoRef}
        />
      </a>
    </Link>
  );
}

export default Logo;
