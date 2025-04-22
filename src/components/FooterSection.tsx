import React from 'react';
import { Link } from './ui/Link';
import { Facebook, Twitter, Instagram, Youtube, AlertTriangle } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-[#0f1214] border-t border-[#1f2227]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Disclaimer */}
        <div className="bg-[#14161a] p-4 rounded-lg mb-8 border border-[#1f2227]">
          <div className="flex items-start">
            <AlertTriangle className="text-amber-500 w-5 h-5 mr-2 flex-shrink-0 mt-1" />
            <div className="text-gray-300 text-sm">
              <p className="mb-2">
                All content on this website comes from sites such as search engines, social networks, and forums. 
                Soccer-100.com DOES NOT HOST OR PUBLISH any audiovisual content on its servers.
              </p>
              <p>
                The logos, images and other content present on this website are the property of their respective owners.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Soccer-100</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your premier destination for high-quality sports streams. Watch soccer, basketball, NFL, MMA and more.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Sports</h4>
            <ul className="space-y-2">
              {['Soccer', 'Basketball', 'NFL', 'MMA', 'UFC', 'Formula 1'].map((sport) => (
                <li key={sport}>
                  <Link href={`/${sport.toLowerCase()}`} className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                    {sport}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Leagues</h4>
            <ul className="space-y-2">
              {['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'NBA', 'NFL', 'Champions League'].map((league) => (
                <li key={league}>
                  <Link href={`/league/${league.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                    {league}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              {['About Us', 'DMCA', 'Terms of Service', 'Privacy Policy', 'Contact Us', 'FAQ'].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#1f2227] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Soccer-100.com. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            Soccer-100.com is not affiliated with any sports organization, team or broadcaster.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;