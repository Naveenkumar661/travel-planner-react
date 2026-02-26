import React, { useState } from 'react';
import { ShieldCheck, MessageSquare, Smartphone, CreditCard, CheckCircle } from 'lucide-react';

const StatusPage = ({ bookingId, onVerifySuccess }) => {
  const [method, setMethod] = useState('whatsapp'); // 'whatsapp' or 'sms'
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleSendOTP = () => {
    // Logic to tell Django to send OTP via chosen method
    setOtpSent(true);
    alert(`OTP sent via ${method === 'whatsapp' ? 'WhatsApp' : 'SMS'}!`);
  };

  const handleVerifyOTP = () => {
    if (otpValue === '1234') { // Replace with actual backend check
      setIsVerified(true);
    } else {
      alert("Invalid OTP. Try '1234' for testing.");
    }
  };

  if (isVerified) {
    return (
      <div className="max-w-md mx-auto bg-[#1e293b] p-8 rounded-2xl border border-[#10b981] text-center">
        <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-400 mb-6">Your ticket for Booking #{bookingId} is confirmed. A PDF has been sent to your email.</p>
        <button className="bg-[#0ea5e9] w-full py-3 rounded-lg font-bold text-white">Download Ticket</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-2xl border border-[#334155]">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="w-8 h-8 text-[#0ea5e9]" />
        <h2 className="text-2xl font-bold text-white">Verify Your Booking</h2>
      </div>

      {!otpSent ? (
        <div>
          <p className="text-gray-400 mb-6">How would you like to receive your verification code?</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setMethod('whatsapp')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${method === 'whatsapp' ? 'border-[#10b981] bg-[#10b981]/10' : 'border-[#334155] bg-[#0f172a]'}`}
            >
              <MessageSquare className="text-[#10b981]" />
              <span className="text-white">WhatsApp</span>
            </button>
            <button 
              onClick={() => setMethod('sms')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${method === 'sms' ? 'border-[#0ea5e9] bg-[#0ea5e9]/10' : 'border-[#334155] bg-[#0f172a]'}`}
            >
              <Smartphone className="text-[#0ea5e9]" />
              <span className="text-white">SMS</span>
            </button>
          </div>
          <button onClick={handleSendOTP} className="w-full bg-[#0ea5e9] py-4 rounded-xl font-bold text-white">Send Code</button>
        </div>
      ) : (
        <div>
          <p className="text-gray-400 mb-4">Enter the 4-digit code sent to your device</p>
          <input 
            type="text" 
            maxLength="4"
            className="w-full bg-[#0f172a] border border-[#475569] rounded-xl py-4 text-center text-3xl tracking-widest text-white mb-6 focus:border-[#0ea5e9] outline-none"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
            placeholder="0000"
          />
          <button onClick={handleVerifyOTP} className="w-full bg-[#10b981] py-4 rounded-xl font-bold text-white mb-4">Verify & Pay</button>
          
          <div className="mt-8 border-t border-[#334155] pt-6 text-center">
             <p className="text-gray-500 text-sm mb-4">Secure Payment via UPI / QR</p>
             <div className="flex justify-center gap-4 opacity-50">
                <CreditCard className="text-white" />
                <span className="text-white font-bold">GPay / PhonePe / Paytm</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPage;