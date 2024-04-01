import { Link } from 'react-router-dom';
import origin8lab2 from '../media/origin8lab2.png';
import twit from '../media/twit.png';
import insta from '../media/insta.png';
import linkedin from '../media/linkedin.png';
import facebook from '../media/facebook.png';
import '../styles/Home.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-flex">
        <div className="footer-text">
          <img src={origin8lab2} alt="origin8lab" className="footer-origin8lab" />
          <p className="footer-p">Your partner in personal and professional development. Our platform is designed to bridge the gap between education and employment, providing job seekers and graduates with practical, job-ready skills that employers demand.</p>
          <p className="footer-p">+447471599776</p>
          <p className="footer-p">info@origin8lab.com</p>
        </div>
        <ul className="footer-social">
          <li className="footer-sm">
            <img src={twit} alt="twit" className="footer-sm-img" />
          </li>
          <li className="footer-sm">
            <img src={insta} alt="insta" className="footer-sm-img" />
          </li>
          <li className="footer-sm">
            <img src={linkedin} alt="linkedin" className="footer-sm-img" />
          </li>
          <li className="footer-sm-f">
            <img src={facebook} alt="facebook" className="footer-sm-img-f" />
          </li>
        </ul>
        <ul className="footer-links">
          <li className="footer-link">
            <Link to="/about" className="footer-link-a">About Us</Link>
          </li>
          <li className="footer-link">
            <Link to="/policy" className="footer-link-a">Privacy policy</Link>
          </li>
          <li className="footer-link">
            <Link to="/terms" className="footer-link-a">Terms</Link>
          </li>
          <li className="footer-link">
            <Link to="/sitemap" className="footer-link-a">Sitemap</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
