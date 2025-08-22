import React, { useState } from 'react'
import './Contact.css';
import axios from 'axios';
import { toast } from "react-toastify";
const Contact = () => {
const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const onChangeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }
  const onSubmitHandler = async (e) => {
e.preventDefault();
try {
  const response= await axios.post('http://localhost:8080/api/contact', formData);
 

toast.success('Message sent successfully');
setStatus("Message sent successfully");
  setFormData({firstname: "", lastname: "", email: "", message: ""});
}
 catch (error) {
  console.log(error);
  toast.error('Unable to send message')
  setStatus("Message sending failed..!");
}
  }
  return (

    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="contact-wrapper">
            <div className="row g-0">
            
              <div className="col-md-5">
                <div className="contact-info h-100">
                  <h3 className="mb-4">Get in touch</h3>
                  <p className="mb-4">
                    We'd love to hear from you. Please fill out the form or contact us using the information below.
                  </p>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Address</h6>
                      <p className="mb-0">Miraj-Sangli<br />Maharashtra,India</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Phone</h6>
                      <p className="mb-0">+91 9325391621</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Email</h6>
                      <p className="mb-0">contact@DineEase.com</p>
                    </div>
                  </div>

                  <div className="social-links">
                    <h6 className="mb-3">Follow Us</h6>
                    <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/in/dhvanitgurav" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="col-md-7">
                <div className="contact-form">
                  <h3 className="mb-4">Send us a message</h3>
                  <form onSubmit={onSubmitHandler}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" placeholder="John" name='firstname' value={formData.firstname} onChange={onChangeHandler} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" placeholder="Doe" name='lastname' value={formData.lastname} onChange={onChangeHandler} />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" placeholder="john@example.com" name='email' value={formData.email} onChange={onChangeHandler} />
                    </div>

                  
                    <div className="mb-4">
                      <label className="form-label">Message</label>
                      <textarea className="form-control" rows="5" placeholder="Your message here..." name='message' value={formData.message} onChange={onChangeHandler}></textarea>
                    </div>

                    <button type="submit" className="btn btn-submit text-white">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};



export default Contact;