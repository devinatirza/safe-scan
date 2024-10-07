import React, { useState } from 'react';
import Navbar from "../components/navbar";
import { Shield, Check, Users, Briefcase, Building, ChevronDown } from 'lucide-react';

interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
}

const PlanCard: React.FC<PlanCardProps> = ({ name, price, description, features }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-gray-800 rounded-lg p-10 flex-col h-full transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-2xl font-bold text-cyan-400 mb-2">{price}</p>
      <p className="text-gray-400 mb-4">{description}</p>
      

      {isHovered && (
        <ul className="mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center mb-2">
              <Check className="text-green-400 mr-2 flex-shrink-0" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <button className="bg-cyan-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-cyan-500 transition duration-300 mt-auto">
        Choose Plan
      </button>
    </div>
  );
};

const Product: React.FC = () => {
  const personalPlans = [
    {
      name: "Individual",
      price: "$4.99/month",
      description: "Perfect for personal use on a single device",
      features: [
        "Real-time virus and malware protection",
        "Firewall and network security",
        "Safe browsing and phishing protection",
        "24/7 customer support",
        "Protection for 1 device"
      ],
    },
    {
      name: "Group",
      price: "$9.99/month",
      description: "Ideal for families or small groups",
      features: [
        "All Individual plan features",
        "Protection for up to 5 devices",
        "Parental controls",
        "Password manager",
        "VPN for secure browsing",
        "Identity theft protection"
      ],
    },
  ];

  const businessPlans = [
    {
      name: "Small Business",
      price: "$19.99/month",
      description: "Tailored for small businesses and startups",
      features: [
        "Protection for up to 10 devices",
        "Advanced endpoint security",
        "Email and spam protection",
        "File server security",
        "Remote management console",
        "Compliance reporting"
      ],
    },
    {
      name: "Large Business",
      price: "Custom pricing",
      description: "Enterprise-grade security for large organizations",
      features: [
        "Scalable protection for unlimited devices",
        "Advanced threat intelligence",
        "Cloud workload protection",
        "API protection",
        "Managed detection and response (MDR)",
        "Dedicated account manager",
        "Custom integration and deployment support"
      ],
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 w-dvw min-h-screen">
      <Navbar activeItem="Products" />

      <main className="w-full px-20 py-8">
        <h1 className="text-4xl font-bold mb-16 text-center">SafeScan Protection Plans</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="mr-2" /> Personal Plans
            </h2>
            <div className="space-y-6">
              {personalPlans.map((plan, index) => (
                <PlanCard key={index} {...plan} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Briefcase className="mr-2" /> Business Plans
            </h2>
            <div className="space-y-6">
              {businessPlans.map((plan, index) => (
                <PlanCard key={index} {...plan} />
              ))}
            </div>
          </div>
        </div>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Not sure which plan is right for you?</h2>
          <p className="text mb-6">Our security experts are here to help you find the perfect protection for your needs.</p>
          <a href="https://wa.me/628975611789" target="_blank" rel="noopener noreferrer">
            <button className="bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300">
                    Contact Us for a Consultation
            </button>
          </a>
        </section>
      </main>
    </div>
  );
};

export default Product;