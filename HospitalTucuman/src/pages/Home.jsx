import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Home.css";
import Sidebar from "../components/Sidebar";
import MainHome from "../components/MainHome";

const Home = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <MainHome />
      <Footer />
    </>
  );
};

export default Home;
