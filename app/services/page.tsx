'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  category: 'mounting' | 'addon' | 'additional'
}

const services: Service[] = [
  {
    id: 'standard-mount',
    name: 'Standard TV Mount (up to 55")',
    description: 'Professional mounting for TVs up to 55 inches',
    basePrice: 125,
    category: 'mounting',
  },
  {
    id: 'large-mount',
    name: 'Large TV Mount (55"-75")',
    description: 'Mounting service for larger TVs 55-75 inches',
    basePrice: 175,
    category: 'mounting',
  },
  {
    id: 'xl-mount',
    name: 'Extra Large TV Mount (75"+)',
    description: 'Premium mounting for TVs over 75 inches',
    basePrice: 250,
    category: 'mounting',
  },
  {
    id: 'fireplace-mount',
    name: 'Above Fireplace Mount',
    description: 'Specialized mounting above fireplace with proper heat management',
    basePrice: 200,
    category: 'mounting',
  },
  {
    id: 'cable-concealment-basic',
    name: 'Basic Cable Concealment',
    description: 'Hide cables using raceways or simple management',
    basePrice: 50,
    category: 'addon',
  },
  {
    id: 'cable-concealment-wall',
    name: 'In-Wall Cable Concealment',
    description: 'Professional in-wall cable routing for clean look',
    basePrice: 150,
    category: 'addon',
  },
  {
    id: 'soundbar',
    name: 'Soundbar Installation',
    description: 'Mount and configure soundbar with your TV',
    basePrice: 75,
    category: 'addon',
  },
  {
    id: 'surround-sound',
    name: 'Surround Sound Setup',
    description: 'Full 5.1 or 7.1 surround sound installation',
    basePrice: 200,
    category: 'addon',
  },
  {
    id: 'tv-removal',
    name: 'TV Removal & Remount',
    description: 'Remove existing TV and remount at new location',
    basePrice: 100,
    category: 'additional',
  },
  {
    id: 'smart-home',
    name: 'Smart Home Integration',
    description: 'Connect TV to smart home systems (Alexa, Google Home, etc.)',
    basePrice: 50,
    category: 'additional',
  },
  {
    id: 'commercial',
    name: 'Commercial Installation',
    description: 'Business/office TV installation (per TV)',
    basePrice: 150,
    category: 'additional',
  },
]

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleService = (serviceId: string) => {
    // For mounting category, only allow one selection
    const service = services.find(s => s.id === serviceId)
    if (service?.category === 'mounting') {
      const mountingServices = services.filter(s => s.category === 'mounting').map(s => s.id)
      const newSelected = selectedServices.filter(id => !mountingServices.includes(id))
      setSelectedServices([...newSelected, serviceId])
    } else {
      setSelectedServices(prev =>
        prev.includes(serviceId)
          ? prev.filter(id => id !== serviceId)
          : [...prev, serviceId]
      )
    }
  }

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId)
      return total + (service?.basePrice || 0)
    }, 0)
  }

  const getSelectedServiceDetails = () => {
    return selectedServices.map(id => services.find(s => s.id === id)!).filter(Boolean)
  }

  const mountingServices = services.filter(s => s.category === 'mounting')
  const addonServices = services.filter(s => s.category === 'addon')
  const additionalServices = services.filter(s => s.category === 'additional')

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services & Pricing</h1>
          <p className="text-xl text-gray-600">
            Select the services you need and see your instant price estimate
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mounting Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">TV Mounting Services</h2>
              <p className="text-sm text-gray-600 mb-4">Select one mounting service:</p>
              <div className="space-y-3">
                {mountingServices.map(service => (
                  <label
                    key={service.id}
                    className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      type="radio"
                      name="mounting"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                      className="mt-1 mr-4 h-5 w-5 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                        <span className="text-xl font-bold text-blue-600 ml-4">
                          ${service.basePrice}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Add-on Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Add-on Services</h2>
              <p className="text-sm text-gray-600 mb-4">Select any additional services:</p>
              <div className="space-y-3">
                {addonServices.map(service => (
                  <label
                    key={service.id}
                    className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                      className="mt-1 mr-4 h-5 w-5 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                        <span className="text-xl font-bold text-blue-600 ml-4">
                          +${service.basePrice}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Additional Services</h2>
              <p className="text-sm text-gray-600 mb-4">Select any additional services:</p>
              <div className="space-y-3">
                {additionalServices.map(service => (
                  <label
                    key={service.id}
                    className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                      className="mt-1 mr-4 h-5 w-5 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                        <span className="text-xl font-bold text-blue-600 ml-4">
                          +${service.basePrice}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-4">Price Estimate</h2>

              {selectedServices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Select services to see your price estimate
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {getSelectedServiceDetails().map(service => (
                      <div key={service.id} className="flex justify-between items-start">
                        <span className="text-sm text-gray-700">{service.name}</span>
                        <span className="text-sm font-semibold">${service.basePrice}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-3xl font-bold text-blue-600">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={{
                      pathname: '/booking',
                      query: { services: selectedServices.join(','), total: calculateTotal() }
                    }}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition block text-center"
                  >
                    Book These Services
                  </Link>

                  <button
                    onClick={() => setSelectedServices([])}
                    className="w-full mt-3 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Clear All
                  </button>
                </>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> Final pricing may vary based on specific installation requirements,
                  wall type, and complexity. Free quote provided on-site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
