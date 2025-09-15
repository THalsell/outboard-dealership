'use client';

export default function HeroSlider() {
  return (
    <section className="relative w-screen h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden ml-[calc(-50vw+50%)]">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      
      {/* Centered Free Shipping Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide drop-shadow-2xl">
            Free Shipping on Outboard Motors
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold mt-6 tracking-wide drop-shadow-lg">
            We ship from our dealership in Tennessee and we pay the freight to the lower 48 states!
          </p>
        </div>
      </div>


    </section>
  );
}