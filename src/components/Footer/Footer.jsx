import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoo.png";  // Ensure you update the path accordingly.

function Footer() {
  return (
    <footer className="bg-white mt-80 border-y">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="block md:flex justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex md:justify-start justify-center items-center">
              <img src={logo} className="mr-3 h-16" alt="Logo" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li className="mb-4">
                  <Link to="/all-posts" className="hover:underline">All Products</Link>
                </li>
                <li>
                  <Link to="/add-post" className="hover:underline">Add Product</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow Me</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="https://www.linkedin.com/in/aman-mahaur-942a94262/" className="hover:underline" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/amanmahaur" className="hover:underline" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="md:flex block items-center justify-between sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            <p className="hover:underline">© amankumarmahaur. All Rights Reserved.</p>
          </span>
          <div className="flex justify-center mt-4 space-x-5 sm:justify-center sm:mt-0">
            <Link to="https://www.facebook.com/aman.mahaur.77" className="text-gray-500 hover:text-gray-900">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="https://www.linkedin.com/in/aman-mahaur-942a94262/" className="text-gray-500 hover:text-gray-900">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.792 0 0 .77 0 1.72v20.56C0 23.23.792 24 1.77 24h20.46C23.208 24 24 23.23 24 22.28V1.72C24 .77 23.208 0 22.23 0zM7.12 20.48H3.56V9h3.56v11.48zM5.34 7.55a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM20.48 20.48h-3.56v-5.62c0-1.34-.47-2.26-1.64-2.26-.89 0-1.42.59-1.65 1.16-.08.2-.1.48-.1.76v5.96h-3.56V9h3.56v1.56c.47-.73 1.32-1.76 3.21-1.76 2.35 0 4.11 1.53 4.11 4.84v6.84z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link to="https://github.com/amanmahaur" className="text-gray-500 hover:text-gray-900">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
