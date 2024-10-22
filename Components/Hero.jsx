import React from 'react';

const Hero = () => {
  return (
    <header className="parallax relative bg-[#fbfbfb]">
      <div className="flex flex-wrap items-center h-full relative z-10">
        {/* Layer Images */}
        <img src="/assets/images/banner/shape/shape-1.png" alt="Shape" className="layer top-0 left-0 absolute z-0" />
        <img src="/assets/images/banner/shape/shape-2.png" alt="Shape" className="layer top-[-18px] left-[20%] absolute z-0" />
        <img src="/assets/images/banner/shape/shape-3.png" alt="Shape" className="layer top-0 left-[40%] absolute z-0" />
        <img src="/assets/images/banner/shape/shape-2.png" alt="Shape" className="layer top-[28px] right-[7.6%] absolute z-0" />
        <img src="/assets/images/banner/shape/shape-1.png" alt="Shape" className="layer right-[30px] bottom-[35%] absolute z-0" />
        <img src="/assets/images/banner/shape/shape-4.png" alt="Shape" className="layer top-[44%] left-[13%] transform -translate-y-1/2 absolute z-0" />
        <img src="/assets/images/banner/shape/shape-5.png" alt="Shape" className="layer left-[30px] bottom-[50px] absolute z-0" />
        <img src="/assets/images/banner/shape/shape-3.png" alt="Shape" className="layer left-[90px] bottom-[140px] absolute z-0" />
        <img src="/assets/images/banner/shape/shape-6.png" alt="Shape" className="layer left-[50%] transform -translate-x-1/2 bottom-[28px] absolute z-0" />
        <img src="/assets/images/banner/shape/shape-3.png" alt="Shape" className="layer right-[30px] bottom-[5px] absolute z-0" />

        {/* Main Content */}
        <div className="container mx-auto main-hero flex flex-wrap items-center justify-center md:justify-between h-full relative z-20">
          <div className="w-full md:w-1/2 px-4 text-start md:text-left mb-6 md:mb-0" data-aos="fade-right">
            <h4 className="text-[#754ef9] text-[24px] md:text-[30px] uppercase pb-4">Hello, I’m</h4>
            <h2 className="text-[40px] md:text-[60px] uppercase pb-4">Ahmad Hassan</h2>
            <p className="pb-10">A Freelance UI Designer & Web Developer</p>
            <a className="bg-[#754ef9] text-white px-4 py-2 rounded myherobtn" href="#work">View my Work</a>
          </div>
          <div className="w-full md:w-1/2 px-4 flex justify-center md:justify-end header-image" data-aos="fade-left">
            <img src="/assets/images/hero1.png" alt="hero" className="relative z-10 myimg1" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
