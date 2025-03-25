import * as config from './config.js';

// React components for the portfolio website
const { useState, useEffect } = React;
const { motion, AnimatePresence } = window.framerMotion;

// Main App component
function App() {
    return (
        <React.Fragment>
            <Header />
            <Main />
            <Footer />
        </React.Fragment>
    );
}

// Header component
function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            
            // Update active section based on scroll position
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavLinkClick = (e, sectionId) => {
        e.preventDefault();
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
        
        const targetSection = document.querySelector(`#${sectionId}`);
        window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
        });
    };

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <div className="container">
                <div className="logo">{config.initials}</div>
                <nav>
                    <ul className={isMobileMenuOpen ? 'show' : ''}>
                        {['home', 'about', 'education', 'publications', 'services', 'contact'].map(section => (
                            <li key={section}>
                                <a 
                                    href={`#${section}`} 
                                    className={activeSection === section ? 'active' : ''}
                                    onClick={(e) => handleNavLinkClick(e, section)}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mobile-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className="fas fa-bars"></i>
                    </div>
                </nav>
            </div>
        </header>
    );
}

// Main content component
function Main() {
    return (
        <main>
            <HomeSection />
            <AboutSection />
            <EducationSection />
            <PublicationsSection />
            <ServicesSection />
            <ContactSection />
        </main>
    );
}

// Home section component
function HomeSection() {
    return (
        <motion.section 
            id="home" 
            className="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container">
                <div className="hero">
                    <motion.div 
                        className="hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1>I'm <span className="highlight">{config.name}</span></h1>
                        <p className="tagline">{config.tagline}</p>
                        <p className="description">Helping researchers and organizations extract meaningful insights from complex data through statistical analysis and consulting.</p>
                        <div className="cta-buttons">
                            <a href="#services" className="btn primary">Explore Services</a>
                            <a href="#contact" className="btn secondary">Get In Touch</a>
                            <a href={config.cvUrl} className="btn secondary cv-download-btn" target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-download mr-2"></i> Download CV
                            </a>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="hero-graphic"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob">
                            <path fill="var(--accent-color)" d="M45.3,-58.8C58.1,-48.7,67.9,-33.7,72.1,-16.9C76.3,-0.1,75,18.5,67.2,33.9C59.5,49.3,45.4,61.4,29.4,68.5C13.4,75.5,-4.5,77.6,-21.7,73C-38.9,68.4,-55.4,57.1,-66.1,41.1C-76.7,25.1,-81.5,4.5,-77.9,-14.1C-74.2,-32.8,-62.1,-49.5,-47,-59.8C-31.9,-70.1,-16,-74,-0.2,-73.7C15.5,-73.4,31.1,-68.9,45.3,-58.8Z" transform="translate(100 100)" />
                        </svg>
                        <div className="profile-image"></div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

// About section component (simplified for brevity)
function AboutSection() {
    return (
        <section id="about">
            {/* Existing about section content */}
        </section>
    );
}

// Education section component (simplified for brevity)
function EducationSection() {
    return (
        <section id="education">
            {/* Existing education section content */}
        </section>
    );
}

// Publications section component (simplified for brevity)
function PublicationsSection() {
    return (
        <section id="publications">
            {/* Existing publications section content */}
        </section>
    );
}

// Services section component (simplified for brevity)
function ServicesSection() {
    return (
        <section id="services">
            {/* Existing services section content */}
        </section>
    );
}

// Contact section component with Email.js integration
function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setSubmitStatus({ success: false, message: 'Please fill in all fields' });
            return;
        }
        
        setIsSubmitting(true);
        
        // Send email using Email.js
        emailjs.send(
            config.emailjsServiceId,
            config.emailjsTemplateId,
            {
                from_name: formData.name,
                reply_to: formData.email,
                subject: formData.subject,
                message: formData.message
            }
        ).then(() => {
            setSubmitStatus({ success: true, message: `Thank you for your message, ${formData.name}! I'll get back to you soon.` });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }).catch(error => {
            setSubmitStatus({ success: false, message: 'There was an error sending your message. Please try again.' });
            console.error('Email.js error:', error);
            setIsSubmitting(false);
        });
    };

    return (
        <section id="contact">
            <div className="container">
                <h2>Get In Touch</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h3>Email</h3>
                                <p className="email-value">{config.email}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <div>
                                <h3>Phone</h3>
                                <p className="phone-value">{config.phone}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h3>Location</h3>
                                <p className="location-value">{config.location}</p>
                            </div>
                        </div>
                        <div className="social-links">
                            <a href={config.linkedinUrl} className="social-link" data-platform="linkedin"><i className="fab fa-linkedin"></i></a>
                            <a href={config.githubUrl} className="social-link" data-platform="github"><i className="fab fa-github"></i></a>
                            <a href={config.twitterUrl} className="social-link" data-platform="twitter"><i className="fab fa-twitter"></i></a>
                            <a href={config.researchGateUrl} className="social-link" data-platform="researchgate"><i className="fab fa-researchgate"></i></a>
                        </div>
                    </div>
                    <motion.form 
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {submitStatus && (
                            <div className={`alert ${submitStatus.success ? 'success' : 'error'}`}>
                                {submitStatus.message}
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input 
                                type="text" 
                                id="subject" 
                                value={formData.subject} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                rows="5" 
                                value={formData.message} 
                                onChange={handleChange} 
                                required 
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="btn primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

// Footer component
function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
                    <p>Statistical Consulting & Research Services</p>
                </div>
            </div>
        </footer>
    );
}

// Render the app
const rootElement = document.body;
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);