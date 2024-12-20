import React from "react";
import Navbar from "../components/navbar";

type ContentLayout = {
  children: JSX.Element;
};

export default function MainLayout({ children }: ContentLayout) {
  return (
    <div className="container">
      {/* Navigation Bar VVV */}
      {/* ---------------------------------- */}

      {/* All Content will be inside this div (chidren) VVV */}

      <div className="content">{children}</div>

      {/* ----------------------------------- */}
    </div>
  );
}
