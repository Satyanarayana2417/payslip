import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, Auth, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, Firestore } from 'firebase/firestore';
import { Layers, LogOut, FileText, Users, Clock, Settings } from 'lucide-react';

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

interface UserData {
  username?: string;
  email?: string;
  role?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('👤 User authenticated:', currentUser.uid);
        setUser(currentUser);

        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
            console.log('✅ User data loaded');
          } else {
            setUserData({ username: 'Admin User', email: currentUser.email || '' });
            console.log('⚠️ User document not found in Firestore');
          }
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
          setUserData({ username: 'Admin User', email: currentUser.email || '' });
        }

        setIsLoading(false);
      } else {
        console.log('❌ No user authenticated, redirecting to login...');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      console.log('🚪 Logging out...');
      await signOut(auth);
      console.log('✅ Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('❌ Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Payslip Studio</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{userData.username || 'Admin User'}</p>
                <p className="text-xs text-gray-600">{userData.email || user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8 mb-8 border-0 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {userData.username || 'Admin'}! 👋</h2>
          <p className="text-teal-50 text-lg">Manage your payslip generation system with ease.</p>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
              <FileText className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Payslips</h3>
            <p className="text-gray-600 text-sm mb-4">Create professional payslips for employees quickly and efficiently.</p>
            <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Open Generator</span>
              <span className="ml-2">→</span>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group" onClick={() => navigate('/intern-payslip')}>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Intern Payslips</h3>
            <p className="text-gray-600 text-sm mb-4">Generate specialized payslips for interns with modern design.</p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Open Intern Portal</span>
              <span className="ml-2">→</span>
            </div>
          </Card>

          {/* Card 3 */}
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <Clock className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-gray-600 text-sm mb-4">View and manage your recent payslip generation history.</p>
            <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
              <span>View History</span>
              <span className="ml-2">→</span>
            </div>
          </Card>

          {/* Card 4 */}
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
              <Settings className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Configure application settings and preferences.</p>
            <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Open Settings</span>
              <span className="ml-2">→</span>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>Protected by Firebase Authentication</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
