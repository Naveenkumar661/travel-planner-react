import { useState } from 'react'
import { Plane, Train, Bus, Ship, Globe, MapPin, Calendar, Users, Search, Clock, ArrowRight, Mail, Phone } from 'lucide-react'
import axios from 'axios'

function BookingForm({ onBookingSuccess }) {
  const [travelType, setTravelType] = useState('international')
  const [selectedMode, setSelectedMode] = useState('airplane')
  const [fromCountry, setFromCountry] = useState('')
  const [toCountry, setToCountry] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  // --- NEW: Error States for Professional Validation ---
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const modes = [
    { id: 'airplane', name: 'Airplane', icon: Plane, color: '#0ea5e9' },
    { id: 'train', name: 'Train', icon: Train, color: '#f59e0b' },
    { id: 'bus', name: 'Bus', icon: Bus, color: '#10b981' },
    { id: 'ship', name: 'Ship', icon: Ship, color: '#8b5cf6' },
  ]

  const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'UAE', 'Thailand', 'Malaysia']
  const domesticCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Goa', 'Kerala']

  // --- NEW: Professional Validation Handlers ---
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Strictly allows only numbers and max 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      if (value.length > 0 && value.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Regex for standard email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value.length === 0) {
      setEmailError("");
    } else if (!value.includes("@")) {
      setEmailError("Email is missing '@' symbol");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid domain (e.g. .com, .in)");
    } else {
      setEmailError("");
    }
  };

  const calculateArrivalTime = () => {
    const durations = {
      airplane: { international: '8-12 hours', domestic: '1-3 hours' },
      train: { international: '24-48 hours', domestic: '4-12 hours' },
      bus: { international: '20-36 hours', domestic: '6-16 hours' },
      ship: { international: '5-15 days', domestic: '1-3 days' },
    }
    return durations[selectedMode][travelType]
  }

  const handleSearch = (e) => {
    e.preventDefault()
    
    // Final check before proceeding
    if (emailError || phoneError || phone.length !== 10) {
        alert("Please fix the errors in the form before calculating price.");
        return;
    }

    if (fromCountry && toCountry) {
      const zones = {
        'India': 1, 'UAE': 2, 'Singapore': 2, 'Malaysia': 2, 'Thailand': 2,
        'Japan': 3, 'Germany': 4, 'France': 4, 'United Kingdom': 4, 'Australia': 4,
        'United States': 5, 'Canada': 5,
        'Mumbai': 1, 'Pune': 1, 'Goa': 2, 'Bangalore': 2, 'Hyderabad': 2,
        'Chennai': 3, 'Delhi': 4, 'Jaipur': 4, 'Kolkata': 5, 'Kerala': 3
      }

      const basePrices = { airplane: 4000, train: 600, bus: 300, ship: 3500 }
      const zoneStart = zones[fromCountry] || 1
      const zoneEnd = zones[toCountry] || 1
      const distanceFactor = Math.abs(zoneStart - zoneEnd) + 1
      const typeMultiplier = travelType === 'international' ? 5 : 1

      const totalAmount = (basePrices[selectedMode] * distanceFactor * typeMultiplier) * passengers

      const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(totalAmount)
      
      setSearchResults({
        from: fromCountry,
        to: toCountry,
        mode: selectedMode,
        duration: calculateArrivalTime(),
        date: date,
        passengers: passengers,
        price: formattedPrice 
      })
    }
  }

  const handleFinalBooking = async () => {
    if (!email || !phone || !date || emailError || phoneError) {
      alert("Please ensure all fields are correctly filled!");
      return;
    }

    const dataToSend = {
      travel_mode: searchResults.mode,
      origin: searchResults.from,
      destination: searchResults.to,
      travel_date: searchResults.date,
      passengers: searchResults.passengers,
      total_price: searchResults.price,
      email: email,             
      phone_number: phone,      
      status: 'Pending'
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tickets/', dataToSend);
      if (onBookingSuccess) {
        onBookingSuccess(response.data.id);
      }
    } catch (err) {
      console.error("Backend Error Details:", err.response?.data);
      alert("Booking Failed. Check your connection.");
    }
  }

  const locations = travelType === 'international' ? countries : domesticCities

  return (
    <div className="max-w-6xl mx-auto text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Book Your Journey</h2>
        <p className="text-gray-400">Secure booking with real-time validation</p>
      </div>

      <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#334155]">
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => { setTravelType('international'); setFromCountry(''); setToCountry(''); setSearchResults(null); }} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${travelType === 'international' ? 'bg-[#0ea5e9] text-white' : 'bg-[#334155] text-gray-300'}`}>
            <Globe className="w-5 h-5" /> International
          </button>
          <button onClick={() => { setTravelType('domestic'); setFromCountry(''); setToCountry(''); setSearchResults(null); }} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${travelType === 'domestic' ? 'bg-[#0ea5e9] text-white' : 'bg-[#334155] text-gray-300'}`}>
            <MapPin className="w-5 h-5" /> Domestic
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {modes.map((mode) => (
            <button key={mode.id} onClick={() => setSelectedMode(mode.id)} className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all bg-[#334155] border-2`} style={{ borderColor: selectedMode === mode.id ? mode.color : 'transparent' }}>
              <mode.icon className="w-6 h-6" style={{ color: mode.color }} />
              <span className="font-medium">{mode.name}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">From</label>
              <select required value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} className="w-full bg-[#334155] border border-[#475569] rounded-lg py-3 px-4 text-white">
                <option value="">Select Location</option>
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">To</label>
              <select required value={toCountry} onChange={(e) => setToCountry(e.target.value)} className="w-full bg-[#334155] border border-[#475569] rounded-lg py-3 px-4 text-white">
                <option value="">Select Location</option>
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Travel Date</label>
              <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-[#334155] border border-[#475569] rounded-lg py-3 px-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* --- PROFESSIONALLY VALIDATED EMAIL --- */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input 
                  required 
                  type="email" 
                  placeholder="name@email.com" 
                  value={email} 
                  onChange={handleEmailChange} 
                  className={`w-full bg-[#334155] border ${emailError ? 'border-red-500' : 'border-[#475569]'} rounded-lg py-3 pl-10 pr-4 text-white outline-none transition-colors`} 
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{emailError}</p>}
            </div>

            {/* --- PROFESSIONALLY VALIDATED PHONE --- */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input 
                  required 
                  type="tel" 
                  placeholder="10-digit number" 
                  value={phone} 
                  onChange={handlePhoneChange} 
                  className={`w-full bg-[#334155] border ${phoneError ? 'border-red-500' : 'border-[#475569]'} rounded-lg py-3 pl-10 pr-4 text-white outline-none transition-colors`} 
                />
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{phoneError}</p>}
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Passengers</label>
              <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="w-full bg-[#334155] border border-[#475569] rounded-lg py-3 px-4 text-white">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#0ea5e9] py-3 rounded-lg font-bold hover:bg-[#0284c7] transition-colors mb-6 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" /> Calculate Best Price
          </button>
        </form>

        {searchResults && (
          <div className="bg-[#334155] rounded-xl p-6 border border-[#475569] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Route</p>
                <p className="font-semibold text-lg">{searchResults.from} → {searchResults.to}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Duration</p>
                <p className="font-semibold text-lg">{searchResults.duration}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Amount</p>
                <p className="text-[#10b981] text-2xl font-bold">{searchResults.price}</p>
              </div>
              <div className="flex items-center">
                <button onClick={handleFinalBooking} className="w-full bg-[#10b981] py-4 rounded-lg font-bold hover:bg-[#059669] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#10b981]/20">
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingForm;