import { Plane, Train, Bus, Ship } from 'lucide-react'

function WelcomePopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 max-w-lg w-full mx-4 border border-[#334155] shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0ms' }}>
              <Plane className="w-6 h-6 text-[#0ea5e9]" />
            </div>
            <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '100ms' }}>
              <Train className="w-6 h-6 text-[#f59e0b]" />
            </div>
            <div className="w-12 h-12 bg-[#10b981]/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '200ms' }}>
              <Bus className="w-6 h-6 text-[#10b981]" />
            </div>
            <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '300ms' }}>
              <Ship className="w-6 h-6 text-[#8b5cf6]" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4]">
              REMO Travels
            </span>
          </h1>
          
          <p className="text-gray-400 mb-6">
            Your journey begins here. Explore the world with our seamless booking experience.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#334155]/50 rounded-lg p-3">
              <p className="text-[#0ea5e9] font-semibold">500+</p>
              <p className="text-gray-400 text-sm">Destinations</p>
            </div>
            <div className="bg-[#334155]/50 rounded-lg p-3">
              <p className="text-[#f59e0b] font-semibold">1M+</p>
              <p className="text-gray-400 text-sm">Happy Travelers</p>
            </div>
            <div className="bg-[#334155]/50 rounded-lg p-3">
              <p className="text-[#10b981] font-semibold">24/7</p>
              <p className="text-gray-400 text-sm">Support</p>
            </div>
            <div className="bg-[#334155]/50 rounded-lg p-3">
              <p className="text-[#8b5cf6] font-semibold">Best</p>
              <p className="text-gray-400 text-sm">Prices</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomePopup