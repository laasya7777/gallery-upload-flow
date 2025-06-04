
import React, { useState } from 'react';
import { User, Mail, Lock, Palette } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
  onAuth: (userData: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onAuth }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    artistName: '',
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'register') {
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        artistName: formData.artistName || formData.name,
        bio: formData.bio,
        artworks: [],
        joinedDate: new Date().toLocaleDateString()
      };
      
      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      onAuth(userData);
    } else {
      // For demo purposes, create a simple login
      const userData = {
        id: Date.now(),
        name: formData.email.split('@')[0],
        email: formData.email,
        artistName: formData.email.split('@')[0],
        bio: 'Art enthusiast and creator',
        artworks: [],
        joinedDate: new Date().toLocaleDateString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      onAuth(userData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Palette className="mx-auto h-12 w-12 text-purple-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {type === 'login' ? 'Sign in to your account' : 'Create your artist account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {type === 'login' ? 'Welcome back to ArtVault' : 'Join our community of artists'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {type === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10"
                    placeholder="Your full name"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10"
                  placeholder="Password"
                />
              </div>
            </div>
            
            {type === 'register' && (
              <>
                <div>
                  <label htmlFor="artistName" className="block text-sm font-medium text-gray-700">
                    Artist Name (Optional)
                  </label>
                  <input
                    id="artistName"
                    name="artistName"
                    type="text"
                    value={formData.artistName}
                    onChange={handleChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10"
                    placeholder="Your artist pseudonym"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio (Optional)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10"
                    placeholder="Tell us about your artistic journey..."
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              {type === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
