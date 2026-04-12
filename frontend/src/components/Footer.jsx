import React from "react";
import { NavLink } from "react-router-dom";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative mt-15">

      {/* Contact Short Section */}
      <section className="max-w-[60vw] mx-auto px-10 py-20 bg-gray-100 rounded-xl shadow-lg -mb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div>
            <h3 className="text-xl font-semibold">Ready to get Started?</h3>
            <h3 className="text-xl font-semibold">Talk to us today</h3>
          </div>
          <div className="md:text-right">
            <NavLink
              to="/contact"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-40 pb-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Muhammad Hammad</h3>
            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>


          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow us</h3>
            <div className="flex gap-4">
              {[FaDiscord, FaInstagram, FaYoutube].map((Icon, i) => (
                <div
                  key={i}
                  className="p-3 border border-white rounded-full cursor-pointer hover:bg-white hover:text-black transition"
                >
                  <Icon className="text-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Call Us</h3>
            <h3 className="text-sm">+92 3112422359</h3>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-600 pt-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 px-6 text-sm gap-4">
            <p>© {new Date().getFullYear()} MuhdHammad. All Rights Reserved</p>
            <div className="flex gap-6 md:justify-end">
              <p className="cursor-pointer hover:underline">PRIVACY POLICY</p>
              <p className="cursor-pointer hover:underline">
                TERMS & CONDITIONS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;