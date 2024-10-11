import React, { useState, useEffect } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import Navbar from "../components/navbar";
import { useLocation, useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  country?: string;
  city?: string;
  zipCode?: string;
}

const CheckoutForm: React.FC = () => {
  const data = useLocation().state;
  const navigate = useNavigate();

  const planName = data.planName;
  const planPrice = data.planPrice;
  const planDesc = data.planDesc;
  const planFeatures: String[] = data.planFeatures;
  const planType = data.planType;

  const [quantity, setQuantity] = useState(1);
  const [years, setYears] = useState(1);
  const [countries, setCountries] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(planPrice);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    city: '',
    zipCode: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const sortedCountries = data
          .map((country: any) => country.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(sortedCountries);
      });
  }, []);

  useEffect(() => {
    let price = planPrice;
    
    if (planType === 'individual') {
      price = quantity >= 3 ? planPrice * 0.9 : planPrice;
      price *= quantity * years;
    } else if (planType === 'group') {
      if (years >= 5) {
        price *= 0.8; 
      } else if (years >= 3) {
        price *= 0.9; 
      }
      price *= quantity * years;
    } else if (planType === 'business') {
      if (years >= 5) {
        price *= 0.75;
      } else if (years >= 3) {
        price *= 0.85; 
      }
      price *= years;
    }
    
    setTotalPrice(price);
  }, [quantity, years, planPrice, planType]);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleYearsChange = (change: number) => {
    setYears(prev => Math.max(1, prev + change));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined
    }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = 'Please enter a valid email address';
    }

    if (formData.firstName.trim().length < 4) {
      errors.firstName = 'First name must be at least 4 characters long';
    }

    if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters long';
    }

    if (formData.address.trim().length < 10) {
      errors.address = 'Please enter your address detail';
    }

    if (!formData.country) {
      errors.country = 'Please select a country';
    }

    if (formData.city.trim().length < 3) {
      errors.city = 'Please enter a valid city name';
    }

    if (!formData.zipCode.match(/^[0-9]{5}(-[0-9]{4})?$/)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      
      alert(
        "Thank you for your purchase!\n\n" +
        "Your order details:\n" +
        `Plan: ${planName}\n` +
        `Total Price: $${totalPrice.toFixed(2)}\n\n` +
        "Your purchase details will be sent to your email."
      );

      navigate('/');
    }
  };


  return (
    <div className="bg-gray-900 text-gray-100 min-h-dvh w-dvw">
      <Navbar activeItem="Products" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Selected Plan: {planName}</h2>
              <p className="text-gray-300 mb-4">{planDesc}</p>
              <ul className="mb-6">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <Check className="text-green-400 mr-2" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {(planType === 'individual') && (
                <div className="flex items-center mb-4">
                  <span className="mr-4">Quantity:</span>
                  <button onClick={() => handleQuantityChange(-1)} className="bg-cyan-600 text-white p-2 rounded-full">
                    <Minus size={16} />
                  </button>
                  <span className="mx-4">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="bg-cyan-600 text-white p-2 rounded-full">
                    <Plus size={16} />
                  </button>
                </div>
              )}
              {(planType !== 'individual') && (
                <div className="flex items-center mb-4">
                  <span className="mr-4">Subscription Years:</span>
                  <button onClick={() => handleYearsChange(-1)} className="bg-cyan-600 text-white p-2 rounded-full">
                    <Minus size={16} />
                  </button>
                  <span className="mx-4">{years}</span>
                  <button onClick={() => handleYearsChange(1)} className="bg-cyan-600 text-white p-2 rounded-full">
                    <Plus size={16} />
                  </button>
                </div>
              )}
              <p className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}/year</p>
              {planType === 'individual' && quantity < 3 && (
                <p className="text-sm text-gray-400">Get 10% discount for 3 or more licenses!</p>
              )}
              {planType === 'individual' && quantity >= 3 && (
                <p className="text-sm text-green-400">10% discount applied for 3 or more licenses!</p>
              )}
              {planType === 'group' && years < 3 && (
                <p className="text-sm text-gray-400">Add more subscription year to get special price!</p>
              )}
              {planType === 'group' && years >= 3 && (
                <p className="text-sm text-green-400">
                  {years >= 5 ? '20% discount applied for 5+ years subscription!' : '10% discount applied for 3-4 years subscription!'}
                </p>
              )}
              {planType === 'business' && years >= 3 && (
                <p className="text-sm text-green-400">
                  {years >= 5 ? '25% discount applied for 5+ years subscription!' : '15% discount applied for 3-4 years subscription!'}
                </p>
              )}
            </div>
          </div>

          <div className="md:w-1/2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="w-full p-2 rounded bg-gray-700 text-white" 
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                    className="w-full p-2 rounded bg-gray-700 text-white" 
                  />
                  {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                    className="w-full p-2 rounded bg-gray-700 text-white" 
                  />
                  {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block mb-2">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required 
                  className="w-full p-2 rounded bg-gray-700 text-white" 
                />
                {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
              </div>
              
              <div>
                <label htmlFor="country" className="block mb-2">Country</label>
                <select 
                  id="country" 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required 
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  <option value="">Select a country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block mb-2">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required 
                    className="w-full p-2 rounded bg-gray-700 text-white" 
                  />
                  {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
                </div>
                <div>
                  <label htmlFor="zipCode" className="block mb-2">Zip Code</label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required 
                    className="w-full p-2 rounded bg-gray-700 text-white" 
                  />
                  {formErrors.zipCode && <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>}
                </div>
              </div>
              
              <button type="submit" className="bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300">
                Complete Purchase
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;