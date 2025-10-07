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
    <Card className="w-full bg-white shadow-2xl overflow-hidden border-0" id="payslip-preview" style={{ width: "794px", minHeight: "1123px" }}>
      <div className="p-10" style={{ fontFamily: "Arial, sans-serif", fontSize: "11px" }}>
        {/* Company Logo */}
        <div className="mb-3">
          <img 
            src="/dts-logo-white.jpg" 
            alt="Company Logo" 
            className="h-16 w-auto object-contain"
            style={{ filter: "invert(1)" }}
          />
        </div>

        {/* Header Bar */}
        <div className="flex justify-between items-center mb-4 px-3 py-2.5" style={{ backgroundColor: "#0B8A8F" }}>
          <div className="text-white font-bold text-xs">{data.companyName.toUpperCase()}</div>
          <div className="text-white font-bold text-xs">
            PAYSLIP FOR {data.month.toUpperCase()}-{data.year}
          </div>
        </div>

        {/* Employee Info Grid */}
        <div className="mb-4" style={{ border: "1px solid #0B8A8F" }}>
          <div className="grid grid-cols-4">
            {[
              { label: "Employee No.", value: data.employeeNo },
              { label: "Name", value: data.employeeName, colSpan: 3 },
              { label: "Bank", value: data.bankName },
              { label: "Bank A/c No.", value: data.bankAccount, colSpan: 3 },
              { label: "DOB", value: data.dob },
              { label: "LOP days", value: data.lopDays, colSpan: 3 },
              { label: "PF A/C NO.", value: data.pfAccount },
              { label: "STD days", value: data.stdDays, colSpan: 3 },
              { label: "PF UAN", value: data.pfUan },
              { label: "No. of Days Paid", value: data.daysPaid, colSpan: 3 },
              { label: "Department", value: data.department },
              { label: "Designation", value: data.designation, colSpan: 3 },
              { label: "Location", value: data.location },
              { label: "Previous Month LOP", value: data.prevLop, colSpan: 3 },
              { label: "ESI No.", value: data.esiNo, colSpan: 3 },
            ].map((field, idx) => (
              <div
                key={idx}
                className={`p-2.5 ${field.colSpan === 3 ? "col-span-3" : ""}`}
                style={{
                  borderRight: field.colSpan === 3 ? "none" : "1px solid #D9D9D9",
                  borderBottom: idx < 15 ? "1px solid #D9D9D9" : "none",
                  backgroundColor: idx % 2 === 0 ? "#F5F5F5" : "#FFFFFF"
                }}
              >
                <div className="font-bold mb-0.5" style={{ color: "#0B8A8F", fontSize: "10px" }}>
                  {field.label}
                </div>
                <div className="font-bold" style={{ color: "#000000", fontSize: "11px" }}>
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings & Deductions Table */}
        <div className="mb-2" style={{ border: "1px solid #0B8A8F" }}>
          {/* Table Header */}
          <div className="grid grid-cols-12 text-white font-bold" style={{ backgroundColor: "#0B8A8F" }}>
            <div className="col-span-5 p-2 text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.3)" }}>
              EARNINGS
            </div>
            <div className="col-span-2 p-2 text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.3)", fontSize: "10px", lineHeight: "1.2" }}>
              No.of<br />Units / Earned
            </div>
            <div className="col-span-3 p-2 text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.3)" }}>
              Deduction
            </div>
            <div className="col-span-2 p-2 text-center">Amount</div>
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
            <div key={idx} className="grid grid-cols-12" style={{ borderTop: "1px solid #D9D9D9" }}>
              <div className="col-span-5 p-2" style={{ borderRight: "1px solid #D9D9D9" }}>
                {row.earning}
              </div>
              <div className="col-span-2 p-2 text-right font-bold" style={{ borderRight: "1px solid #D9D9D9", fontVariantNumeric: "tabular-nums" }}>
                {formatAmount(row.earnValue)}
              </div>
              <div className="col-span-3 p-2" style={{ borderRight: "1px solid #D9D9D9" }}>
                {row.deduction}
              </div>
              <div className="col-span-2 p-2 text-right font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
                {row.deduction ? formatAmount(row.dedValue) : ""}
              </div>
            </div>
          ))}

          {/* Totals Row */}
          <div className="grid grid-cols-12 text-white font-bold" style={{ backgroundColor: "#0B8A8F", borderTop: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="col-span-5 p-2" style={{ borderRight: "1px solid rgba(255,255,255,0.3)" }}>
              GROSS EARNING
            </div>
            <div className="col-span-2 p-2 text-right" style={{ borderRight: "1px solid rgba(255,255,255,0.3)", fontVariantNumeric: "tabular-nums" }}>
              {formatAmount(grossEarning)}
            </div>
            <div className="col-span-3 p-2" style={{ borderRight: "1px solid rgba(255,255,255,0.3)" }}>
              GROSS DEDUCTION
            </div>
            <div className="col-span-2 p-2 text-right" style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatAmount(grossDeduction)}
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="text-center mb-3 py-2 text-white font-bold" style={{ backgroundColor: "#0B8A8F", fontSize: "14px" }}>
          Net Pay - {formatAmount(netPay)}
        </div>

        {/* Employer Contribution */}
        <div className="mb-8" style={{ border: "1px solid #0B8A8F" }}>
          <div className="text-white font-bold p-2 text-center" style={{ backgroundColor: "#0B8A8F" }}>
            Employer Contribution
          </div>
          <div className="grid grid-cols-12 p-2" style={{ borderTop: "1px solid #D9D9D9" }}>
            <div className="col-span-5">PF - Employer Contr.</div>
            <div className="col-span-2"></div>
            <div className="col-span-3">Earned</div>
            <div className="col-span-2 text-right font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatAmount(data.pfEmployer)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center italic" style={{ color: "#999999", fontSize: "9px", paddingTop: "20px" }}>
          ** This is a computer generated payslip and does not require signature and stamp.
        </div>
      </div>
    </Card>
  );
};

export default PayslipPreview;
