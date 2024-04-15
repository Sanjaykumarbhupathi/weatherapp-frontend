// import React, { useState, useEffect } from 'react';
// import WeatherImage from "./weather.png";
// import { Heart} from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [user, setUser] = useState(null); // State to hold user details

//   useEffect(() => {
//     // Check if user details are stored in localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     // Clear user details from localStorage and state
//     localStorage.removeItem('user');
//     setUser(null);
//     // Redirect to login page
//     window.location.href = '/login';
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-900 dark:bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img src={WeatherImage} className="h-8" alt="Flowbite Logo" />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             Weather App
//           </span>
//         </a>
//         <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           {user ? (
//             <><a href='/my-favoraites'><div className='mr-4 flex items-center'>
//               <span className='mr-2 border-transparent'><Heart fill='red'/></span></div></a>
//               <div className="relative">
//                 <button
//                   onClick={toggleMenu}
//                   type="button"
//                   className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   <span>{user.username}</span>
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 {isMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full px-4 py-2 w-full px-4 py-2 text-sm text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
//                       style={{backgroundColor:"red"}}>
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div></>
//           ) : (
//             <a href="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//               Get Started
//             </a>
//           )}
//           <button
//             onClick={toggleMenu}
//             type="button"
//             data-collapse-toggle="navbar-sticky"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="navbar-sticky"
//             aria-expanded={isMenuOpen ? 'true' : 'false'}
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 17 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M1 1h15M1 7h15M1 13h15"
//               />
//             </svg>
//           </button>
//         </div>
//         <div
//           className={`${
//             isMenuOpen ? 'block' : 'hidden'
//           } items-center justify-between w-full md:flex md:w-auto md:order-1`}
//           id="navbar-sticky"
//         >
//           <label
//             htmlFor="default-search"
//             className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//           >
//             Search
//           </label>
//           <div className="relative flex w-full">
//             <input
//               type="search"
//               id="default-search"
//               className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search Mockups, Logos..."
//               required
//             />
//             <button
//               type="submit"
//               className="absolute inset-y-0 right-0 px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import WeatherImage from "./weather.png";
import { Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const handleUserClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={WeatherImage} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Weather App
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <a href='/my-favoraites' className='mr-4 flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                <Heart fill='red' />
                <span>My favorites</span>
              </a>
              <div className='mr-4 flex items-center cursor-pointer' onClick={handleUserClick}>
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} 
                  alt={user.username}
                  className="w-8 h-8 rounded-full" 
                />
              </div>
              {isMenuOpen && (
                <div className="relative">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
                    style={{backgroundColor:"red"}}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <a href="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get Started
            </a>
          )}
          <button
            onClick={toggleMenu}
            type="button"
            data-collapse-toggle="navbar-sticky"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
