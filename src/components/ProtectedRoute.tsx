import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, Auth, User } from 'firebase/auth';

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

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        console.log('✅ User authenticated:', currentUser.uid);
      } else {
        console.log('❌ No user authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('🚫 Redirecting to login - no authenticated user');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
