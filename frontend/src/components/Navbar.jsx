// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="bg-gradient-to-r from-[#0a0f1c] to-[#0f172a] shadow-md border-b border-cyan-500/20">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
//         <div className="text-2xl font-bold">
//           <span className="text-white">Email</span>
//           <span className="text-cyan-400">-Classifier</span>
//         </div>

//         <ul className="flex gap-8 text-lg">
//           <li>
//             <a
//               href="#"
//               className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a
//               href="#about"
//               className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
//             >
//               About
//             </a>
//           </li>
//           <li>
//             <a
//               href="#contact"
//               className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
//             >
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";

const Navbar = () => {

  const handleTryDemo = () => {
    // Scroll to demo section
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }

    // Wait a bit for the scroll to finish, then focus the textarea
    setTimeout(() => {
      const textarea = document.getElementById("demo-textarea");
      if (textarea) {
        textarea.focus();
      }
    }, 300); // adjust timing to match scroll speed
  };

  return (
    <nav className="bg-gradient-to-r from-[#0a0f1c] to-[#0f172a] shadow-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="text-2xl font-bold">
          <span className="text-white">Email</span>
          <span className="text-cyan-400">-Classifier</span>
        </div>

        <button onClick={handleTryDemo} className="px-5 py-2 rounded-lg bg-blue-500/50 text-white font-medium hover:bg-blue-500/30 transition-colors duration-300">
          Try Demo
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
