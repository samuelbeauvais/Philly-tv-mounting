'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Philadelphia',
    zipCode: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
    '7:00 PM - 9:00 PM',
  ]

  // Get services from URL if coming from services page
  const preSelectedServices = searchParams.get('services')
  const estimatedTotal = searchParams.get('total')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate?.toISOString(),
          timeSlot: selectedTime,
          services: preSelectedServices,
          estimatedTotal,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const data = await response.json()
      console.log('Booking created:', data)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('There was an error submitting your booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 // Exclude Sundays
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1) // Start from tomorrow

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600">
                Thank you for your booking. We've sent a confirmation email to{' '}
                <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="font-semibold text-lg mb-3">Appointment Details:</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Location:</strong> {formData.address}, {formData.city},{' '}
                  {formData.zipCode}
                </p>
                {estimatedTotal && (
                  <p>
                    <strong>Estimated Total:</strong> ${estimatedTotal}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                You'll receive a call from us within 24 hours to confirm your appointment and
                discuss any specific requirements.
              </p>
              <a
                href="/"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Schedule Your Appointment</h1>
            <p className="text-xl text-gray-600">
              Choose a date and time that works best for you
            </p>
          </div>

          {estimatedTotal && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-center">
                <strong>Estimated Total:</strong>{' '}
                <span className="text-2xl font-bold text-blue-600">${estimatedTotal}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Wall type, TV size, special requirements, etc."
                  />
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Select Date & Time</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={minDate}
                    filterDate={isWeekday}
                    inline
                    required
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We're available Monday through Saturday
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time Slot *
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map(slot => (
                      <label
                        key={slot}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          value={slot}
                          required
                          checked={selectedTime === slot}
                          onChange={e => setSelectedTime(e.target.value)}
                          className="mr-3 h-4 w-4 text-blue-600"
                        />
                        <span>{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t">
              <button
                type="submit"
                disabled={submitting || !selectedDate || !selectedTime}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
              >
                {submitting ? 'Processing...' : 'Confirm Booking'}
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                By booking, you agree to receive confirmation and reminder communications
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
