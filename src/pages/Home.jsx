import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Features from '../components/Features';
import About from '../components/About';
import Partners from '../components/Partners';

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Features />
      <About />
      <Partners />
    </>
  );
}