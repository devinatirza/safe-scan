import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, Star, Clock, Award, ChevronLeft, Menu, X } from 'lucide-react';
import Navbar from "../components/navbar";
import SlideShow  from '../components/slideshow';

interface Threat {
  id: number;
  x: number;
  y: number;
}

interface ShieldPosition {
  x: number;
  y: number;
}

interface Review {
  quote: string;
  author: string;
  role: string;
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

const Home: React.FC = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [shieldPosition, setShieldPosition] = useState<ShieldPosition>({ x: 50, y: 50 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroSlides = [
    '/safescan.png',
    '/safescan2.png',
    '/safescan3.png'
  ];


  const reviews: Review[] = [
    { quote: "SafeScan has given me peace of mind I never knew I needed. Their protection is top-notch!", author: "Dannele Frey", role: "Small Business Owner" },
    { quote: "As a tech enthusiast, I've tried many antiviruses. SafeScan is by far the most comprehensive and user-friendly.", author: "Felix Dean", role: "Software Developer" },
    { quote: "Implementing SafeScan across our organization has significantly reduced our cybersecurity incidents.", author: "Diana Ford", role: "IT Director, FZ Corp" },
    { quote: "I feel so much safer browsing the internet since I started using SafeScan. It's a game-changer!", author: "Mike Johnson", role: "Freelance Writer" },
    { quote: "The customer support team at SafeScan is phenomenal. They're always there when you need them.", author: "Sarah Thompson", role: "E-commerce Entrepreneur" },
    { quote: "SafeScan's real-time protection has saved me from several potential threats. It's worth every penny.", author: "Alex Chen", role: "Graphic Designer" },
    { quote: "As a parent, I appreciate how SafeScan helps me keep my kids safe online. It's a must-have for families.", author: "Emily Rodriguez", role: "Mother of 3" },
    { quote: "The ease of use combined with powerful protection makes SafeScan stand out from other antivirus solutions.", author: "Chris Taylor", role: "IT Consultant" },
    { quote: "I've recommended SafeScan to all my clients. It's the best cybersecurity solution for small businesses.", author: "Jessica Lee", role: "Business Coach" },
    { quote: "SafeScan's regular updates give me confidence that I'm always protected against the latest threats.", author: "Robert Wilson", role: "Retired Teacher" },
  ];

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  const totalSlides = Math.ceil(reviews.length / 2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);
      
    return () => clearInterval(timer);
  }, [totalSlides]);

  const goToPreviousReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % totalSlides);
  };

  const goToNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

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

      <header className="relative h-[450px] w-full"> 
        <SlideShow images={heroSlides} interval={5000}/>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-center px-4 lg:px-0">
            <h1 className="text-3xl lg:text-5xl font-bold mb-2">
              Secure Your Digital World with SafeScan
            </h1>
            <p className="text-2sm lg:text-2xl mb-5">
              Advanced antivirus solutions for personal and business use
            </p>
            <a href='/products'>
              <button className="bg-cyan-600 text-white px-6 lg:px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300 flex items-center mx-auto">
                Get Started
              </button>             
            </a>
          </div>
        </div>
      </header>

      <section className="py-12 lg:py-16 px-4 lg:px-2">
        <div className="container mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">SafeScan</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-4 text-base lg:text-lg leading-relaxed">
                SafeScan is a leading provider of cutting-edge antivirus and cybersecurity solutions. Our mission is to protect individuals and businesses from ever-evolving digital threats. With advanced real-time scanning and automatic updates, SafeScan ensures that you stay one step ahead of viruses, malware, and cyber attacks.
              </p>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                Whether you're at home or in the office, our easy-to-use platform offers seamless protection, so you can focus on what matters most while we safeguard your digital environment.
              </p>
            </div>
            <div className="relative h-48 lg:h-64 bg-gray-800 rounded-lg overflow-hidden">
              {threats.map(threat => (
                <Threat key={threat.id} x={threat.x} y={threat.y} />
              ))}
              <div 
                className="absolute w-8 lg:w-12 h-8 lg:h-12 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${shieldPosition.x}%`, top: `${shieldPosition.y}%` }}
              >
                <Shield className="w-full h-full text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 py-12 lg:py-16 px-4 lg:px-0">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">98.9%</div>
              <p className="text-gray-300">Virus Detection Rate</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">6M+</div>
              <p className="text-gray-300">Threats Blocked Daily</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">#1</div>
              <p className="text-gray-300">In Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 px-4 lg:px-0">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">Why Trust SafeScan?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start p-4">
              <Shield className="text-cyan-400 mr-4 flex-shrink-0" size={24} />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Advanced Protection</h4>
                <p className="text-gray-300">Our cutting-edge technology provides unparalleled security against the latest cyber threats.</p>
              </div>
            </div>
            <div className="flex items-start p-4">
              <Clock className="text-cyan-400 mr-4 flex-shrink-0" size={24} />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">24/7 Support</h4>
                <p className="text-gray-300">Our dedicated team is always available to assist you with any security concerns.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl lg:text-2xl font-semibold text-center mb-8">What Our Customers Say</h3>
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.slice(slideIndex * (window.innerWidth >= 768 ? 2 : 1), 
                                 slideIndex * (window.innerWidth >= 768 ? 2 : 1) + (window.innerWidth >= 768 ? 2 : 1))
                      .map((review, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
                          <div className="flex text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                          </div>
                          <p className="text-gray-300 italic mb-4">"{review.quote}"</p>
                          <p className="text-cyan-300 font-semibold">{review.author}</p>
                          <p className="text-gray-400 text-sm">{review.role}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={goToPreviousReview}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={goToNextReview}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-gray-800 px-4 lg:px-0">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">Our Protection Packages</h2>
          <p className="text-lg lg:text-xl text-center mb-8">
            SafeScan provides comprehensive cybersecurity solutions for individuals, families, small businesses, and large enterprises.
          </p>
          <div className="text-center">
            <a href='/products'>
              <button className="bg-cyan-600 text-white px-6 lg:px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300 flex items-center mx-auto">
                Explore Our Packages <ChevronRight className="ml-2" />
              </button>            
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-8 px-4 lg:px-0">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SafeScan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;