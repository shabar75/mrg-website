import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">MRG</div>
            <div className="footer__tagline">COMPLIANCE | LIAISON | SOLUTIONS</div>
            <p className="footer__desc">Your Compliance Partner</p>
            <p className="footer__motto">Together Towards Growth</p>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/why-mrg">Why MRG</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/consultation">Get a Consultation</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Our Services</h4>
            <ul className="footer__links">
              <li>Compliance Management</li>
              <li>Liaisoning with Authorities</li>
              <li>Licensing Services</li>
              <li>Raw Data Processing</li>
              <li>Business Consultation</li>
              <li>Advisory & Support</li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__contact">
              <li>
                <Phone size={16} />
                <a href="tel:+919086000911">+91 9086000911</a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:info@mrgsolutions.in">info@mrgsolutions.in</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>Srinagar, Jammu & Kashmir<br />(Serving clients across India)</span>
              </li>
            </ul>
            <div className="footer__social">
              <span className="footer__social-label">Follow Us</span>
              <div className="footer__social-links">
                <a href="#" aria-label="LinkedIn" className="footer__social-link">LinkedIn</a>
                <a href="#" aria-label="Facebook" className="footer__social-link">Facebook</a>
                <a href="#" aria-label="X" className="footer__social-link">X</a>
                <a href="#" aria-label="YouTube" className="footer__social-link">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 MRG. All Rights Reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
