import { useState } from 'react'
import WelcomePopup from './components/WelcomePopup.jsx'
import LoginPopup from './components/LoginPopup.jsx'
import Navbar from './components/Navbar.jsx'
import BookingForm from './components/BookingForm.jsx'
import HotelsSection from './components/HotelsSection.jsx'
import DiscountsSection from './components/DiscountsSection.jsx'
import ServicesReview from './components/ServicesReview.jsx'
import StatusPage from './components/StatusPage.jsx' // 1. Import the new StatusPage

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // 2. New states for the Booking flow
  const [bookingStep, setBookingStep] = useState('browsing') // 'browsing' or 'verifying'
  const [activeBookingId, setActiveBookingId] = useState(null)

  const handleWelcomeClose = () => {
    setShowWelcome(false)
    setShowLogin(true)
  }

  const handleLoginClose = () => {
    setShowLogin(false)
  }

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
    setShowLogin(false)
  }

  const handleOpenLogin = () => {
    setShowLogin(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  // 3. Logic to move to OTP screen
  const handleBookingConfirmed = (ticketId) => {
    setActiveBookingId(ticketId)
    setBookingStep('verifying')
    window.scrollTo(0, 0) // Scroll to top to see the OTP box
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {showWelcome && <WelcomePopup onClose={handleWelcomeClose} />}
      
      {showLogin && (
        <LoginPopup 
          onClose={handleLoginClose} 
          onSuccess={handleLoginSuccess} 
        />
      )}
      
      <Navbar 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLoginClick={handleOpenLogin}
        onLogout={handleLogout}
      />
      
      <main className="pt-4">
        {/* 4. Conditional Rendering: Show StatusPage OR the regular site */}
        {bookingStep === 'verifying' ? (
          <section className="px-4 md:px-8 lg:px-16 py-12">
            <StatusPage 
              bookingId={activeBookingId} 
              onBack={() => setBookingStep('browsing')} 
            />
            <div className="text-center mt-6">
               <button 
                 onClick={() => setBookingStep('browsing')}
                 className="text-gray-400 hover:text-[#0ea5e9] underline text-sm"
               >
                 ← Cancel and return to search
               </button>
            </div>
          </section>
        ) : (
          <>
            <section className="px-4 md:px-8 lg:px-16 py-8">
              {/* Pass the success handler to the BookingForm */}
              <BookingForm onBookingSuccess={handleBookingConfirmed} />
            </section>
            
            <section className="px-4 md:px-8 lg:px-16 py-8">
              <HotelsSection />
            </section>
            
            <section className="px-4 md:px-8 lg:px-16 py-8">
              <DiscountsSection />
            </section>
            
            <section className="px-4 md:px-8 lg:px-16 py-8">
              <ServicesReview />
            </section>
          </>
        )}
      </main>
      
      {/* ... Footer stays the same ... */}
      <footer className="bg-[#1e293b] py-8 px-4 md:px-8 lg:px-16 mt-8">
        <div className="max-w-7xl mx-auto text-center">
             <p className="text-gray-400 text-sm">© 2026 REMO Travels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App