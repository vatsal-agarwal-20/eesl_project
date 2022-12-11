// import React from 'react'
// import './Navbar.css'

// const navBar = document.querySelector("nav"),
// menuBtns = document.querySelectorAll(".menu-icon"),
// overlay = document.querySelector(".overlay");

// menuBtns.forEach((menuBtn) => {
// menuBtn.addEventListener("click", () => {
//   navBar.classList.toggle("open");
// });
// });

// overlay.addEventListener("click", () => {
// navBar.classList.remove("open");
// });

// function Navbar() {
//   return (
//     <div>
//          <nav>
//       <div className="logo">
//         <i className="bx bx-menu menu-icon"></i>
//         <span className="logo-name">CodingLab</span>
//       </div>
//       <div className="sidebar">
//         <div className="logo">
//           <i className="bx bx-menu menu-icon"></i>
//           <span className="logo-name">CodingLab</span>
//         </div>

//         <div className="sidebar-content">
//           <ul className="lists">
//             <li className="list">
//                 <i className="bx bx-home-alt icon"></i>
//                 <span className="link">Dashboard</span>
              
//             </li>
//             <li className="list">
//                 <i className="bx bx-bar-chart-alt-2 icon"></i>
//                 <span className="link">Revenue</span>
//             </li>
//             <li className="list">
//                 <i className="bx bx-bell icon"></i>
//                 <span className="link">Notifications</span>
//             </li>
//             <li className="list">
//                 <i className="bx bx-message-rounded icon"></i>
//                 <span className="link">Messages</span>
//             </li>
//             <li className="list">
//                 <i className="bx bx-pie-chart-alt-2 icon"></i>
//                 <span className="link">Analytics</span>
//             </li>
//             <li className="list">
//                 <i className="bx bx-heart icon"></i>
//                 <span className="link">Likes</span>
//             </li>
//             <li className="list">
//                 <i className="bx bx-folder-open icon"></i>
//                 <span className="link">Files</span>
//             </li>
//           </ul>

//           <div className="bottom-cotent">
//             <li className="list">
//                 <i className="bx bx-cog icon"></i>
//                 <span className="link">Settings</span>
//             </li>
//             <li className="list">
//                 <i className="bx bx-log-out icon"></i>
//                 <span className="link">Logout</span>
//             </li>
//           </div>
//         </div>
//       </div>
//     </nav>
//     </div>
//   )
// }

// export default Navbar