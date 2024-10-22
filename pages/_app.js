import '../styles/globals.css';
// _app.js or _app.tsx
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import Navbar from '@/Components/Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import styles
import { config } from '@fortawesome/fontawesome-svg-core';
import Footer from '@/Components/Footer';

// Prevent Font Awesome from automatically adding its CSS since we did it manually
config.autoAddCss = false;

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration (ms)
      once: true,     // Animation happens only once (false if you want animation on every scroll)
    });

    // Reinitialize AOS on route change
    const handleRouteChange = () => {
      Aos.refresh();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <>
   <Navbar/>
  <Component {...pageProps} />;
  <Footer/>
   </> 
}

export default MyApp;

