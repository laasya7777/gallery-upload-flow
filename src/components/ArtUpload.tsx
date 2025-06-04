
import React, { useState } from 'react';
import { Upload, Image, DollarSign, Tag, FileText } from 'lucide-react';

interface ArtUploadProps {
  onUpload: (artwork: any) => void;
  currentUser: any;
}

const ArtUpload: React.FC<ArtUploadProps> = ({ onUpload, currentUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    medium: '',
    dimensions: '',
    image: null as File | null
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const artwork = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      medium: formData.medium,
      dimensions: formData.dimensions,
      image: imagePreview,
      artistId: currentUser.id,
      artistName: currentUser.artistName,
      uploadDate: new Date().toLocaleDateString(),
      sold: false
    };
    
    onUpload(artwork);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      medium: '',
      dimensions: '',
      image: null
    });
    setImagePreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Upload Your Artwork</h1>
            <p className="text-purple-100 mt-2">Share your creativity with the world</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artwork Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-64 rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, image: null });
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label
                  htmlFor="image-upload"
                  className="mt-3 inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 cursor-pointer"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Choose Image
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter artwork title"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <div className="mt-1 relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select a category</option>
                  <option value="painting">Painting</option>
                  <option value="photography">Photography</option>
                  <option value="digital">Digital Art</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="drawing">Drawing</option>
                  <option value="mixed-media">Mixed Media</option>
                </select>
              </div>

              {/* Medium */}
              <div>
                <label htmlFor="medium" className="block text-sm font-medium text-gray-700">
                  Medium
                </label>
                <input
                  type="text"
                  id="medium"
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Oil on canvas, Digital, Watercolor"
                />
              </div>

              {/* Dimensions */}
              <div className="md:col-span-2">
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                  Dimensions
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., 24 x 36 inches, 60 x 90 cm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Tell the story behind your artwork..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Artwork
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtUpload;
