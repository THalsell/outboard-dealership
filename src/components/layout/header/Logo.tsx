'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <div className="bg-white py-6">
      <div className="container mx-auto px-4">
        <Link href="/" className="flex justify-center">
          <h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-deep-blue text-center leading-tight"
            style={{ fontFamily: "'Londrina Solid', sans-serif" }}
          >
            <span className="block sm:hidden">
              Outboard<br />Motor Sales
            </span>
            <span className="hidden sm:block">
              Outboard Motor Sales
            </span>
          </h1>
        </Link>
      </div>
    </div>
  );
}