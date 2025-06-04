
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';
import ArtUpload from '../components/ArtUpload';
import ArtGallery from '../components/ArtGallery';
import UserProfile from '../components/UserProfile';
import ShoppingCart from '../components/ShoppingCart';
import PaymentModal from '../components/PaymentModal';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  artistName: string;
  bio: string;
  artworks: any[];
  joinedDate: string;
}

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

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  artistName: string;
  quantity: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const savedArtworks = localStorage.getItem('artworks');
    if (savedArtworks) {
      setArtworks(JSON.parse(savedArtworks));
    }

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save artworks to localStorage whenever artworks change
  useEffect(() => {
    localStorage.setItem('artworks', JSON.stringify(artworks));
  }, [artworks]);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAuth = (userData: User) => {
    setCurrentUser(userData);
    setCurrentView('profile');
    toast.success(`Welcome${userData.name ? `, ${userData.name}` : ''}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
    setCurrentView('home');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems');
    toast.success('Logged out successfully');
  };

  const handleArtworkUpload = (artwork: Artwork) => {
    setArtworks(prev => [artwork, ...prev]);
    setCurrentView('home');
    toast.success('Artwork uploaded successfully!');
  };

  const handleAddToCart = (artwork: Artwork) => {
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      setCurrentView('login');
      return;
    }

    const existingItem = cartItems.find(item => item.id === artwork.id);
    if (existingItem) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const cartItem: CartItem = {
        id: artwork.id,
        title: artwork.title,
        price: artwork.price,
        image: artwork.image,
        artistName: artwork.artistName,
        quantity: 1
      };
      setCartItems(prev => [...prev, cartItem]);
    }
    toast.success('Added to cart!');
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Mark items as sold
    const soldArtworkIds = cartItems.map(item => item.id);
    setArtworks(prev =>
      prev.map(artwork =>
        soldArtworkIds.includes(artwork.id)
          ? { ...artwork, sold: true }
          : artwork
      )
    );
    
    setCartItems([]);
    setCurrentView('home');
    toast.success('Payment successful! Thank you for your purchase!');
  };

  const handleViewArtist = (artistId: number) => {
    // For demo purposes, this would navigate to artist profile
    toast.info('Artist profile feature coming soon!');
  };

  const getUserArtworks = () => {
    return currentUser ? artworks.filter(art => art.artistId === currentUser.id) : [];
  };

  const calculateCartTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    return subtotal + tax;
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <AuthForm type="login" onAuth={handleAuth} />;
      case 'register':
        return <AuthForm type="register" onAuth={handleAuth} />;
      case 'upload':
        return currentUser ? (
          <ArtUpload onUpload={handleArtworkUpload} currentUser={currentUser} />
        ) : (
          <AuthForm type="login" onAuth={handleAuth} />
        );
      case 'profile':
        return currentUser ? (
          <UserProfile
            user={currentUser}
            userArtworks={getUserArtworks()}
            onEditProfile={() => toast.info('Edit profile feature coming soon!')}
          />
        ) : (
          <AuthForm type="login" onAuth={handleAuth} />
        );
      case 'cart':
        return (
          <ShoppingCart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        );
      default:
        return (
          <ArtGallery
            artworks={artworks}
            onAddToCart={handleAddToCart}
            onViewArtist={handleViewArtist}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        isLoggedIn={!!currentUser}
        onLogout={handleLogout}
        cartItems={cartItems.length}
      />
      
      {renderCurrentView()}
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        total={calculateCartTotal()}
      />
    </div>
  );
};

export default Index;
