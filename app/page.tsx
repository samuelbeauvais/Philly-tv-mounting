import Link from 'next/link'
import { CheckCircleIcon, CalendarIcon, PhotoIcon, CalculatorIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Professional TV Mounting in Philadelphia
            </h1>
            <p className="text-xl mb-8">
              Expert installation services for your home or business.
              Fast, reliable, and affordable TV mounting you can trust.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Book Now
              </Link>
              <Link
                href="/services"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircleIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
              <p className="text-gray-600">
                Licensed, insured, and experienced technicians ensure perfect installation every time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CalendarIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Evening and weekend appointments available to fit your busy schedule.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <PhotoIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Clean Installation</h3>
              <p className="text-gray-600">
                Professional cable management and concealment for a clean, polished look.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Standard TV Mount</h3>
              <p className="text-gray-600 mb-4">Perfect for most TVs up to 55"</p>
              <p className="text-2xl font-bold text-blue-600">From $125</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Large TV Mount</h3>
              <p className="text-gray-600 mb-4">For TVs 55"-75"</p>
              <p className="text-2xl font-bold text-blue-600">From $175</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Fireplace Mount</h3>
              <p className="text-gray-600 mb-4">Above-fireplace installation</p>
              <p className="text-2xl font-bold text-blue-600">From $200</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Cable Management</h3>
              <p className="text-gray-600 mb-4">Hide cables for clean look</p>
              <p className="text-2xl font-bold text-blue-600">From $50</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <CalculatorIcon className="w-5 h-5" />
              Get a Price Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Book your appointment today and get your TV mounted professionally</p>
          <Link
            href="/booking"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Schedule Your Installation
          </Link>
        </div>
      </section>
    </main>
  )
}
