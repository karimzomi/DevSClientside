import React from 'react';
import '../assets/Styles/Footer.css'

function Footer() {
    return (
        <footer>
            <h2> <span className="logotext">Developer Source</span></h2>
            <div className="FooterContent">
                <h4>&copy; Copyright 2020-2021 by Karim_Zomita</h4>
                <div className="lists"> 
                <ul>
                  <a href="/"> <li className="footer-list-title">Support</li></a> 
                    <a href="/">
                        <li>FAQ</li>
                    </a>
                    <a href="/">
                        <li>Get Support</li>
                    </a>
                    <a href="/">
                        <li>Contact</li>
                    </a>
                    <a href="/">
                        <li>Suggestions</li>
                    </a>
                </ul>
                <ul>
                  <a href="/"> <li className="footer-list-title">Company</li></a> 
                    <a href="/">
                        <li>About</li>
                    </a>
                    <a href="/">
                        <li>Privacy Policy</li>
                    </a>
                    <a href="/">
                        <li>Contact Us</li>
                    </a>
                </ul>
                <ul>
                  <a href="/"> <li className="footer-list-title">Rules</li></a> 
                    <a href="/">
                        <li>Forum Rules</li>
                    </a>
                    <a href="/">
                        <li>Chat Rules</li>
                    </a>
                    <a href="/">
                        <li>Helping Rules</li>
                    </a>
                </ul>
                </div>
                <div className="socialMedia">
                    <ul>
                        <a href="/">
                            <li>Facebook</li>
                        </a>
                        <a href="/">
                            <li>Instagram</li>
                        </a>
                        <a href="/">
                            <li>Tweeter</li>
                        </a>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;