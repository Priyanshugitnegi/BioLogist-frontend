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
                src="https://maps.app.goo.gl/t7xTampcXqkYR9D8A?g_st=ipc"
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
  