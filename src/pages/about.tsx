import React, { useState } from "react";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Building,
  Send,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/navbar";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const AboutUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const errors: ContactFormErrors = {};

    if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters long";
    }

    if (formData.message.trim().length < 15) {
      errors.message = "Message must be at least 15 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const stats = [
    {
      title: "Years of Excellence",
      value: "5+",
      description: "Protecting digital lives since 2014",
    },
    {
      title: "Active Users",
      value: "5M+",
      description: "Trust us with their security",
    },
    {
      title: "Countries",
      value: "150+",
      description: "Global protection network",
    },
    {
      title: "Team Members",
      value: "200+",
      description: "Dedicated security experts",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Advanced Protection",
      description:
        "Our cutting-edge technology provides unparalleled security against the latest cyber threats.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Our dedicated team is always available to assist you with any security concerns.",
    },
    {
      icon: Clock,
      title: "Constant Innovation",
      description:
        "We continuously evolve our solutions to stay ahead of emerging threats.",
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 w-dvw">
      <Navbar activeItem="About Us" />

      <header className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Securing the Digital World
            </h1>
            <p className="text-xl text-gray-300">
              Advanced antivirus solutions for personal and business use
            </p>
          </div>
        </div>
      </header>

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-900 rounded-lg"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg">
                <value.icon className="text-cyan-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-6">
                Started in 2018, SafeScan began with one simple belief: good
                security should be available to everyone. We started small, with
                just a few security experts who cared deeply about protecting
                people online. Now, we've grown into a trusted name in digital
                security.
              </p>

              <p className="text-gray-300 mb-6">
                Today, we help protect millions of users around the world. From
                home users to big companies, our security tools keep people safe
                online. We're proud that so many people trust us to protect
                their digital lives.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Our Mission</h4>
                  <p className="text-gray-300">
                    To provide cutting-edge cybersecurity solutions that protect
                    and empower our users in an increasingly connected world.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Our Vision</h4>
                  <p className="text-gray-300">
                    To create a safer digital world where everyone can connect,
                    share, and thrive without fear of cyber threats.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-900 p-6 rounded-lg">
                <Building className="text-cyan-400 w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Headquarters</h3>
                <p className="text-gray-300">
                  Zaffira City, Republic of Fazoria
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <Users className="text-cyan-400 w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Presence</h3>
                <p className="text-gray-300">
                  Offices in 15 countries worldwide
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <Shield className="text-cyan-400 w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Security First</h3>
                <p className="text-gray-300">
                  ISO 27001 certified, GDPR compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                Have questions or need support? Our team is here to help. Reach
                out to us through any of these channels or fill out the contact
                form.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="text-cyan-400 w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-300">support@safescan.com</p>
                    <p className="text-gray-300">sales@safescan.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-cyan-400 w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Contact Us</h3>
                    <p className="text-gray-300 mb-1">+11 (112) 111-223</p>
                    <a
                      href="https://wa.me/628975611789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-2"
                    >
                      Chat on WhatsApp
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>

                    <p className="text-gray-300 text-sm">
                      Mon-Fri, 9:00 AM - 6:00 PM PST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="text-cyan-400 w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-gray-300">
                      1112 Security Street
                      <br />
                      Zaffira City, FZ 11223
                      <br />
                      Republic of Fazoria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      placeholder="How can we help?"
                    />
                    {formErrors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      placeholder="Your message..."
                    />
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>

                {showSuccess && (
                  <div className="mt-4 p-4 bg-green-900 bg-opacity-50 rounded-lg flex items-center">
                    <CheckCircle2 className="text-green-400 w-5 h-5 mr-2" />
                    <span className="text-green-400">
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
