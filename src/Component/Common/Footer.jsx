import { useNavigate } from "react-router-dom";
const Footer = () => {
  let navigate= useNavigate()

  return (
    <footer className="footer">
      <div className="footer-column">
      <div className="logo-name footer-name" onClick={()=>navigate('/user/home')}>
                    <img src="\src\assets\Logo\ananta-removebg-preview (1) (1).png" alt="Logo" />
                </div>
        <p>© 2024 Anant.in. All rights reserved.</p>
        <p>Your tagline goes here.</p>
      </div>

      <div className="footer-column">
        <h3>Contact Us</h3>
        <a href="mailto:support@mywebsite.com">sanjaysuthar121212@gmail.com</a>
        <a href="tel:+123456789">+123 456 789</a>
        <a href="/contact">Contact Form</a>
        <a href="/about">About Us</a>
      </div>

      <div className="footer-column">
        <h3>Search & More</h3>
        <div className="footer-search">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <a href="/faq">FAQ</a>
        <a href="/support">Support</a>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
