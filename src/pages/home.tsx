import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, Star, Clock, Award } from 'lucide-react';
import Navbar from "../components/navbar";

interface Threat {
  id: number;
  x: number;
  y: number;
}

interface ShieldPosition {
  x: number;
  y: number;
}

const Threat: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div 
    className="absolute w-2 h-2 bg-red-400 rounded-full animate-ping"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDuration: `${1 + Math.random() * 2}s`,
    }}
  />
);

const Testimonial: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
    </div>
    <p className="text-gray-300 italic mb-4">"{quote}"</p>
    <p className="text-cyan-300 font-semibold">{author}</p>
    <p className="text-gray-400 text-sm">{role}</p>
  </div>
);

const TrustReason: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start">
    <div className="text-cyan-400 mr-4">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [shieldPosition, setShieldPosition] = useState<ShieldPosition>({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prevThreats => [
        ...prevThreats.slice(-15),
        { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 }
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const landscape = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setShieldPosition({
        x: ((e.clientX - landscape.left) / landscape.width) * 100,
        y: ((e.clientY - landscape.top) / landscape.height) * 100
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar activeItem="Home" />

      {/* Hero Section */}
      <header className="bg-gray-800 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Secure Your Digital World with SafeScan</h1>
          <p className="text-xl mb-8">Advanced antivirus solutions for personal and business use</p>
          <button className="bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300 flex items-center mx-auto">
            Get Started <ChevronRight className="ml-2" />
          </button>
        </div>
      </header>

      {/* About Company Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">SafeScan</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                SafeScan is a leading provider of cutting-edge antivirus and cybersecurity solutions. Our mission is to protect individuals and businesses from ever-evolving digital threats. With advanced real-time scanning and automatic updates, SafeScan ensures that you stay one step ahead of viruses, malware, and cyber attacks.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you're at home or in the office, our easy-to-use platform offers seamless protection, so you can focus on what matters most while we safeguard your digital environment.
              </p>
            </div>
            <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
              {threats.map(threat => (
                <Threat key={threat.id} x={threat.x} y={threat.y} />
              ))}
              <div 
                className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${shieldPosition.x}%`, top: `${shieldPosition.y}%` }}
              >
                <Shield className="w-full h-full text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">98.9%</div>
              <p className="text-gray-300">Virus Detection Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">6M+</div>
              <p className="text-gray-300">Threats Blocked Daily</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">#1</div>
              <p className="text-gray-300">In Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Trust SafeScan?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <TrustReason 
              icon={<Shield size={24} />}
              title="Advanced Protection"
              description="Our cutting-edge technology provides unparalleled security against the latest cyber threats."
            />
            <TrustReason 
              icon={<Clock size={24} />}
              title="24/7 Support"
              description="Our dedicated team is always available to assist you with any security concerns."
            />
            <TrustReason 
              icon={<Award size={24} />}
              title="Industry Recognition"
              description="Multiple awards for our innovative approach to cybersecurity."
            />
            <TrustReason 
              icon={<Star size={24} />}
              title="Customer Satisfaction"
              description="97% of our customers report improved peace of mind after choosing SafeScan."
            />
          </div>

          <h3 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              quote="SafeScan has given me peace of mind I never knew I needed. Their protection is top-notch!"
              author="Dannele Frey"
              role="Small Business Owner"
            />
            <Testimonial 
              quote="As a tech enthusiast, I've tried many antiviruses. SafeScan is by far the most comprehensive and user-friendly."
              author="Felix Dean"
              role="Software Developer"
            />
            <Testimonial 
              quote="Implementing SafeScan across our organization has significantly reduced our cybersecurity incidents."
              author="Diana Ford"
              role="IT Director, FZ Corp"
            />
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Protection Packages</h2>
          <p className="text-xl text-center mb-8">
            SafeScan provides comprehensive cybersecurity solutions for individuals, families, small businesses, and large enterprises.
          </p>
          <div className="text-center">
            <button className="bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300 flex items-center mx-auto">
              Explore Our Packages <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SafeScan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;