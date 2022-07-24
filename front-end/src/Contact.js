import React from "react";
import CollapsibleExample from "./CollapsibleExample";
import "./contact.css";
export default function Contact() {
  return (
    <div>
      <CollapsibleExample/>
      <div id="contact">
        <div className="contact-box">
          <div className="contact-links">
            <h2>CONTACT</h2>
            <div className="links">
              <div className="link">
                <a href="https://www.linkedin.com/in/pravin-shankhapal-a2b41b1aa/">
                  <img
                    src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                    alt="linkedin"
                  />
                </a>
              </div>
              <div className="link">
                <a href="https://github.com/pravin-as">
                  <img
                    src="https://i.postimg.cc/YCV2QBJg/github.png"
                    alt="github"
                  />
                </a>
              </div>
              <div className="link">
                <a href="mailto: pr02.vin@gmail.com">
                  <img
                    src="https://i.postimg.cc/NjLfyjPB/email.png"
                    alt="email"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <p>Thanks for using.</p>
            <p>
              Special Thanks to
              <a href="https://www.linkedin.com/in/sarvesh-kesharwani-172b51201/">
                <strong style={{color: "#112B3C"}}> Sarvesh Kesharwani </strong>
              </a>
              for help, motivation and contribution.
            </p>
            Project By 
              <strong> Pravin Shankhapal (Me)</strong>
         
          </div>
        </div>
      </div>
    </div>
  );
}
