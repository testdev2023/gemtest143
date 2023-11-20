import Link from "next/link";
import React from "react";

const ModalComponent = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "rgba(0, 0, 0, 0.8) ",
        zIndex: "99999",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // top: "25%",
          // left: "",
          height: "30vh",
          width: "30vw",
          background: "#2a2a2a",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "10px",
          boxShadow: " 0px 0px 10px 2px #fcc100",
          borderRadius: "20px",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>
            Please login to view this page and enjoy exclusive content and
            features.
          </h3>
        </div>
        <div>
          <Link
            style={{
              margin: "5px",
              background: "#fcc100",
              padding: "10px 20px",
            }}
            href="/login"
          >
            Signin
          </Link>
          <Link
            style={{
              margin: "5px",
              background: "#fcc100",
              padding: "10px 20px",
            }}
            href="/signup"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
