import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>{children}</div>
    </div>
  );
}

export default Layout;
