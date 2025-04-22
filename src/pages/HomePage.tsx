import React from 'react';
import Hero from '../components/Hero';
import LiveSection from '../components/LiveSection';
import UpcomingSection from '../components/UpcomingSection';
import PopularLeagues from '../components/PopularLeagues';
import FooterSection from '../components/FooterSection';
import NewsSection from '../components/NewsSection';
import GoogleAd from '../components/GoogleAd';

const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <div className="relative max-w-[1920px] mx-auto">
          {/* Left Ad */}
          <div className="fixed left-0 top-1/2 -translate-y-1/2 hidden xl:block">
            <GoogleAd />
          </div>

          {/* Right Ad */}
          <div className="fixed right-0 top-1/2 -translate-y-1/2 hidden xl:block">
            <GoogleAd />
          </div>

          <div className="pt-20 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <LiveSection />
                <UpcomingSection />
                <PopularLeagues />
              </div>
              <div className="lg:w-80">
                <NewsSection />
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default HomePage;