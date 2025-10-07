import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InternPayslipData } from "@/types/payslip";
import { 
  Building2, 
  User, 
  Wallet, 
  CreditCard,
  LucideIcon,
  TrendingUp,
  TrendingDown,
  Calculator
} from "lucide-react";
import { ReactNode, useMemo } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface InternPayslipFormProps {
  data: InternPayslipData;
  onChange: (data: InternPayslipData) => void;
}

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
}

// Components defined outside to prevent recreation on every render
const FormSection = ({ icon: Icon, title, children, collapsible = false, defaultOpen = true }: FormSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (collapsible) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="backdrop-blur-sm bg-card/50 border-primary/10 hover:border-primary/20 transition-all duration-300">
          <CollapsibleTrigger asChild>
            <div className="p-4 sm:p-6 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
                </div>
                <Button variant="ghost" size="sm" className="w-8 sm:w-9 p-0">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 space-y-4">{children}</div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  return (
    <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/50 border-primary/10 hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  );
};

const FormField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  required = false,
  disabled = false,
  description
}: FormFieldProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${
        type === 'number' ? 'text-right' : ''
      }`}
    />
    {description && (
      <p className="text-xs text-muted-foreground">{description}</p>
    )}
  </div>
);

const SelectField = ({ label, value, onChange, options, placeholder, required = false }: SelectFieldProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const InternPayslipForm = ({ data, onChange }: InternPayslipFormProps) => {
  const updateField = (field: keyof InternPayslipData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const updateEarnings = (field: keyof InternPayslipData['earnings'], value: string) => {
    onChange({
      ...data,
      earnings: { ...data.earnings, [field]: value },
    });
  };

  const updateDeductions = (field: keyof InternPayslipData['deductions'], value: string) => {
    onChange({
      ...data,
      deductions: { ...data.deductions, [field]: value },
    });
  };

  // Auto-calculate totals
  const totalGrossEarnings = useMemo(() => {
    const values = Object.values(data.earnings);
    const sum = values.reduce((sum, val) => {
      const num = parseFloat(val) || 0;
      return sum + num;
    }, 0);
    return Math.round(sum * 100) / 100;
  }, [data.earnings]);

  const totalDeductions = useMemo(() => {
    const values = Object.values(data.deductions);
    const sum = values.reduce((sum, val) => {
      const num = parseFloat(val) || 0;
      return sum + num;
    }, 0);
    return Math.round(sum * 100) / 100;
  }, [data.deductions]);

  const netStipend = useMemo(() => {
    const net = totalGrossEarnings - totalDeductions;
    return Math.round(net * 100) / 100;
  }, [totalGrossEarnings, totalDeductions]);

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };

  const workLocationOptions = [
    { value: "Office", label: "Office" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  return (
    <div className="space-y-6">
      {/* General Information */}
      <FormSection icon={Building2} title="General Information">
        <FormField
          label="Company Name"
          value={data.companyName}
          onChange={(v) => updateField("companyName", v)}
          placeholder="Enter company name"
          required
          disabled
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Month"
            value={data.month}
            onChange={(v) => updateField("month", v)}
            placeholder="e.g., January"
            required
          />
          <FormField
            label="Year"
            value={data.year}
            onChange={(v) => updateField("year", v)}
            placeholder="e.g., 2025"
            required
          />
        </div>
      </FormSection>

      {/* Intern Information */}
      <FormSection icon={User} title="Intern Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Intern Name"
            value={data.internName}
            onChange={(v) => updateField("internName", v)}
            placeholder="Full name"
            required
          />
          <FormField
            label="Intern ID / Code"
            value={data.internId}
            onChange={(v) => updateField("internId", v)}
            placeholder="Unique ID"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Department / Team"
            value={data.department}
            onChange={(v) => updateField("department", v)}
            placeholder="e.g., Engineering"
            required
          />
          <FormField
            label="Designation / Role"
            value={data.designation}
            onChange={(v) => updateField("designation", v)}
            placeholder="e.g., Software Development Intern"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Work Location"
            value={data.workLocation}
            onChange={(v) => updateField("workLocation", v)}
            options={workLocationOptions}
            placeholder="Select location type"
            required
          />
          <FormField
            label="Joining Date (DOJ)"
            value={data.joiningDate}
            onChange={(v) => updateField("joiningDate", v)}
            placeholder="DD MMM YYYY"
            type="date"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Days Worked (STD Days)"
            value={data.daysWorked}
            onChange={(v) => updateField("daysWorked", v)}
            placeholder="e.g., 30"
            type="number"
            description="Standard days in the month"
          />
          <FormField
            label="No of Days Paid"
            value={data.daysPaid}
            onChange={(v) => updateField("daysPaid", v)}
            placeholder="e.g., 30"
            type="number"
            description="Actual days paid after deductions"
          />
        </div>
      </FormSection>

      {/* Stipend & Earnings */}
      <FormSection icon={TrendingUp} title="Stipend & Earnings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Base Stipend (₹)"
            value={data.earnings.baseStipend}
            onChange={(v) => updateEarnings("baseStipend", v)}
            placeholder="0.00"
            type="number"
            required
          />
          <FormField
            label="Performance Bonus (₹)"
            value={data.earnings.performanceBonus}
            onChange={(v) => updateEarnings("performanceBonus", v)}
            placeholder="0.00"
            type="number"
          />
          <FormField
            label="Travel Allowance (₹)"
            value={data.earnings.travelAllowance}
            onChange={(v) => updateEarnings("travelAllowance", v)}
            placeholder="0.00"
            type="number"
          />
          <FormField
            label="Meal Allowance (₹)"
            value={data.earnings.mealAllowance}
            onChange={(v) => updateEarnings("mealAllowance", v)}
            placeholder="0.00"
            type="number"
          />
          <FormField
            label="Internet Allowance (₹)"
            value={data.earnings.internetAllowance}
            onChange={(v) => updateEarnings("internetAllowance", v)}
            placeholder="0.00"
            type="number"
          />
          <FormField
            label="Other Allowance (₹)"
            value={data.earnings.otherAllowance}
            onChange={(v) => updateEarnings("otherAllowance", v)}
            placeholder="0.00"
            type="number"
          />
        </div>
        <div className="pt-4 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <span className="font-semibold text-base sm:text-lg">Total Gross Earnings</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-primary">₹ {formatCurrency(totalGrossEarnings)}</span>
          </div>
        </div>
      </FormSection>

      {/* Deductions */}
      <FormSection icon={TrendingDown} title="Deductions (Optional)" collapsible defaultOpen={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="TDS Deduction (₹)"
            value={data.deductions.tds}
            onChange={(v) => updateDeductions("tds", v)}
            placeholder="0.00"
            type="number"
            description="Tax Deducted at Source"
          />
          <FormField
            label="Other Deductions (₹)"
            value={data.deductions.otherDeductions}
            onChange={(v) => updateDeductions("otherDeductions", v)}
            placeholder="0.00"
            type="number"
            description="Any other adjustments"
          />
        </div>
        <div className="pt-4 border-t border-destructive/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              <span className="font-semibold text-lg">Total Deductions</span>
            </div>
            <span className="text-2xl font-bold text-destructive">₹ {formatCurrency(totalDeductions)}</span>
          </div>
        </div>
      </FormSection>

      {/* Net Pay */}
      <Card className="p-4 sm:p-6 backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-primary rounded-full">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Net Stipend Payable</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">₹ {formatCurrency(netStipend)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Bank & Payment Information */}
      <FormSection icon={CreditCard} title="Bank & Payment Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Bank Name"
            value={data.bankName}
            onChange={(v) => updateField("bankName", v)}
            placeholder="e.g., HDFC Bank"
          />
          <FormField
            label="Account Number"
            value={data.accountNumber}
            onChange={(v) => updateField("accountNumber", v)}
            placeholder="Enter account number"
          />
        </div>
        <FormField
          label="Transaction ID / Reference Number"
          value={data.transactionId}
          onChange={(v) => updateField("transactionId", v)}
          placeholder="e.g., TXN123456789"
          description="Bank transaction reference or payment ID"
        />
      </FormSection>
    </div>
  );
};

export default InternPayslipForm;
