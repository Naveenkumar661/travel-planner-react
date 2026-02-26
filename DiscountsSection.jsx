import { Accessibility, GraduationCap, Briefcase, Users, Clock, Heart } from 'lucide-react'

function DiscountsSection() {
  const discounts = [
    {
      id: 1,
      title: 'Differently Abled',
      discount: '40%',
      description: 'Special discounts for travelers with disabilities',
      icon: Accessibility,
      color: '#8b5cf6',
      bgColor: '#8b5cf620'
    },
    {
      id: 2,
      title: 'Students',
      discount: '25%',
      description: 'Valid student ID required for verification',
      icon: GraduationCap,
      color: '#0ea5e9',
      bgColor: '#0ea5e920'
    },
    {
      id: 3,
      title: 'Business Travelers',
      discount: '15%',
      description: 'Corporate bookings and frequent travelers',
      icon: Briefcase,
      color: '#f59e0b',
      bgColor: '#f59e0b20'
    },
    {
      id: 4,
      title: 'Family Pack',
      discount: '20%',
      description: 'Groups of 4 or more family members',
      icon: Users,
      color: '#10b981',
      bgColor: '#10b98120'
    },
    {
      id: 5,
      title: 'Senior Citizens',
      discount: '30%',
      description: 'Travelers aged 60 years and above',
      icon: Heart,
      color: '#ec4899',
      bgColor: '#ec489920'
    },
    {
      id: 6,
      title: 'Early Bird',
      discount: '35%',
      description: 'Book 30+ days in advance',
      icon: Clock,
      color: '#06b6d4',
      bgColor: '#06b6d420'
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Special Discounts</h2>
        <p className="text-gray-400">Exclusive offers for our valued travelers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((item) => (
          <div
            key={item.id}
            className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] hover:border-opacity-50 transition-all"
            style={{ borderColor: item.color }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: item.bgColor }}
              >
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.discount}
                  </span>
                  <span className="text-gray-400">OFF</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        * Terms and conditions apply. Discounts cannot be combined with other offers.
      </p>
    </div>
  )
}

export default DiscountsSection