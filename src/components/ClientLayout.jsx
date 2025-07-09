"use client";

import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  return (
    <>
      <TopBar />    
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
