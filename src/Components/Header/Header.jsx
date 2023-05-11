import {useState,useEffect } from "react";
import {NavLink} from "react-router-dom";
import  "./Header.css"
import {v4 as uuidv4}  from "uuid";


export default function Header(props){
  let Links = [
          {name:"Games", href:"/Games" },
          {name:"Word of the Day", href:"/Word_of_the_day" }
   ]
    return (
      <>
         <header className="header bg-dark " >
                  <div className="top_bar">
                          <div className="logo">
                                <span  className="text-light  font-2 fw-900">
                                     &lt; JKL Techs / &gt;
                                </span>
                          </div>
                  </div>
                        <nav  className="menu_container">
                                 {
                                    Links.map((link)=>{
                                       return (
                                        <NavLink
                                         key={uuidv4()}
                                          to={link.href}
                                          className={
                                                 ({isActive})=>{
                                                 return   isActive ? "nav-link  text-light no-decoration "  : "no-decoration nav-link  text-light";
                                                 }
                                          }
                                        >
                                              {link.name}  
                                        </NavLink>
                          
                                       )
                                  })
                                 }
                        </nav>
                  
         </header>
            {props.children}
         </>
    )

}

