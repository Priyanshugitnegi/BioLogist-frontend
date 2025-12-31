export default function Contact() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
  
          <p className="page-text">
            Visit us or reach out for collaborations, enquiries, or support.
          </p>
  
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h3>BioLogist Technology Pvt. Ltd.</h3>
  
              <p>
                Email:{" "}
                <a href="mailto:info@biologistinfo.com">
                  <strong>info@biologistinfo.com</strong>
                </a>
              </p>
  
              <p>
                Phone:{" "}
                <a href="tel:+91XXXXXXXXXX">
                  <strong>+91 XXXXX XXXXX</strong>
                </a>
              </p>
  
              <p>Location: India</p>
            </div>
  
            {/* Map Section */}
            <div className="contact-map">
              <iframe
                title="BioLogist Location"
                src="https://www.google.com/maps?q=India&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
  }
  