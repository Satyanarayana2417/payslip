import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Sparkles, ArrowLeft, LogOut, LayoutDashboard } from "lucide-react";
import InternPayslipForm from "@/components/InternPayslipForm";
import ModernInternPayslipPreview from "@/components/ModernInternPayslipPreview";
import { InternPayslipData } from "@/types/payslip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
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

const InternPayslip = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("split");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [payslipData, setPayslipData] = useState<InternPayslipData>({
    // General Information
    companyName: "DREAM TEAM SERVICES .INC KAKINADA",
    companyAddress: "123 Tech Park, Innovation Drive\nBangalore, Karnataka 560001",
    month: "January",
    year: "2025",
    payslipReferenceNo: "INT-2025-001",
    
    // Intern Information
    internName: "",
    internId: "",
    department: "",
    designation: "",
    joiningDate: "",
    internshipStartDate: "",
    internshipEndDate: "",
    workLocation: "Office",
    daysWorked: "30",
    daysPaid: "30",
    
    // Stipend & Earnings
    earnings: {
      baseStipend: "15000.00",
      performanceBonus: "0.00",
      travelAllowance: "0.00",
      mealAllowance: "0.00",
      internetAllowance: "0.00",
      otherAllowance: "0.00",
    },
    
    // Deductions
    deductions: {
      tds: "0.00",
      otherDeductions: "0.00",
    },
    
    // Bank Information
    bankName: "",
    accountNumber: "",
    upiId: "",
    paymentMode: "Bank Transfer",
    paymentDate: "",
    transactionId: "",
    
    // Declaration / Notes
    remarks: "",
    hrContact: "hr@dreamteamservices.com",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPNG = async () => {
    setIsGenerating(true);
    toast.info("Generating PNG...");
    
    try {
      const element = document.getElementById("payslip-preview");
      if (!element) {
        toast.error("Preview not found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `Intern_Payslip_${payslipData.internName || "Intern"}_${payslipData.month}_${payslipData.year}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success("PNG downloaded successfully!");
    } catch (error) {
      console.error("Error generating PNG:", error);
      toast.error("Failed to generate PNG");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    toast.info("Generating PDF...");
    
    try {
      const element = document.getElementById("payslip-preview");
      if (!element) {
        toast.error("Preview not found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Intern_Payslip_${payslipData.internName || "Intern"}_${payslipData.month}_${payslipData.year}.pdf`);
      
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-teal-50/30 to-background">
      {/* Top Navigation Bar */}
      <div className="border-b border-primary/10 bg-background/50 backdrop-blur-md">
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

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          {/* Back Button and Badge - Badge Centered */}
          <div className="relative flex items-center justify-center mb-3 sm:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="absolute left-0 p-2 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Intern Payslip Generator</span>
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
              Intern Payslips
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Create comprehensive, compliant stipend slips with all necessary fields
            </p>
          </div>
        </div>

        {/* Action Buttons - Desktop Only */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
          <Button
            onClick={handleDownloadPNG}
            disabled={isGenerating}
            className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 bg-gradient-to-r from-primary to-teal-500 hover:opacity-90"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Download PNG</span>
            <span className="sm:hidden">PNG</span>
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            variant="secondary"
            className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6 sm:mb-8">
            <TabsTrigger value="form" className="text-xs sm:text-sm">Form Only</TabsTrigger>
            <TabsTrigger value="split" className="text-xs sm:text-sm">Split View</TabsTrigger>
            <TabsTrigger value="preview" className="text-xs sm:text-sm">Preview Only</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <div className="max-w-4xl mx-auto">
              <InternPayslipForm data={payslipData} onChange={setPayslipData} />
              
              {/* Mobile Download Buttons - Below Form */}
              <div className="sm:hidden mt-6 space-y-3">
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className="w-full gap-2 bg-gradient-to-r from-primary to-teal-500 hover:opacity-90 py-6"
                  size="lg"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">Download PDF</span>
                </Button>
                <Button
                  onClick={handleDownloadPNG}
                  disabled={isGenerating}
                  variant="secondary"
                  className="w-full gap-2 py-6"
                  size="lg"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Download PNG</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="split">
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
                <div className="max-h-[85vh] overflow-y-auto pr-0 xl:pr-4 custom-scrollbar">
                  <InternPayslipForm data={payslipData} onChange={setPayslipData} />
                </div>
                <div className="overflow-x-auto pl-0 xl:pl-4">
                  <div className="min-w-[350px]">
                    <ModernInternPayslipPreview data={payslipData} />
                  </div>
                </div>
              </div>
              
              {/* Mobile Download Buttons - Below Content */}
              <div className="sm:hidden space-y-3">
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className="w-full gap-2 bg-gradient-to-r from-primary to-teal-500 hover:opacity-90 py-6"
                  size="lg"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">Download PDF</span>
                </Button>
                <Button
                  onClick={handleDownloadPNG}
                  disabled={isGenerating}
                  variant="secondary"
                  className="w-full gap-2 py-6"
                  size="lg"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Download PNG</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <div className="min-w-[350px]">
                  <ModernInternPayslipPreview data={payslipData} />
                </div>
              </div>
              
              {/* Mobile Download Buttons - Below Preview */}
              <div className="sm:hidden mt-6 space-y-3">
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className="w-full gap-2 bg-gradient-to-r from-primary to-teal-500 hover:opacity-90 py-6"
                  size="lg"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">Download PDF</span>
                </Button>
                <Button
                  onClick={handleDownloadPNG}
                  disabled={isGenerating}
                  variant="secondary"
                  className="w-full gap-2 py-6"
                  size="lg"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Download PNG</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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

export default InternPayslip;
