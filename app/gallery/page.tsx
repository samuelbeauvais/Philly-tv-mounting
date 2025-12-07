'use client'

import { useState } from 'react'
import Image from 'next/image'

// Sample gallery data - you'll replace these with actual photos
const galleryItems = [
  {
    id: 1,
    title: 'Living Room 65" TV Mount',
    category: 'Living Room',
    description: 'Professional wall mount with cable concealment',
    image: '/images/placeholder-1.jpg',
  },
  {
    id: 2,
    title: 'Above Fireplace Installation',
    category: 'Fireplace',
    description: '55" TV mounted above fireplace with soundbar',
    image: '/images/placeholder-2.jpg',
  },
  {
    id: 3,
    title: 'Bedroom TV Setup',
    category: 'Bedroom',
    description: 'Articulating mount for flexible viewing angles',
    image: '/images/placeholder-3.jpg',
  },
  {
    id: 4,
    title: 'Commercial Office Installation',
    category: 'Commercial',
    description: 'Multiple TVs in conference room',
    image: '/images/placeholder-4.jpg',
  },
  {
    id: 5,
    title: 'Home Theater Setup',
    category: 'Home Theater',
    description: '75" TV with 5.1 surround sound system',
    image: '/images/placeholder-5.jpg',
  },
  {
    id: 6,
    title: 'Corner TV Mount',
    category: 'Living Room',
    description: 'Space-saving corner mount installation',
    image: '/images/placeholder-6.jpg',
  },
]

const categories = ['All', 'Living Room', 'Bedroom', 'Fireplace', 'Commercial', 'Home Theater']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Work Gallery</h1>
          <p className="text-xl text-gray-600">
            See examples of our professional TV mounting installations
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition group"
            >
              <div className="relative h-64 bg-gray-200">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm font-semibold">Sample Image {item.id}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition font-semibold">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  {item.category}
                </span>
                <h3 className="font-bold text-lg mt-1 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions for adding photos */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="font-bold text-lg mb-2">Adding Your Photos:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Add your actual installation photos to the <code className="bg-yellow-100 px-1 rounded">/public/images/</code> folder</li>
            <li>Update the <code className="bg-yellow-100 px-1 rounded">galleryItems</code> array in <code className="bg-yellow-100 px-1 rounded">/app/gallery/page.tsx</code></li>
            <li>Change the <code className="bg-yellow-100 px-1 rounded">image</code> property to match your file names</li>
            <li>Update titles, descriptions, and categories as needed</li>
          </ol>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <div className="relative h-96 bg-gray-800 rounded-lg mb-4">
              {/* Placeholder for enlarged image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg font-semibold">Sample Image {selectedImage.id}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-2xl font-bold mt-1">{selectedImage.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
