import { useState } from 'react'
import { Menu, X, ChevronDown, Plane, Train, Bus, Ship, Hotel, Utensils, Percent, User, LogOut, Globe, MapPin } from 'lucide-react'

function Navbar({ isLoggedIn, user, onLoginClick, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [travelType, setTravelType] = useState('international')

  const discounts = [
    { mode: 'Train', discount: '25% OFF', icon: Train, color: '#f59e0b' },
    { mode: 'Bus', discount: '30% OFF', icon: Bus, color: '#10b981' },
    { mode: 'Flights', discount: '20% OFF', icon: Plane, color: '#0ea5e9' },
    { mode: 'Ships', discount: '15% OFF', icon: Ship, color: '#8b5cf6' },
  ]

  const foods = [
    { name: 'Vegetarian Meal', price: '$8.99', description: 'Healthy veg options' },
    { name: 'Non-Veg Meal', price: '$12.99', description: 'Chicken, Fish, Mutton' },
    { name: 'Breakfast', price: '$6.99', description: 'Continental & Indian' },
    { name: 'Snacks', price: '$3.99', description: 'Light bites & beverages' },
    { name: 'Premium Dining', price: '$24.99', description: 'Gourmet experience' },
    { name: 'Kids Meal', price: '$5.99', description: 'Child-friendly options' },
  ]

  const modes = [
    { name: 'Airplane', icon: Plane, color: '#0ea5e9' },
    { name: 'Train', icon: Train, color: '#f59e0b' },
    { name: 'Bus', icon: Bus, color: '#10b981' },
    { name: 'Ship', icon: Ship, color: '#8b5cf6' },
  ]

  const hotelTypes = [
    { name: 'Leisure Trip', description: 'Relaxation & sightseeing' },
    { name: 'Business', description: 'Work & conferences' },
    { name: 'Honeymoon', description: 'Romantic getaways' },
    { name: 'Family', description: 'Kid-friendly stays' },
    { name: 'Adventure', description: 'Thrill & exploration' },
  ]

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <nav className="bg-[#1e293b] border-b border-[#334155] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">REMO Travels</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {/* Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('menu')}
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2"
              >
                <Menu className="w-5 h-5" />
                <span>Menu</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'menu' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'menu' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#1e293b] border border-[#334155] rounded-xl shadow-xl p-4">
                  <div className="mb-4">
                    <h3 className="text-[#0ea5e9] font-semibold mb-3 flex items-center gap-2">
                      <Percent className="w-4 h-4" /> Discounts
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {discounts.map((item) => (
                        <div key={item.mode} className="bg-[#334155] rounded-lg p-3 flex items-center gap-2">
                          <item.icon className="w-5 h-5" style={{ color: item.color }} />
                          <div>
                            <p className="text-white text-sm font-medium">{item.mode}</p>
                            <p className="text-xs" style={{ color: item.color }}>{item.discount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-[#f59e0b] font-semibold mb-3 flex items-center gap-2">
                      <Utensils className="w-4 h-4" /> Food Services
                    </h3>
                    <div className="space-y-2">
                      {foods.map((food) => (
                        <div key={food.name} className="flex items-center justify-between bg-[#334155] rounded-lg p-2">
                          <div>
                            <p className="text-white text-sm">{food.name}</p>
                            <p className="text-gray-400 text-xs">{food.description}</p>
                          </div>
                          <span className="text-[#10b981] font-semibold text-sm">{food.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modes Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('modes')}
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2"
              >
                <Plane className="w-5 h-5" />
                <span>Modes</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'modes' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'modes' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#1e293b] border border-[#334155] rounded-xl shadow-xl p-4">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setTravelType('international')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors ${
                        travelType === 'international' 
                          ? 'bg-[#0ea5e9] text-white' 
                          : 'bg-[#334155] text-gray-300 hover:text-white'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      International
                    </button>
                    <button
                      onClick={() => setTravelType('domestic')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors ${
                        travelType === 'domestic' 
                          ? 'bg-[#0ea5e9] text-white' 
                          : 'bg-[#334155] text-gray-300 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      Domestic
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {modes.map((mode) => (
                      <button
                        key={mode.name}
                        className="w-full flex items-center gap-3 bg-[#334155] hover:bg-[#3d4f69] rounded-lg p-3 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${mode.color}20` }}>
                          <mode.icon className="w-5 h-5" style={{ color: mode.color }} />
                        </div>
                        <span className="text-white font-medium">{mode.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hotels Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('hotels')}
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2"
              >
                <Hotel className="w-5 h-5" />
                <span>Hotels</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'hotels' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'hotels' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#1e293b] border border-[#334155] rounded-xl shadow-xl p-4">
                  <h3 className="text-[#f59e0b] font-semibold mb-3">Book Hotels For</h3>
                  <div className="space-y-2">
                    {hotelTypes.map((type) => (
                      <button
                        key={type.name}
                        className="w-full flex items-center justify-between bg-[#334155] hover:bg-[#3d4f69] rounded-lg p-3 transition-colors"
                      >
                        <div>
                          <p className="text-white font-medium text-left">{type.name}</p>
                          <p className="text-gray-400 text-xs text-left">{type.description}</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('user')}
                  className="flex items-center gap-2 bg-[#334155] px-4 py-2 rounded-lg hover:bg-[#3d4f69] transition-colors"
                >
                  <div className="w-8 h-8 bg-[#0ea5e9] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white">{user?.name || 'User'}</span>
                </button>
                
                {activeDropdown === 'user' && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-[#1e293b] border border-[#334155] rounded-xl shadow-xl p-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      My Profile
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-[#334155] rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onLoginClick}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onLoginClick}
                  className="bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#334155]">
            <div className="space-y-4">
              <button className="w-full flex items-center gap-2 text-gray-300 hover:text-white py-2">
                <Menu className="w-5 h-5" />
                Menu
              </button>
              <button className="w-full flex items-center gap-2 text-gray-300 hover:text-white py-2">
                <Plane className="w-5 h-5" />
                Modes
              </button>
              <button className="w-full flex items-center gap-2 text-gray-300 hover:text-white py-2">
                <Hotel className="w-5 h-5" />
                Hotels
              </button>
              {!isLoggedIn && (
                <button
                  onClick={onLoginClick}
                  className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
