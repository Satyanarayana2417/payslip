import { InternPayslipData } from "@/types/payslip";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

interface InternPayslipPreviewProps {
  data: InternPayslipData;
}

const InternPayslipPreview = ({ data }: InternPayslipPreviewProps) => {
  // Calculate totals
  const totalGrossEarnings = useMemo(() => {
    const values = Object.values(data.earnings);
    return values.reduce((sum, val) => {
      const num = parseFloat(val) || 0;
      return sum + num;
    }, 0).toFixed(2);
  }, [data.earnings]);

  const totalDeductions = useMemo(() => {
    const values = Object.values(data.deductions);
    return values.reduce((sum, val) => {
      const num = parseFloat(val) || 0;
      return sum + num;
    }, 0).toFixed(2);
  }, [data.deductions]);

  const netStipend = useMemo(() => {
    const gross = parseFloat(totalGrossEarnings) || 0;
    const deduct = parseFloat(totalDeductions) || 0;
    return (gross - deduct).toFixed(2);
  }, [totalGrossEarnings, totalDeductions]);

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount) || 0;
    return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const TableRow = ({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) => (
    <div className={`grid grid-cols-2 gap-4 py-2 ${bold ? 'font-bold' : ''}`}>
      <div className="text-left">{label}</div>
      <div className="text-right">{value}</div>
    </div>
  );

  return (
    <div id="payslip-preview" className="w-[210mm] min-h-[297mm] bg-white p-12 shadow-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-primary pb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">{data.companyName || "Company Name"}</h1>
        <p className="text-sm text-gray-600 whitespace-pre-line">{data.companyAddress || "Company Address"}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">INTERN STIPEND SLIP</h2>
          <p className="text-sm text-gray-600 mt-1">
            For the month of {data.month || "Month"} {data.year || "Year"}
          </p>
          {data.payslipReferenceNo && (
            <p className="text-xs text-gray-500 mt-1">Ref No: {data.payslipReferenceNo}</p>
          )}
        </div>
      </div>

      {/* Intern Information */}
      <Card className="p-6 mb-6 bg-gray-50">
        <h3 className="font-bold text-lg mb-4 text-primary">Intern Information</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <span className="text-gray-600">Intern Name:</span>
            <span className="ml-2 font-semibold">{data.internName || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-600">Intern ID:</span>
            <span className="ml-2 font-semibold">{data.internId || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-600">Department:</span>
            <span className="ml-2 font-semibold">{data.department || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-600">Designation:</span>
            <span className="ml-2 font-semibold">{data.designation || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-600">Work Location:</span>
            <span className="ml-2 font-semibold">{data.workLocation || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-600">Joining Date:</span>
            <span className="ml-2 font-semibold">{data.joiningDate || "N/A"}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Internship Duration:</span>
            <span className="ml-2 font-semibold">
              {data.internshipStartDate || "N/A"} to {data.internshipEndDate || "N/A"}
            </span>
          </div>
        </div>
      </Card>

      {/* Earnings Section */}
      <div className="mb-6">
        <div className="bg-primary text-white p-3 rounded-t-lg">
          <h3 className="font-bold text-lg">Earnings</h3>
        </div>
        <div className="border border-t-0 rounded-b-lg p-4">
          {parseFloat(data.earnings.baseStipend) > 0 && (
            <TableRow label="Base Stipend" value={formatCurrency(data.earnings.baseStipend)} />
          )}
          {parseFloat(data.earnings.performanceBonus) > 0 && (
            <TableRow label="Performance Bonus" value={formatCurrency(data.earnings.performanceBonus)} />
          )}
          {parseFloat(data.earnings.travelAllowance) > 0 && (
            <TableRow label="Travel Allowance" value={formatCurrency(data.earnings.travelAllowance)} />
          )}
          {parseFloat(data.earnings.mealAllowance) > 0 && (
            <TableRow label="Meal Allowance" value={formatCurrency(data.earnings.mealAllowance)} />
          )}
          {parseFloat(data.earnings.internetAllowance) > 0 && (
            <TableRow label="Internet Allowance" value={formatCurrency(data.earnings.internetAllowance)} />
          )}
          {parseFloat(data.earnings.otherAllowance) > 0 && (
            <TableRow label="Other Allowance" value={formatCurrency(data.earnings.otherAllowance)} />
          )}
          <Separator className="my-2" />
          <TableRow 
            label="Total Gross Earnings" 
            value={formatCurrency(totalGrossEarnings)} 
            bold 
          />
        </div>
      </div>

      {/* Deductions Section */}
      {parseFloat(totalDeductions) > 0 && (
        <div className="mb-6">
          <div className="bg-red-600 text-white p-3 rounded-t-lg">
            <h3 className="font-bold text-lg">Deductions</h3>
          </div>
          <div className="border border-t-0 rounded-b-lg p-4">
            {parseFloat(data.deductions.tds) > 0 && (
              <TableRow label="TDS" value={formatCurrency(data.deductions.tds)} />
            )}
            {parseFloat(data.deductions.otherDeductions) > 0 && (
              <TableRow label="Other Deductions" value={formatCurrency(data.deductions.otherDeductions)} />
            )}
            <Separator className="my-2" />
            <TableRow 
              label="Total Deductions" 
              value={formatCurrency(totalDeductions)} 
              bold 
            />
          </div>
        </div>
      )}

      {/* Net Stipend */}
      <div className="mb-6 bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">NET STIPEND PAYABLE</h3>
          <p className="text-3xl font-bold">{formatCurrency(netStipend)}</p>
        </div>
      </div>

      {/* Payment Details */}
      <Card className="p-6 mb-6 bg-gray-50">
        <h3 className="font-bold text-lg mb-4 text-primary">Payment Details</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <span className="text-gray-600">Payment Mode:</span>
            <span className="ml-2 font-semibold">{data.paymentMode || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-600">Payment Date:</span>
            <span className="ml-2 font-semibold">{data.paymentDate || "N/A"}</span>
          </div>
          {data.bankName && (
            <div>
              <span className="text-gray-600">Bank Name:</span>
              <span className="ml-2 font-semibold">{data.bankName}</span>
            </div>
          )}
          {data.accountNumber && (
            <div>
              <span className="text-gray-600">Account Number:</span>
              <span className="ml-2 font-semibold">
                ****{data.accountNumber.slice(-4)}
              </span>
            </div>
          )}
          {data.upiId && (
            <div className="col-span-2">
              <span className="text-gray-600">UPI ID:</span>
              <span className="ml-2 font-semibold">{data.upiId}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Remarks */}
      {data.remarks && (
        <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500">
          <h4 className="font-semibold text-sm mb-2">Remarks:</h4>
          <p className="text-sm text-gray-700 whitespace-pre-line">{data.remarks}</p>
        </div>
      )}

      {/* Footer */}
      <Separator className="my-6" />
      <div className="text-center text-xs text-gray-500 space-y-2">
        <p className="font-semibold">This is a computer-generated payslip and does not require a signature.</p>
        {data.hrContact && (
          <p>For any queries, please contact: <span className="text-primary font-semibold">{data.hrContact}</span></p>
        )}
        <p className="mt-4 text-gray-400">Generated by Payslip Studio - Created by Satya from Dream Team Services</p>
      </div>
    </div>
  );
};

export default InternPayslipPreview;
