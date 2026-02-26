import { Star, Quote } from 'lucide-react'

function ServicesReview() {
  const services = [
    {
      id: 1,
      name: 'Flight Services',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop',
      rating: 4.8,
      description: 'Comfortable flights with premium amenities and on-time departures'
    },
    {
      id: 2,
      name: 'Train Journeys',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=250&fit=crop',
      rating: 4.6,
      description: 'Scenic routes with modern coaches and excellent connectivity'
    },
    {
      id: 3,
      name: 'Bus Travel',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop',
      rating: 4.5,
      description: 'Affordable and comfortable bus services across all major routes'
    },
    {
      id: 4,
      name: 'Ship Cruises',
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&h=250&fit=crop',
      rating: 4.9,
      description: 'Luxurious cruise experiences with world-class entertainment'
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      review: 'Amazing experience! The booking process was seamless and the trip was perfect.'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Mumbai, India',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
      review: 'Best travel platform I have used. Great discounts and excellent customer service.'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 4,
      review: 'Booked a family trip through REMO and everything was perfectly organized.'
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-400">Experience world-class travel with our premium services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#1e293b] rounded-xl overflow-hidden border border-[#334155] hover:border-[#0ea5e9] transition-all group"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">What Our Travelers Say</h2>
          <p className="text-gray-400">Real experiences from our valued customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#0ea5e9] opacity-30" />
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-[#f59e0b] fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesReview