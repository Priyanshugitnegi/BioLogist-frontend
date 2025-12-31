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
              <h3>BioLogist Pvt. Ltd.</h3>
  
              <p>
                Email:{" "}
                <a href="mailto:info@biologistinfo.com">
                  <strong>biologistservices@gmail.com</strong>
                </a>
              </p>
  
              <p>
                Phone:{" "}
                <a href="tel:+91XXXXXXXXXX">
                  <strong>+91 9997635496</strong>
                </a>
              </p>
  
              <p>Location: BioLogist Sales & Services
201/235C, Shanti Complex,
New Manglapuri Village, Sultanpur,
New Delhi Delhi 110030 India
+91-9971979690</p>
            </div>
  
            {/* Map Section */}
            <div className="contact-map">
              <iframe
                title="BioLogist Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2750326277996!2d77.16911649999999!3d28.50137185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e40568131b5%3A0x68e1c7d09bf76194!2sNew%20Manglapuri%2C%20Sultanpur%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1767180241335!5m2!1sen!2sin" 
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
  