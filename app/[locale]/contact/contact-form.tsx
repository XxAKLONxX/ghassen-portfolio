'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PixelButton } from '@/components/pixel-button';
import { PixelCard } from '@/components/pixel-card';
import { PixelBadge } from '@/components/pixel-badge';
import { PixelGrid } from '@/components/pixel-grid';
import { PixelIcon } from '@/components/pixel-icon';
import { Github } from 'lucide-react';
import { COURSERA_URL, GITHUB_URL } from '@/lib/i18n';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    if (!name || !email || !message) return;

    const body = `Hi Ghassen,\n\n${message}\n\n—\nFrom: ${name}\nEmail: ${email}`;
    const mailtoLink = `mailto:ghassenbahroun@yahoo.fr?subject=${encodeURIComponent(
      '[Portfolio] ' + (subject || 'New message'),
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'ghassenbahroun@yahoo.fr',
      href: 'mailto:ghassenbahroun@yahoo.fr',
      icon: 'envelope',
    },
    {
      label: 'Phone',
      value: '+216 58851996',
      href: 'tel:+21658851996',
      icon: 'icons8-phone-64',
    },
    {
      label: 'Location',
      value: 'Sousse, Djerba, Tunis - Tunisia',
      href: '#',
      icon: 'icons8-location-64',
    },
    {
      label: 'Availability',
      value: 'Remote Work Worldwide',
      href: '#',
      icon: 'world',
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Ready to discuss your digital marketing goals? Let&apos;s connect and create a strategic
                roadmap for your business growth.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info) => (
                <PixelCard key={info.label} variant="glow">
                  <div className="space-y-3">
                    <PixelIcon name={info.icon} size={36} alt={info.label} className="text-cyan" />
                    <h3 className="font-semibold text-foreground">{info.label}</h3>
                    {info.href && info.href !== '#' ? (
                      <a
                        href={info.href}
                        className="text-cyan hover:text-cyan-light transition-colors text-sm break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{info.value}</p>
                    )}
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Send Me A Message</h2>

            <PixelCard variant="default" className="p-8">
              {submitted ? (
                <div className="text-center space-y-4 py-12">
                  <div className="text-5xl text-cyan">✓</div>
                  <h3 className="text-xl font-semibold text-foreground">Message ready to send</h3>
                  <p className="text-muted-foreground">
                    Your email client should have opened with the message pre-filled. If not,
                    write me at{' '}
                    <a
                      href="mailto:ghassenbahroun@yahoo.fr"
                      className="text-cyan hover:text-cyan-light transition-colors"
                    >
                      ghassenbahroun@yahoo.fr
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan focus:glow-cyan transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan focus:glow-cyan transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan focus:glow-cyan transition-all"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan focus:glow-cyan transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <PixelButton type="submit" variant="primary" size="lg" className="w-full">
                    Send Message
                  </PixelButton>
                </form>
              )}
            </PixelCard>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="py-16 md:py-24 border-t border-border bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Connect On Social Media</h2>
                <p className="text-muted-foreground">Follow for updates and insights</p>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                {[
                  { name: 'GitHub', iconName: null, iconComp: 'Github', href: GITHUB_URL },
                  { name: 'Email', iconName: 'envelope', iconComp: null, href: 'mailto:ghassenbahroun@yahoo.fr' },
                  { name: 'Coursera', iconName: 'graduation-cap', iconComp: null, href: COURSERA_URL },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-sm hover:border-cyan hover:bg-cyan/5 transition-all group text-muted-foreground hover:text-cyan"
                  >
                    {social.iconComp === 'Github' ? (
                      <Github className="w-5 h-5" />
                    ) : (
                      <PixelIcon name={social.iconName!} size={22} alt="" className="text-current" />
                    )}
                    <span className="font-mono font-semibold group-hover:text-cyan transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
