
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

// Sample artworks with placeholder images
const sampleArtworks: Artwork[] = [
  {
    id: 1,
    title: "Abstract Dreams",
    description: "A vibrant abstract painting exploring the realm of dreams and imagination.",
    price: 450,
    category: "painting",
    medium: "Acrylic on canvas",
    dimensions: "24x36 inches",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    artistId: 1,
    artistName: "Sarah Johnson",
    uploadDate: "2024-01-15",
    sold: false
  },
  {
    id: 2,
    title: "City Lights",
    description: "A stunning photograph capturing the energy of urban nightlife.",
    price: 320,
    category: "photography",
    medium: "Digital photography",
    dimensions: "20x30 inches",
    image: "https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?w=400&h=400&fit=crop",
    artistId: 2,
    artistName: "Mike Chen",
    uploadDate: "2024-01-20",
    sold: false
  },
  {
    id: 3,
    title: "Serenity",
    description: "A peaceful landscape painting of a mountain lake at sunrise.",
    price: 680,
    category: "painting",
    medium: "Oil on canvas",
    dimensions: "30x40 inches",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    artistId: 3,
    artistName: "Emma Rodriguez",
    uploadDate: "2024-01-25",
    sold: false
  },
  {
    id: 4,
    title: "Digital Harmony",
    description: "A modern digital art piece exploring color and form.",
    price: 280,
    category: "digital",
    medium: "Digital art",
    dimensions: "16x20 inches print",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop",
    artistId: 4,
    artistName: "Alex Thompson",
    uploadDate: "2024-02-01",
    sold: false
  },
  {
    id: 5,
    title: "Ocean Waves",
    description: "A dynamic seascape capturing the power and beauty of ocean waves.",
    price: 520,
    category: "painting",
    medium: "Watercolor",
    dimensions: "18x24 inches",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop",
    artistId: 5,
    artistName: "David Kim",
    uploadDate: "2024-02-05",
    sold: false
  },
  {
    id: 6,
    title: "Urban Portrait",
    description: "A striking black and white portrait photography.",
    price: 380,
    category: "photography",
    medium: "Black & white photography",
    dimensions: "16x24 inches",
    image: "https://images.unsplash.com/photo-1494790108755-2616c047884c?w=400&h=400&fit=crop",
    artistId: 6,
    artistName: "Lisa Park",
    uploadDate: "2024-02-10",
    sold: false
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>(sampleArtworks);
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
      const parsedArtworks = JSON.parse(savedArtworks);
      // Merge with sample artworks, avoiding duplicates
      const existingIds = parsedArtworks.map((art: Artwork) => art.id);
      const newSampleArtworks = sampleArtworks.filter(art => !existingIds.includes(art.id));
      setArtworks([...parsedArtworks, ...newSampleArtworks]);
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
