import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  Auth,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { Eye, EyeOff, Layers } from 'lucide-react';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKIOuX5I5jVBGfvSHFK_a0rzQJi-Q-THM",
  authDomain: "payslip-generator-b8317.firebaseapp.com",
  projectId: "payslip-generator-b8317",
  storageBucket: "payslip-generator-b8317.firebasestorage.app",
  messagingSenderId: "971294189905",
  appId: "1:971294189905:web:6454179ffa220b509e8b70",
  measurementId: "G-CH5YP80XDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Debug log to verify component is loaded with latest code
  console.log('🚀 AdminLogin component loaded - Version with snsnarayana@gmail.com authorized');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Input sanitization
  const sanitizeInput = (input: string) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = () => {
    if (!email || !isValidEmail(email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (!password || password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // List of authorized admin emails
  const AUTHORIZED_ADMINS = [
    'snsnarayana@gmail.com',
    'dreamteam9849@gova.com',
    // Add more authorized admin emails here
  ];

  // Check if user is authorized admin
  const isAuthorizedAdmin = async (userId: string, email: string): Promise<boolean> => {
    try {
      console.log('🔍 Checking authorization for:', email);
      console.log('📋 Authorized list:', AUTHORIZED_ADMINS);
      
      // Check against authorized email list first (most reliable)
      const emailLower = email.toLowerCase();
      const isInList = AUTHORIZED_ADMINS.includes(emailLower);
      console.log('📧 Email check:', emailLower, 'In list:', isInList);
      
      if (isInList) {
        console.log('✅ Email is in authorized list!');
        return true;
      }
      
      // Check Firestore for existing admin as fallback
      console.log('🔍 Checking Firestore for userId:', userId);
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('📄 Firestore user data:', userData);
        if (userData.role === 'admin') {
          console.log('✅ User has admin role in Firestore!');
          return true;
        }
      } else {
        console.log('⚠️ No Firestore document found for user');
      }
      
      console.log('❌ Authorization failed for:', email);
      return false;
    } catch (error) {
      console.error('❌ Error checking authorization:', error);
      return false;
    }
  };

  // Update last login
  const updateLastLogin = async (userId: string) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        lastLogin: serverTimestamp()
      }, { merge: true });
      console.log('✅ Last login updated');
    } catch (error) {
      console.error('⚠️ Error updating last login:', error);
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    console.log('🔐 Attempting admin login...');

    try {
      // Set persistence based on "Remember Me" checkbox
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      console.log(`🔒 Persistence set to: ${rememberMe ? 'local' : 'session'}`);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ Login successful:', user.uid);

      // Check if user is authorized admin
      const isAuthorized = await isAuthorizedAdmin(user.uid, email);
      
      if (!isAuthorized) {
        // Unauthorized access - sign out immediately
        await signOut(auth);
        setIsLoading(false);
        
        toast({
          title: "⚠️ Access Denied",
          description: "You are not authorized to access this admin portal. This incident will be logged.",
          variant: "destructive",
        });
        
        console.warn('🚫 Unauthorized login attempt:', email);
        return;
      }

      // Update last login for authorized admin
      await updateLastLogin(user.uid);

      toast({
        title: "✅ Access Granted",
        description: "Welcome back, Admin! Redirecting...",
      });

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error: any) {
      console.error('❌ Login error:', error.code, error.message);
      setIsLoading(false);

      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = '⚠️ Access Denied: No authorized admin account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = '⚠️ Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/too-many-requests':
          errorMessage = '⚠️ Too many failed attempts. Account temporarily locked. Try again later.';
          break;
        case 'auth/invalid-credential':
          errorMessage = '⚠️ Invalid credentials. Only authorized admins can access this portal.';
          break;
      }

      toast({
        title: "🚫 Access Denied",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!email || !isValidEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Success!",
        description: "Password reset email sent! Check your inbox.",
      });
    } catch (error) {
      console.error('❌ Password reset error:', error);
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('👤 User already logged in:', user.uid);
        navigate('/');
      } else {
        console.log('👤 No user logged in');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-4 sm:p-8 shadow-2xl border-0 bg-white">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-600 rounded-full flex items-center justify-center">
              <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-lg sm:text-3xl font-bold text-gray-900 mb-2">🔐 Payslip generator</h1>
          <p className="text-gray-600 text-xs sm:text-sm">Authorized Persons Only</p>
          
          {/* Warning Banner */}
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 text-center font-medium">
              ⚠️ Restricted Access: Only authorized administrators can login
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 sm:h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-10 sm:h-11 pr-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-gray-700 font-medium">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
            >
              
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 sm:h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold text-sm sm:text-base shadow-lg shadow-teal-600/30 transition-all"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-xs sm:text-sm">Verifying Access...</span>
              </div>
            ) : (
              <span>🔐 Admin Sign In</span>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-red-600 flex items-center justify-center gap-2 mb-2">
            <span>⚠️</span>
            <span className="font-semibold">Unauthorized access is prohibited and monitored</span>
          </p>
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>by Dream team services .INC</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
