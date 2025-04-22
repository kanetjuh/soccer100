import React from 'react';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://www.hindustantimes.com/ht-img/img/2025/03/17/1600x900/Lamine_Yamal_1742175559577_1742175559850.jpg" 
          alt="Soccer stadium" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1214]/90 via-[#0f1214]/70 to-[#0f1214]/90" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Football Everywhere <span className="text-emerald-500">Without Limits</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Watch your favorite teams and leagues live in HD quality.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all duration-300 flex items-center justify-center font-medium">
              <Play className="w-5 h-5 mr-2" />
              Watch Live Now
            </button>
            <button className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-full transition-all duration-300 flex items-center justify-center font-medium">
              Explore All Streams
            </button>
          </div>
        </div>

        {/* Featured matches cards - small preview */}
        <div className="absolute -bottom-16 left-0 right-0 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-4 px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[#14161a]/90 backdrop-blur-sm p-4 rounded-lg border border-[#1f2227] min-w-[260px] hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-emerald-500 text-sm font-medium">Premier League</span>
                  <span className="text-red-500 text-xs font-bold bg-red-500/20 px-2 py-0.5 rounded flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                    LIVE
                  </span>
                </div>
                <div className="text-white font-semibold">Manchester United vs Liverpool</div>
                <button className="mt-2 w-full py-1.5 bg-emerald-600/80 hover:bg-emerald-600 rounded text-white text-sm transition-colors">
                  Watch Stream
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;