
import React from 'react';
import { Calendar, Mail, Palette, Star, Edit } from 'lucide-react';

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

interface UserProfileProps {
  user: any;
  userArtworks: Artwork[];
  onEditProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, userArtworks, onEditProfile }) => {
  const totalEarnings = userArtworks.filter(art => art.sold).reduce((sum, art) => sum + art.price, 0);
  const totalViews = userArtworks.length * Math.floor(Math.random() * 100) + 50;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 sm:mb-0">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{user.artistName}</h1>
                <p className="text-gray-600 text-lg">{user.name}</p>
                <div className="flex items-center mt-2 text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Joined {user.joinedDate}</span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={onEditProfile}
                className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-md text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mt-6">
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Palette className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userArtworks.length}</p>
            <p className="text-gray-600">Artworks</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
            <p className="text-gray-600">Total Views</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold">$</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">${totalEarnings}</p>
            <p className="text-gray-600">Earnings</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">#</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{userArtworks.filter(art => art.sold).length}</p>
            <p className="text-gray-600">Sold</p>
          </div>
        </div>

        {/* Artworks */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Artworks</h2>
          </div>
          
          {userArtworks.length === 0 ? (
            <div className="p-12 text-center">
              <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No artworks yet</h3>
              <p className="text-gray-600">Upload your first artwork to get started!</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userArtworks.map(artwork => (
                  <div key={artwork.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">{artwork.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-purple-600">${artwork.price}</span>
                        {artwork.sold && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            SOLD
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{artwork.category}</p>
                      <p className="text-xs text-gray-500 mt-1">Uploaded {artwork.uploadDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
