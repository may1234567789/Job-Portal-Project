import React from 'react'
import './css/footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h4 className="brand-title">Job Search</h4>
          <p className="brand-tag">Helping you find the right opportunity.</p>
        </div>

        <nav className="footer-column" aria-labelledby="company-heading">
          <h5 id="company-heading">Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </nav>

        <div className="footer-column" aria-labelledby="resources-heading">
          <h5 id="resources-heading">Resources</h5>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>

        <div className="footer-column" aria-labelledby="contact-heading">
          <h5 id="contact-heading">Contact</h5>
          <ul>
            <li>support@jobsearch.example</li>
            <li>+1 (555) 123-4567</li>
            <li><a href="#">Contact form</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} Job Search. All rights reserved.</p>
        <div className="social">
          <a href="#" aria-label="Twitter" className="social-link">T</a>
          <a href="#" aria-label="LinkedIn" className="social-link">in</a>
          <a href="#" aria-label="GitHub" className="social-link">G</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer