// import React from "react";
import React, { useRef, useState, useEffect } from "react";

import logo from "../../asset/gemlogo.png";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Loder from "../Loder";

function LogoMobile({ loder, setLoder, }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false); // Add this line to define the isScrolled state

  const [profileImage, setProfileImage] = useState(null);
  const logoRef = useRef(null);
  const [logoSize, setLogoSize] = useState({ width: 80, height: 80 });

  useEffect(() => {
    function handleScroll() {
      const maxScroll = window.innerHeight * 1; // Adjust the value as needed for the desired scroll distance
      const rotation = Math.min(window.scrollY / maxScroll, 1) * 360; // Calculate the rotation angle based on scroll position
      const maxScale = 1.1; // Define the maximum scale factor
      const minScale = 0.9; // Define the minimum scale factor
      const scaleRange = maxScale - minScale; // Calculate the range of scale values
      const scale =
        minScale + scaleRange * (1 - Math.min(window.scrollY / maxScroll, 1)); // Calculate the scale based on scroll position

      if (logoRef.current) {
        logoRef.current.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      }
      setIsScrolled(window.scrollY > 200);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, );

  return (
    // <Link href="ent" legacyBehavior>

    <Link href="/" legacyBehavior>
      <a
        onClick={() => {
          pathname === "/" ? setLoder(false) : setLoder(true);
          // console.log(setLoder);
        }}
      >
        <Image
          id="js-logo"
          src={logo}
          alt="Logo"
          loading="lazy"
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

export default LogoMobile;
