'use client'
import React from "react";
import Navbar from "../app/components/Navbar";
import Header from "../app/components/Header";
import About from "../app/components/About";
import Services from "../app/components/Services";
import LatestWork from "./components/LatestWork";
import Certifications from "./components/Certifications";
import GetinTouch from "./components/Get-in-touch";

export default function Home() {
  return (
    <>
    <Navbar />
    <Header />
    <About/>
    <Services/>
    <LatestWork/>
    <Certifications/>
    <GetinTouch/>
    </>
  );
}



