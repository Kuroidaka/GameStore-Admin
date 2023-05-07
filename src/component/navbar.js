import React from "react";
import {BsSearch} from 'react-icons/bi'
import {BiJoystick} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {BsBell} from 'react-icons/bi'
import {IoSettingsOutline} from 'react-icons/io'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import {BsSun} from 'react-icons/bs'
import {BsMoon} from 'react-icons/bs'
import "./navbar.css"

function Navbar() {
    return( 
        <div>
            <nav class="sidebar close">   
            <header>
                <div class="image-text">
                    <span class="image">
                        <img src="logo.png" alt="logo"/>
                    </span>
                    <div class="text header-text">
                        <span class="name">####</span>
                        <span class="profession">####</span>

                    </div>
                    <i class='bx bx-chevron-right toggle'></i>
                </div>
            </header>

            <div class="menu-bar">
                <div class="menu">
                    <li class="search-box">
                        <BsSearch/>
                         <input type='text' placeholder='Search...' />
                     </li>
                    <ul class="menu-links">
                        <li class="nav-links">
                           <a href="/" >
                            <AiOutlineHome/>
                            <span class="text nav-text">Home</span>
                            </a>
                        </li>

                        <li class="nav-links">
                            <a href="/" > 
                             <BiJoystick/>
                             <span class="text nav-text">Game</span>
                            </a>
                         </li>

                         <li class="nav-links">
                            <a href="/" > 
                             <BsBell/>
                             <span class="text nav-text">Notifications</span>
                            </a>
                         </li>

                         <li class="nav-links">
                            <a href="/" > 
                             <IoSettingsOutline/>
                             <span class="text nav-text">Settings</span>
                            </a>
                         </li>
                    </ul>
                </div>

                <div class="bottom-content">
                    <li class="">
                        <a href="/" > 
                        <RiLogoutBoxRLine/>
                         <span class="text nav-text">Logout</span>
                        </a>
                     </li>

                     <li class="mode">
                        <div class="moon-sun">
                            <BsSun/>
                            <BsMoon/>
                        </div> 
                         <span class="mode-text text">Dark Mode</span>

                        <div class="toggle-switch">
                            <span class="switch"></span>
                        </div>
                     </li>
                </div>

            </div>
        </nav>

        <section class="home">
            <div class="text">Home</div>
        </section>

        <script src="script.js"></script>

        </div>
    );
}

export default Navbar