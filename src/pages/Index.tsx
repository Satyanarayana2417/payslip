import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Sparkles, GraduationCap, LogOut, LayoutDashboard } from "lucide-react";
import PayslipForm from "@/components/PayslipForm";
import PayslipPreview from "@/components/PayslipPreview";
import { PayslipData } from "@/types/payslip";
import heroGradient from "@/assets/hero-gradient.jpg";
import { useNavigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [payslipData, setPayslipData] = useState<PayslipData>({
    companyName: "DREAM TEAM SERVICES",
    month: "NOV",
    year: "2022",
    employeeNo: "10250369",
    employeeName: "RUTANSH K JAGTAP",
    bankName: "HDFC BANK",
    bankAccount: "50100420356351",
    dob: "22 AUGUST 2004",
    lopDays: "0",
    pfAccount: "BQBNV0025468741254569",
    stdDays: "31",
    pfUan: "100444568523",
    daysPaid: "31",
    department: "Amzn Technical & IT Department",
    designation: "Junior Artificial Intelligence Engineer",
    location: "BANGALORE",
    prevLop: "0",
    esiNo: "-",
    earnings: {
      basic: "1700000.00",
      hra: "18571.00",
      lta: "10800.00",
      medical: "5000.00",
      conveyance: "2653.00",
      mealAllowance: "2500.00",
      flexiAllowance: "1569.00",
      joiningBonus: "19371.00",
      transport: "10500.00",
    },
    deductions: {
      pfEmployee: "9854.00",
      profTax: "34655.00",
      labourWf: "200.00",
      insurance: "8956.00",
    },
    pfEmployer: "9854.00",
  });

  const handleDownload = (format: "png" | "pdf") => {
    // Placeholder for download functionality
    console.log(`Downloading as ${format}`);
  };

  if (!showBuilder) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-teal-50/30 to-background">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroGradient})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-float" />

        {/* Top Navigation Bar */}
        <div className="relative z-20 border-b border-primary/10 bg-background/50 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">Payslip Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base font-medium text-primary">Professional Payslip Generator</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight px-2">
              Generate{" "}
              <span className="bg-gradient-to-r from-primary via-teal-500 to-primary bg-clip-text text-transparent">
                Pixel-Perfect
              </span>
              <br />
              Payslips in Seconds
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Create professional A4 payslips with precision grid design and premium aesthetics.
              Export to PNG, PDF, or SVG instantly.
            </p>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                onClick={() => setShowBuilder(true)}
                className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FileText className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Create Employee Payslip
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/intern-payslip')}
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-primary/30 hover:bg-primary/5"
              >
                <GraduationCap className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Create Intern Payslip
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12 max-w-4xl mx-auto px-4">
              {[
                {
                  icon: FileText,
                  title: "A4 Precision",
                  description: "Perfect layout matching professional standards"
                },
                {
                  icon: Sparkles,
                  title: "Live Preview",
                  description: "See changes in real-time as you type"
                },
                {
                  icon: Download,
                  title: "Multi-Format",
                  description: "Export to PNG, PDF, or SVG instantly"
                }
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="p-5 sm:p-6 backdrop-blur-sm bg-card/50 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4 mx-auto" />
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/50 backdrop-blur-sm mt-12 sm:mt-16">
          <div className="container mx-auto px-4 py-6 sm:py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm sm:textPremi-base text-muted-foreground">
              <p className="text-center md:text-left">© 2024 Payslip Generator . DREAM TEAM SERVICES .INC</p>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-teal-50/30 to-background">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          {/* Back Button and Badge - Badge Centered */}
          <div className="relative flex items-center justify-center mb-3 sm:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBuilder(false)}
              className="absolute left-0 p-2 hover:bg-primary/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </Button>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">Payslip Generator</span>
            </div>
          </div>
          
          {/* Content - Center Aligned */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4 px-2">
              Generate{" "}
              <span className="bg-gradient-to-r from-primary via-teal-500 to-primary bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              Employee Payslips
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Create comprehensive, compliant salary slips with all necessary fields
            </p>
          </div>
        </div>

        {/* Action Buttons - Desktop Only */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
          <Button
            onClick={() => handleDownload("png")}
            className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 bg-gradient-to-r from-primary to-teal-500 hover:opacity-90"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Download PNG</span>
            <span className="sm:hidden">PNG</span>
          </Button>
          <Button
            onClick={() => handleDownload("pdf")}
            variant="secondary"
            className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
            <div className="max-h-[85vh] overflow-y-auto pr-0 xl:pr-4 custom-scrollbar">
              <PayslipForm data={payslipData} onChange={setPayslipData} />
            </div>
            <div className="overflow-x-auto pl-0 xl:pl-4">
              <div className="min-w-[350px]">
                <PayslipPreview data={payslipData} />
              </div>
            </div>
          </div>
          
          {/* Mobile Download Buttons - Below Content */}
          <div className="sm:hidden space-y-3">
            <Button
              onClick={() => handleDownload("pdf")}
              className="w-full gap-2 bg-gradient-to-r from-primary to-teal-500 hover:opacity-90 py-6"
              size="lg"
            >
              <FileText className="w-5 h-5" />
              <span className="font-semibold">Download PDF</span>
            </Button>
            <Button
              onClick={() => handleDownload("png")}
              variant="secondary"
              className="w-full gap-2 py-6"
              size="lg"
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold">Download PNG</span>
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Index;
