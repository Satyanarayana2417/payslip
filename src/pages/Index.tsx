import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Sparkles } from "lucide-react";
import PayslipForm from "@/components/PayslipForm";
import PayslipPreview from "@/components/PayslipPreview";
import { PayslipData } from "@/types/payslip";
import heroGradient from "@/assets/hero-gradient.jpg";

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [payslipData, setPayslipData] = useState<PayslipData>({
    companyName: "amazon.in",
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

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Professional Payslip Generator</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              Generate{" "}
              <span className="bg-gradient-to-r from-primary via-teal-500 to-primary bg-clip-text text-transparent">
                Pixel-Perfect
              </span>
              <br />
              Payslips in Seconds
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create professional A4 payslips with precision grid design and premium aesthetics.
              Export to PNG, PDF, or SVG instantly.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => setShowBuilder(true)}
                className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FileText className="mr-2 h-5 w-5" />
                Create Payslip
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
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
                  className="p-6 backdrop-blur-sm bg-card/50 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2024 Payslip Generator. Premium digital craftsmanship.</p>
              <div className="flex gap-6">
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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold">Payslip Generator</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload("png")}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                PNG
              </Button>
              <Button
                size="sm"
                onClick={() => handleDownload("pdf")}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Payslip Details</h2>
              <p className="text-muted-foreground">Fill in the information to generate your payslip</p>
            </div>
            <PayslipForm data={payslipData} onChange={setPayslipData} />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div>
              <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
              <PayslipPreview data={payslipData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
