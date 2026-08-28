import React, { useState } from 'react';
import { Upload, Info, Image as ImageIcon } from 'lucide-react';

export default function CreateDonation() {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create Food Listing</h2>
        <p className="text-gray-500 mt-1">List surplus food for NGOs to claim and pick up.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Name *</label>
                <input type="text" placeholder="e.g., Vegetable Biryani, Assorted Breads" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Category *</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white">
                  <option>Prepared Meals</option>
                  <option>Raw Produce</option>
                  <option>Packaged Goods</option>
                  <option>Baked Goods</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white">
                  <option>Vegetarian</option>
                  <option>Non-Vegetarian</option>
                  <option>Vegan</option>
                  <option>Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="e.g., 30" className="w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  <select className="w-1/3 px-2 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white">
                    <option>Meals</option>
                    <option>kg</option>
                    <option>Items</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergens</label>
                <input type="text" placeholder="e.g., Nuts, Dairy, Gluten (Optional)" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
          </section>

          {/* Timing & Logistics */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Timing & Logistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prepared Date/Time *</label>
                <input type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best Before / Safe Until *</label>
                <input type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Start Time *</label>
                <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Deadline *</label>
                <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
                <input type="text" defaultValue="Green Leaf Restaurant, 123 Main St, Delhi" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                <p className="text-xs text-gray-500 mt-1">Defaults to your registered address. Edit if different.</p>
              </div>
            </div>
          </section>

          {/* Details & Photo */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Details & Photo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Description</label>
                <textarea rows={3} placeholder="Provide any additional details about the food, packaging, or pickup instructions..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 resize-none"></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Photo</label>
                <div className="flex items-start gap-6">
                  {photoPreview ? (
                    <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
                      <img src={photoPreview} alt="Food preview" className="w-full h-full object-cover" />
                      <button onClick={() => setPhotoPreview(null)} className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-600 hover:bg-white text-xs font-bold">✕</button>
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                      <ImageIcon size={32} className="mb-2" />
                      <span className="text-xs font-medium">No photo</span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload size={24} className="mb-2 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        
        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-end gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mr-auto hidden sm:flex">
            <Info size={16} />
            Listings expire automatically based on the deadline.
          </div>
          <button className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 bg-white rounded-md font-medium text-sm hover:bg-gray-50 transition-colors">
            Save as Draft
          </button>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-700 transition-colors shadow-sm">
            Publish Donation
          </button>
        </div>
      </div>
    </div>
  );
}
