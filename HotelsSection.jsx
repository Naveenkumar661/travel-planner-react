import { useState, useEffect } from 'react'
import { Star, MapPin, X, Search, CheckCircle2 } from 'lucide-react'
import axios from 'axios'

function HotelsSection() {
  // --- States ---
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHotel, setSelectedHotel] = useState(null)
  
  // Booking States
  const [isBooking, setIsBooking] = useState(false)
  const [bookingStatus, setBookingStatus] = useState('idle') 
  const [bookingData, setBookingData] = useState({
    email: '',
    phone_number: '',
    travel_date: '',
    passengers: 1
  })

  // --- Fetch Data ---
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/hotels/')
      .then(res => {
        setHotels(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("MySQL Fetch Error:", err)
        setLoading(false)
      })
  }, [])

  // --- Filter Logic ---
  const filters = ['all', 'leisure', 'business', 'honeymoon', 'family']

  const filteredHotels = hotels.filter(hotel => {
    const matchesType = activeFilter === 'all' || hotel.hotel_type === activeFilter;
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Handle Search Submit (Reacting to Enter)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // This provides a visual "flash" or confirmation that search was triggered
    console.log("Searching for:", searchTerm);
  };

  // --- Booking Submission ---
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('loading');
    
    const payload = {
      ...bookingData,
      destination: selectedHotel.name,
      origin: "Website User",
      travel_mode: "Hotel Stay",
      total_price: selectedHotel.price * bookingData.passengers
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/bookings/', payload);
      setBookingStatus('success');
      setTimeout(() => {
        setIsBooking(false);
        setSelectedHotel(null);
        setBookingStatus('idle');
        setBookingData({ email: '', phone_number: '', travel_date: '', passengers: 1 });
      }, 3000);
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Booking failed. Please check your connection.");
      setBookingStatus('idle');
    }
  };

  if (loading) return <div className="text-center text-white py-20 font-medium">Loading luxury stays...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">Featured Hotels</h2>
        <p className="text-gray-400">Discover handpicked destinations from our database</p>
      </div>

      {/* --- Search Bar with Enter Support --- */}
      <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-4 relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#0ea5e9] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by hotel or city (e.g., Goa)..."
            className="w-full bg-[#1e293b] border border-[#334155] rounded-2xl py-4 pl-12 pr-24 text-white focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20 outline-none transition-all shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* Results Indicator */}
      <div className="text-center mb-10">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          {searchTerm ? `Found ${filteredHotels.length} matches for "${searchTerm}"` : `Showing all ${hotels.length} hotels`}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-semibold capitalize transition-all duration-300 ${
              activeFilter === filter 
                ? 'bg-[#0ea5e9] text-white shadow-lg shadow-sky-500/30 scale-105' 
                : 'bg-[#1e293b] text-gray-400 hover:text-white border border-[#334155]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Hotel Grid */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#1e293b] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#0ea5e9] transition-all duration-500 cursor-pointer flex flex-col group hover:shadow-2xl hover:shadow-sky-500/10"
              onClick={() => setSelectedHotel(hotel)}
            >
              <div className="relative h-60 overflow-hidden">
                <img src={hotel.image_main} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-[#0ea5e9]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {hotel.hotel_type}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#0ea5e9] transition-colors">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">{hotel.rating || '4.5'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-red-500" /> {hotel.location}
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#334155]">
                  <div>
                    <span className="text-2xl font-black text-[#10b981]">₹{hotel.price}</span>
                    <span className="text-gray-500 text-[10px] ml-1 uppercase">/ night</span>
                  </div>
                  <button className="bg-[#1e293b] border border-[#334155] group-hover:bg-[#0ea5e9] group-hover:border-[#0ea5e9] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
                    View Stays
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-[#1e293b] inline-block p-6 rounded-3xl border border-[#334155] mb-4">
             <Search className="w-12 h-12 text-gray-600 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-white">No stays found</h3>
          <p className="text-gray-400 mt-2">Try searching for something else or clear filters.</p>
          <button onClick={() => {setSearchTerm(''); setActiveFilter('all')}} className="mt-6 text-[#0ea5e9] font-bold hover:underline">Reset All Filters</button>
        </div>
      )}

      {/* Modal: Hotel Details */}
      {selectedHotel && !isBooking && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#334155] shadow-2xl">
            <div className="relative h-72 md:h-96">
              <img src={selectedHotel.image_main} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedHotel(null)} className="absolute top-6 right-6 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white transition-all"><X /></button>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-4xl font-black text-white">{selectedHotel.name}</h2>
                  <div className="flex items-center gap-2 text-gray-400 mt-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="text-lg">{selectedHotel.location}</span>
                  </div>
                </div>
                <div className="bg-[#10b981]/10 border border-[#10b981]/20 p-4 rounded-2xl text-center">
                  <div className="text-3xl font-black text-[#10b981]">₹{selectedHotel.price}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Best Rate / Night</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">{selectedHotel.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-3">
                   <h4 className="text-white font-bold flex items-center gap-2 uppercase text-xs tracking-widest text-gray-500">3D Virtual Tour</h4>
                   <div className="h-60 rounded-2xl overflow-hidden border border-[#334155] shadow-inner">
                     <iframe src={selectedHotel.map_3d_url} width="100%" height="100%" className="border-none grayscale-[0.3] hover:grayscale-0 transition-all"></iframe>
                   </div>
                </div>
                <div className="space-y-3">
                   <h4 className="text-white font-bold flex items-center gap-2 uppercase text-xs tracking-widest text-gray-500">Premium Room View</h4>
                   <div className="h-60 rounded-2xl overflow-hidden border border-[#334155]">
                     <img src={selectedHotel.image_room || selectedHotel.image_main} className="w-full h-full object-cover" />
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#334155]">
                <button onClick={() => setSelectedHotel(null)} className="flex-1 bg-[#1e293b] text-white font-bold py-5 rounded-2xl hover:bg-[#334155] transition-all">Return to Gallery</button>
                <button onClick={() => setIsBooking(true)} className="flex-[2] bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-black py-5 rounded-2xl shadow-xl shadow-sky-500/20 transition-all transform hover:-translate-y-1">Confirm Reservation</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Booking Form */}
      {isBooking && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-[#1e293b] p-10 rounded-3xl border border-[#334155] w-full max-w-md text-center shadow-2xl">
            {bookingStatus === 'success' ? (
              <div className="py-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-white">Reserved!</h3>
                <p className="text-gray-400 mt-3">Your stay at {selectedHotel.name} is confirmed.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white">Finalize Booking</h3>
                  <p className="text-gray-400 text-sm mt-1">Please provide your check-in details</p>
                </div>
                <form onSubmit={handleBookingSubmit} className="space-y-5 text-left">
                  <div>
                    <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest ml-1">Check-in Date</label>
                    <input type="date" required className="w-full bg-[#0f172a] border border-[#334155] p-4 rounded-xl text-white mt-1 focus:border-[#0ea5e9] outline-none" 
                           onChange={e => setBookingData({...bookingData, travel_date: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest ml-1">Contact Email</label>
                    <input type="email" placeholder="you@example.com" required className="w-full bg-[#0f172a] border border-[#334155] p-4 rounded-xl text-white mt-1 focus:border-[#0ea5e9] outline-none"
                         onChange={e => setBookingData({...bookingData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest ml-1">Mobile Number</label>
                    <input type="text" placeholder="+91 XXXXX XXXXX" required className="w-full bg-[#0f172a] border border-[#334155] p-4 rounded-xl text-white mt-1 focus:border-[#0ea5e9] outline-none"
                         onChange={e => setBookingData({...bookingData, phone_number: e.target.value})} />
                  </div>
                  <div className="flex gap-4 pt-6">
                    <button type="button" onClick={() => setIsBooking(false)} className="flex-1 text-gray-500 font-bold hover:text-white transition-colors">Go Back</button>
                    <button type="submit" disabled={bookingStatus === 'loading'} className="flex-[2] bg-[#10b981] hover:bg-[#059669] text-white py-4 rounded-2xl font-black shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1 disabled:opacity-50">
                      {bookingStatus === 'loading' ? 'Securing Stay...' : 'Confirm Stay'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelsSection