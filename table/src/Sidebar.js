import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import './Sidebar.css'


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/about",
            name:"About",
            icon:<FaUserAlt/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/comment",
            name:"Comment",
            icon:<FaCommentAlt/>
        },
        {
            path:"/product",
            name:"Product",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"Product List",
            icon:<FaThList/>
        }
    ]
    return (
        <div className="sidebar-container">
           <div style={{width: isOpen ? "200px" : "100px"}} className="sidebar" >
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "35%"}} className="bars">
                       <span><FaBars onClick={toggle}/></span>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <div className='icon-container' key={index}>
                           <span className="icon">{item.icon}</span>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </div>
                   ))
               }
           </div>
           {/* <main>{children}</main> */}
        </div>
    );
};

export default Sidebar;