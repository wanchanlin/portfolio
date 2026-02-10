"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Button from "../components/Button";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject_line: "", // Honeypot field
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  // Helper to trigger mailto fallback
  const triggerMailto = () => {
    const subject = encodeURIComponent("Contact form submission");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:ohanalin@gmail.com?subject=${subject}&body=${body}`;
    setStatus({ ok: true, msg: "Server unreachable — opened mail client." });
    setFormData({ name: "", email: "", message: "", subject_line: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot check
    if (formData.subject_line) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Trigger fallback for server errors (500s) or connection issues
        if (res.status >= 500 || /connect|refuse|failed/i.test(data?.error)) {
          triggerMailto();
          return;
        }
        throw new Error(data?.error || 'Submission failed');
      }

      setStatus({ ok: true, msg: 'Message sent — thank you!' });
      setFormData({ name: '', email: '', message: '', subject_line: '' });

    } catch (err: any) {
      if (/fetch|connect|network/i.test(err.message)) {
        triggerMailto();
      } else {
        setStatus({ ok: false, msg: err.message || 'Error sending message' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <div className="mt-8 flex gap-8 items-start max-md:flex-col max-md:items-center">
        <div className="flex-1 ">
         
          <p className="opacity-80">
            Have a big idea or a brand to develop? Reach out—I'd love to hear about 
            your project and see how we can work together.
          </p>
           <p className="text-xl font-bold my-4">Get in touch</p>
          <p className="text-sm opacity-80 mb-4">
            <b>Email</b>: <a href="mailto:ohanalin@gmail.com" className="hover:underline">ohanalin@gmail.com</a>
          </p>
          <div className="flex items-end gap-4 flex-row">
            <Link href="https://github.com/wanchanlin" target="_blank" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className='text-4xl hover:text-[var(--retro-primary)] transition-colors'/>
            </Link>
            <Link href="https://www.linkedin.com/in/wanchanlin/" target="_blank" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className='text-4xl hover:text-[var(--retro-primary)] transition-colors'/>
            </Link>
            <Button  href="https://drive.google.com/file/d/1WMRM53EZVsGQciQ1KZ6U-PWWpXPaP5XD/view?usp=sharing">
  [ DOWNLOAD_RESUME ]
</Button>
            
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-5">
          {/* Honeypot: Hidden from users, visible to bots */}
          <input 
            type="text" 
            name="subject_line" 
            value={formData.subject_line} 
            onChange={handleChange} 
            className="hidden" 
            tabIndex={-1} 
            autoComplete="off" 
          />

          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border-2 border-[var(--retro-primary)] rounded-pixel-lg focus:outline-none focus:bg-[var(--retro-primary)]/10 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border-2 border-[var(--retro-primary)] rounded-pixel-lg focus:outline-none focus:bg-[var(--retro-primary)]/10 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-transparent border-2 border-[var(--retro-primary)] rounded-pixel-lg focus:outline-none focus:bg-[var(--retro-primary)]/10 transition-all resize-none"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <Button  type="submit"
              disabled={submitting}
            >{submitting ? 'SENDING...' : 'SEND MESSAGE'}
            </Button>
          
            
            {status && (
              <span className={`text-sm font-bold ${status.ok ? 'text-green-400' : 'text-red-400'}`}>
                {status.msg}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}