import React from "react";
import '../assets/css/Footer.css';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="grid-layout-container">
        <Link to="https://help.netflix.com/en/contactus">Questions? Contact us.</Link>
        <div className="footer-wrap">
          <ul className="footer-list">
            <li>
              <Link to="/">FAQ</Link>
            </li>
            <li>
              <Link to="/">Investor Relations</Link>
            </li>
            <li>
              <Link to="/">Privacy</Link>
            </li>
            <li>
              <Link to="/">Speed Test</Link>
            </li>
          </ul>
          <ul className="footer-list">
            <li>
              <Link to="/">Help Center</Link>
            </li>
            <li>
              <Link to="/">Jobs</Link>
            </li>
            <li>
              <Link to="/">Cookie Preferences</Link>
            </li>
            <li>
              <Link to="/">Legal Notices</Link>
            </li>
          </ul>
          <ul className="footer-list">
            <li>
              <Link to="/">Account</Link>
            </li>
            <li>
              <Link to="/">Ways to Watch</Link>
            </li>
            <li>
              <Link to="/">Corporate Information</Link>
            </li>
            <li>
              <Link to="/">Only on Netflix</Link>
            </li>
          </ul>
          <ul className="footer-list">
            <li>
              <Link to="/">Media Center</Link>
            </li>
            <li>
              <Link to="/">Terms of Use</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-info">
          <div></div>
          <span>Netflik Clone By Hoang Hiep</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;