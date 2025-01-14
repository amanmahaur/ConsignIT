import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePostContext } from '../../Context/PostContext';
import Button from '../Button';

function Header() {
  const { fetchPosts } = usePostContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Products', slug: '/all-posts', active: authStatus },
    { name: 'Add Product', slug: '/add-post', active: authStatus },
    { name: 'My Products', slug: '/my-posts', active: authStatus },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchPosts(searchQuery.trim());
      navigate('/results');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-2">
          <div>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          {
            authStatus &&
            (

              <div className="hidden lg:flex items-center space-x-2 ml-auto px-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
              />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
              Search
            </button>
          </div>
            )
          }

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-1 ml-4 text-gray-600 font-medium">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-6  text-center py-2 rounded-lg hover:bg-gray-200 duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <Link to="/notifications">
                <Button bgColor='white'>Notifications🔔</Button>
                </Link>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-gray-700 p-2"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden flex flex-col space-y-4 mt-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            {/* Mobile Search Bar */}
            {
              authStatus &&(

                <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border rounded-lg px-4 py-2 text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                Search
              </button>
            </div>
              )
            }
            {/* Links Section */}
            {authStatus &&(
              <div className="lg-hidden flex bg-gray-700 text-white py-2">
                <div className="container mx-auto flex flex-wrap justify-center">
                  {['Winter', 'Summer', 'Men', 'Women', 'Jeans'].map((category) => (
                    <Link
                      key={category}
                      to="/results"
                      className="px-4 py-1 my-2 mx-2 bg-gray-600 hover:bg-gray-500 rounded"
                      onClick={() => {
                        setSearchQuery(`${category.toLowerCase()}`);
                        handleSearch();
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>)
            }
            {navItems.map(
              (item) =>
                item.active && (
                  <Link
                    key={item.name}
                    to={item.slug}
                    className="block px-6 py-2 hover:bg-gray-700 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
            )}
            {authStatus && <LogoutBtn />}
            {authStatus &&<Link to="/notifications">
                <Button bgColor='white'>🔔</Button>
                </Link>}
          </div>
        )}
      </Container>

      {/* Links Section */}

      {
        authStatus &&
        (

          <div className="bg-gray-700 text-white py-2 hidden lg:block">
        <div className="container mx-auto flex flex-wrap justify-center">
          {['Winter', 'Summer', 'Men', 'Women', 'Jeans'].map((category) => (
            <Link
            key={category}
            to="/results"
            className="px-4 py-1 mx-2 bg-gray-600 hover:bg-gray-500 rounded"
            onClick={() => {
              setSearchQuery(`${category.toLowerCase()} `);
              handleSearch();
            }}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
        )
      }


    </header>
  );
}

export default Header;
