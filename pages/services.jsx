import React from 'react';

function Services() {
  const services = [
    {
      title: "Web Design",
      description: "Enhance your online presence with stunning designs tailored to your brand's needs.",
      icon: "/assets/images/s1.png", // Path to your icon image
    },
    {
      title: "WordPress",
      description: "Create a powerful online presence with our WordPress development services.",
      icon: "/assets/images/s3.png", // Path to your icon image
    },
    {
      title: "Shopify Store",
      description: "Launch your eCommerce business with a fully optimized Shopify store.",
      icon: "/assets/images/s2.png", // Path to your icon image
    },
    {
      title: "SEO",
      description: "Boost your website's visibility with our SEO services.",
      icon: "/assets/images/s4.png", // Path to your icon image
    },
  ];

  return (
    <div className='Services text-center pt-12 '>
      <h2 className="text-center uppercase mb-4">Services <span className='mx-1'>Offers</span></h2>
      <span className='text-lg text-center items-center'>Elevate your brand with design!</span>
      <div className="p-8 w-full rounded-lg overflow-hidden mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="zoom-in">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative flex flex-col items-center justify-between p-6 w-full h-auto  mx-4 bg-[#f9f9fd] shadow-lg transition-all duration-300 ease-in-out hover:bg-white hover:shadow-2xl mycard"
              style={{ transform: "translate(0px, 0px)", opacity: 1 }}
            >
              {/* Image placed at the top */}
              <div className="z-10 p-2">
                <img src={service.icon} alt={service.title} className="w-24 h-24 md:w-20 md:h-20 lg:w-16 lg:h-16" />
              </div>
              
              <h3 className="z-10 p-2 text-xl md:text-2xl font-semibold text-purple-900">{service.title}</h3>
              
              <p className="z-10 text-center text-gray-500 ">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services;
