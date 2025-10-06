import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PayslipData } from "@/types/payslip";
import { Building2, User, Wallet, Calendar } from "lucide-react";

interface PayslipFormProps {
  data: PayslipData;
  onChange: (data: PayslipData) => void;
}

const PayslipForm = ({ data, onChange }: PayslipFormProps) => {
  const updateField = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const updateEarnings = (field: string, value: string) => {
    onChange({
      ...data,
      earnings: { ...data.earnings, [field]: value },
    });
  };

  const updateDeductions = (field: string, value: string) => {
    onChange({
      ...data,
      deductions: { ...data.deductions, [field]: value },
    });
  };

  const FormSection = ({ icon: Icon, title, children }: any) => (
    <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/10 hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  );

  const FormField = ({ label, value, onChange, placeholder }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <FormSection icon={Building2} title="Company Information">
        <FormField
          label="Company Name"
          value={data.companyName}
          onChange={(v: string) => updateField("companyName", v)}
          placeholder="Enter company name"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Month"
            value={data.month}
            onChange={(v: string) => updateField("month", v)}
            placeholder="e.g., NOV"
          />
          <FormField
            label="Year"
            value={data.year}
            onChange={(v: string) => updateField("year", v)}
            placeholder="e.g., 2023"
          />
        </div>
      </FormSection>

      <FormSection icon={User} title="Employee Information">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Employee No."
            value={data.employeeNo}
            onChange={(v: string) => updateField("employeeNo", v)}
            placeholder="Employee number"
          />
          <FormField
            label="Employee Name"
            value={data.employeeName}
            onChange={(v: string) => updateField("employeeName", v)}
            placeholder="Full name"
          />
        </div>
        <FormField
          label="Department"
          value={data.department}
          onChange={(v: string) => updateField("department", v)}
          placeholder="Department name"
        />
        <FormField
          label="Designation"
          value={data.designation}
          onChange={(v: string) => updateField("designation", v)}
          placeholder="Job title"
        />
        <FormField
          label="Location"
          value={data.location}
          onChange={(v: string) => updateField("location", v)}
          placeholder="Work location"
        />
      </FormSection>

      <FormSection icon={Calendar} title="Attendance & Details">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Date of Birth"
            value={data.dob}
            onChange={(v: string) => updateField("dob", v)}
            placeholder="DD MMM YYYY"
          />
          <FormField
            label="LOP Days"
            value={data.lopDays}
            onChange={(v: string) => updateField("lopDays", v)}
            placeholder="0"
          />
          <FormField
            label="STD Days"
            value={data.stdDays}
            onChange={(v: string) => updateField("stdDays", v)}
            placeholder="31"
          />
          <FormField
            label="Days Paid"
            value={data.daysPaid}
            onChange={(v: string) => updateField("daysPaid", v)}
            placeholder="31"
          />
        </div>
      </FormSection>

      <FormSection icon={Wallet} title="Bank & Statutory Details">
        <FormField
          label="Bank Name"
          value={data.bankName}
          onChange={(v: string) => updateField("bankName", v)}
          placeholder="Bank name"
        />
        <FormField
          label="Bank Account No."
          value={data.bankAccount}
          onChange={(v: string) => updateField("bankAccount", v)}
          placeholder="Account number"
        />
        <FormField
          label="PF Account No."
          value={data.pfAccount}
          onChange={(v: string) => updateField("pfAccount", v)}
          placeholder="PF account"
        />
        <FormField
          label="PF UAN"
          value={data.pfUan}
          onChange={(v: string) => updateField("pfUan", v)}
          placeholder="UAN number"
        />
        <FormField
          label="ESI No."
          value={data.esiNo}
          onChange={(v: string) => updateField("esiNo", v)}
          placeholder="ESI number"
        />
      </FormSection>

      <FormSection icon={Wallet} title="Earnings">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Basic"
            value={data.earnings.basic}
            onChange={(v: string) => updateEarnings("basic", v)}
            placeholder="0.00"
          />
          <FormField
            label="House Rent Allowance"
            value={data.earnings.hra}
            onChange={(v: string) => updateEarnings("hra", v)}
            placeholder="0.00"
          />
          <FormField
            label="Leave Travel Assistance"
            value={data.earnings.lta}
            onChange={(v: string) => updateEarnings("lta", v)}
            placeholder="0.00"
          />
          <FormField
            label="Medical"
            value={data.earnings.medical}
            onChange={(v: string) => updateEarnings("medical", v)}
            placeholder="0.00"
          />
          <FormField
            label="Conveyance Allowance"
            value={data.earnings.conveyance}
            onChange={(v: string) => updateEarnings("conveyance", v)}
            placeholder="0.00"
          />
          <FormField
            label="Meal Allowance"
            value={data.earnings.mealAllowance}
            onChange={(v: string) => updateEarnings("mealAllowance", v)}
            placeholder="0.00"
          />
          <FormField
            label="Flexi Allowance"
            value={data.earnings.flexiAllowance}
            onChange={(v: string) => updateEarnings("flexiAllowance", v)}
            placeholder="0.00"
          />
          <FormField
            label="Monthly Joining Bonus"
            value={data.earnings.joiningBonus}
            onChange={(v: string) => updateEarnings("joiningBonus", v)}
            placeholder="0.00"
          />
          <FormField
            label="Transportation Allowance"
            value={data.earnings.transport}
            onChange={(v: string) => updateEarnings("transport", v)}
            placeholder="0.00"
          />
        </div>
      </FormSection>

      <FormSection icon={Wallet} title="Deductions">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="PF Employee Contribution"
            value={data.deductions.pfEmployee}
            onChange={(v: string) => updateDeductions("pfEmployee", v)}
            placeholder="0.00"
          />
          <FormField
            label="Professional Tax"
            value={data.deductions.profTax}
            onChange={(v: string) => updateDeductions("profTax", v)}
            placeholder="0.00"
          />
          <FormField
            label="Labour Welfare Fund"
            value={data.deductions.labourWf}
            onChange={(v: string) => updateDeductions("labourWf", v)}
            placeholder="0.00"
          />
          <FormField
            label="Insurance Deduction"
            value={data.deductions.insurance}
            onChange={(v: string) => updateDeductions("insurance", v)}
            placeholder="0.00"
          />
        </div>
        <FormField
          label="PF Employer Contribution"
          value={data.pfEmployer}
          onChange={(v: string) => updateField("pfEmployer", v)}
          placeholder="0.00"
        />
      </FormSection>
    </div>
  );
};

export default PayslipForm;
