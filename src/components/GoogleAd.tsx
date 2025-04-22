import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const GoogleAd: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading Google AdSense:', error);
    }
  }, []);

  return (
    <div className="w-[160px] h-[600px] bg-[#14161a] border border-[#1f2227] rounded-lg mx-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '160px', height: '600px' }}
        data-ad-client="ca-pub-7419268431993566"
        data-ad-slot="9626429766"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;