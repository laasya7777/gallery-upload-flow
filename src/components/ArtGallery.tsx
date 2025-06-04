
import React, { useState } from 'react';
import { Heart, ShoppingCart, Filter, Search, Star } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  medium: string;
  dimensions: string;
  image: string;
  artistId: number;
  artistName: string;
  uploadDate: string;
  sold: boolean;
}

interface ArtGalleryProps {
  artworks: Artwork[];
  onAddToCart: (artwork: Artwork) => void;
  onViewArtist: (artistId: number) => void;
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ artworks, onAddToCart, onViewArtist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  const categories = ['painting', 'photography', 'digital', 'sculpture', 'drawing', 'mixed-media'];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artistName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || artwork.category === selectedCategory;
    const matchesPrice = !priceRange || 
      (priceRange === 'under-100' && artwork.price < 100) ||
      (priceRange === '100-500' && artwork.price >= 100 && artwork.price <= 500) ||
      (priceRange === '500-1000' && artwork.price >= 500 && artwork.price <= 1000) ||
      (priceRange === 'over-1000' && artwork.price > 1000);
    
    return matchesSearch && matchesCategory && matchesPrice && !artwork.sold;
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favoriteIds);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavoriteIds(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Art</h1>
          <p className="text-xl md:text-2xl text-purple-100">
            Support independent artists and find your next favorite piece
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search artworks or artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">All Prices</option>
              <option value="under-100">Under $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="over-1000">Over $1000</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              {filteredArtworks.length} artworks found
            </div>
          </div>
        </div>

        {/* Artworks Grid */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No artworks found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map(artwork => (
              <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                      <button
                        onClick={() => toggleFavorite(artwork.id)}
                        className={`p-2 rounded-full ${
                          favoriteIds.has(artwork.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <Heart className="w-4 h-4" fill={favoriteIds.has(artwork.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => onAddToCart(artwork)}
                        className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{artwork.title}</h3>
                  <button
                    onClick={() => onViewArtist(artwork.artistId)}
                    className="text-purple-600 hover:text-purple-700 text-sm mb-2 block"
                  >
                    by {artwork.artistName}
                  </button>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">${artwork.price}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {artwork.category}
                    </span>
                  </div>
                  
                  {artwork.medium && (
                    <p className="text-sm text-gray-600 mb-2">{artwork.medium}</p>
                  )}
                  
                  {artwork.dimensions && (
                    <p className="text-xs text-gray-500">{artwork.dimensions}</p>
                  )}
                  
                  <button
                    onClick={() => onAddToCart(artwork)}
                    className="w-full mt-3 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtGallery;
