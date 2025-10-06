import { Card } from "@/components/ui/card";
import { PayslipData } from "@/types/payslip";

interface PayslipPreviewProps {
  data: PayslipData;
}

const PayslipPreview = ({ data }: PayslipPreviewProps) => {
  // Calculate totals
  const grossEarning = Object.values(data.earnings)
    .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    .toFixed(2);

  const grossDeduction = Object.values(data.deductions)
    .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    .toFixed(2);

  const netPay = (parseFloat(grossEarning) - parseFloat(grossDeduction)).toFixed(2);

  const formatAmount = (value: string) => {
    const num = parseFloat(value) || 0;
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card className="w-full aspect-[1/1.414] bg-white shadow-xl overflow-hidden" id="payslip-preview">
      <div className="h-full overflow-auto p-8 text-xs" style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-3xl font-bold text-charcoal">{data.companyName}</div>
          <div className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold">
            PAYSLIP FOR {data.month}-{data.year}
          </div>
        </div>

        <div className="h-1.5 bg-primary mb-6" />

        {/* Employee Info Grid */}
        <div className="grid grid-cols-4 gap-px bg-border mb-6 border border-border">
          {[
            { label: "Employee No.", value: data.employeeNo },
            { label: "Name", value: data.employeeName },
            { label: "Bank", value: data.bankName },
            { label: "Bank A/c No.", value: data.bankAccount },
            { label: "DOB", value: data.dob },
            { label: "LOP days", value: data.lopDays },
            { label: "PF A/C NO.", value: data.pfAccount },
            { label: "STD days", value: data.stdDays },
            { label: "PF UAN", value: data.pfUan },
            { label: "No. of Days Paid", value: data.daysPaid },
            { label: "Department", value: data.department, colSpan: 2 },
            { label: "Designation", value: data.designation, colSpan: 2 },
            { label: "Location", value: data.location },
            { label: "Previous Month LOP", value: data.prevLop },
            { label: "ESI No.", value: data.esiNo, colSpan: 2 },
          ].map((field, idx) => (
            <div
              key={idx}
              className={`bg-white p-2 ${field.colSpan === 2 ? "col-span-2" : ""}`}
            >
              <div className="text-primary font-semibold text-xs mb-1">{field.label}</div>
              <div className="font-bold text-charcoal">{field.value}</div>
            </div>
          ))}
        </div>

        {/* Earnings & Deductions Table */}
        <div className="border border-border mb-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-primary text-primary-foreground font-bold">
            <div className="col-span-6 p-2 border-r border-white/20">EARNINGS</div>
            <div className="col-span-3 p-2 border-r border-white/20 text-center">
              No.of
              <br />
              Units / Earned
            </div>
            <div className="col-span-3 p-2 text-center">Deduction / Amount</div>
          </div>

          {/* Table Rows */}
          {[
            { earning: "Basic", earnValue: data.earnings.basic, deduction: "PF Employee Cont.", dedValue: data.deductions.pfEmployee },
            { earning: "House Rent Allowance", earnValue: data.earnings.hra, deduction: "Professional Tax", dedValue: data.deductions.profTax },
            { earning: "Leave Travel Assistance", earnValue: data.earnings.lta, deduction: "Labour Welfare Fund", dedValue: data.deductions.labourWf },
            { earning: "Medical", earnValue: data.earnings.medical, deduction: "Insurance Deduction", dedValue: data.deductions.insurance },
            { earning: "Conveyance Allowance", earnValue: data.earnings.conveyance, deduction: "", dedValue: "" },
            { earning: "Meal Allowance", earnValue: data.earnings.mealAllowance, deduction: "", dedValue: "" },
            { earning: "Flexi Allowance", earnValue: data.earnings.flexiAllowance, deduction: "", dedValue: "" },
            { earning: "Monthly Joining Bonus", earnValue: data.earnings.joiningBonus, deduction: "", dedValue: "" },
            { earning: "Transportation Allowance", earnValue: data.earnings.transport, deduction: "", dedValue: "" },
          ].map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 border-t border-border text-charcoal">
              <div className="col-span-6 p-2 border-r border-border">{row.earning}</div>
              <div className="col-span-3 p-2 border-r border-border text-right font-bold font-mono">
                {formatAmount(row.earnValue)}
              </div>
              <div className="col-span-3 p-2">
                {row.deduction && (
                  <div className="flex justify-between">
                    <span>{row.deduction}</span>
                    <span className="font-bold font-mono">{formatAmount(row.dedValue)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Totals Row */}
          <div className="grid grid-cols-12 bg-primary text-primary-foreground font-bold border-t border-white/20">
            <div className="col-span-6 p-2 border-r border-white/20">GROSS EARNING</div>
            <div className="col-span-3 p-2 border-r border-white/20 text-right font-mono">
              {formatAmount(grossEarning)}
            </div>
            <div className="col-span-3 p-2 text-right font-mono">{formatAmount(grossDeduction)}</div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="text-center mb-4">
          <div className="inline-block bg-primary/10 px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold text-primary font-mono">
              Net Pay – {formatAmount(netPay)}
            </div>
          </div>
        </div>

        {/* Employer Contribution */}
        <div className="border border-border mb-6">
          <div className="bg-primary text-primary-foreground font-bold p-2">
            Employer Contribution
          </div>
          <div className="grid grid-cols-12 p-2 text-charcoal">
            <div className="col-span-6">PF - Employer Contr.</div>
            <div className="col-span-3"></div>
            <div className="col-span-3 text-right font-bold font-mono">
              {formatAmount(data.pfEmployer)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground italic text-xs">
          * This is a computer generated payslip and does not require signature and stamp.
        </div>
      </div>
    </Card>
  );
};

export default PayslipPreview;
