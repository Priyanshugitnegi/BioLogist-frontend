export default function Contact() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
  
          <p className="page-text">
            We’d love to hear from you. Reach out to us for collaborations,
            enquiries, or support.
          </p>
  
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h3>BioLogist Technology Pvt. Ltd.</h3>
              <p>
                Email: <strong>info@biologistinfo.com</strong>
              </p>
              <p>
                Phone: <strong>+91 XXXXX XXXXX</strong>
              </p>
              <p>Location: India</p>
            </div>
  
            {/* Contact Form (UI Only) */}
            <form className="contact-form">
              <input
                type="text"
                placeholder="Your Name"
                required
              />
  
              <input
                type="email"
                placeholder="Your Email"
                required
              />
  
              <textarea
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
  
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
  