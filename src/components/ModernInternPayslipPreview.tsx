import { InternPayslipData } from "@/types/payslip";
import { useMemo } from "react";

interface ModernInternPayslipPreviewProps {
  data: InternPayslipData;
}

const ModernInternPayslipPreview = ({ data }: ModernInternPayslipPreviewProps) => {
  // Calculate totals
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

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    const value = num || 0;
    // Round to 2 decimal places to avoid floating point issues
    const rounded = Math.round(value * 100) / 100;
    return rounded.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div 
      id="payslip-preview" 
      style={{
        width: '210mm',
        minHeight: '148.5mm',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Arial, Helvetica, sans-serif',
        margin: '0 auto',
        padding: '0 15mm',
        boxSizing: 'border-box',
        fontSize: '11px',
      }}
    >
      {/* Logo Header */}
      <div style={{ 
        padding: '10px 15px',
        borderBottom: '1px solid #000'
      }}>
        <img 
          src="/dts-logo.jpg" 
          alt="Dream Team Services" 
          style={{
            height: '50px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Header Bar with Company Name and Payslip Month */}
      <div style={{
        backgroundColor: '#00A0A0',
        border: '1px solid #008B8B',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        padding: '8px 15px',
        alignItems: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '11px'
      }}>
        <div>{data.companyName || "COMPANY NAME"}</div>
        <div>PAYSLIP FOR {(data.month || "MONTH").toUpperCase()} - {data.year || "YYYY"}</div>
      </div>

      {/* Employee/Intern Details Grid */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        fontSize: '11px'
      }}>
        <tbody>
          {/* Row 1 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold',
              width: '15%'
            }}>
              Intern No.
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              width: '18%'
            }}>
              {data.internId || "-"}
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold',
              width: '15%'
            }}>
              Name
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              width: '52%'
            }}>
              {data.internName || "-"}
            </td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              Bank
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.bankName || "-"}
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              Bank A/c No.
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.accountNumber || "-"}
            </td>
          </tr>

          {/* Row 3 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              DOJ
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.joiningDate || "-"}
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              LOP days
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              0
            </td>
          </tr>

          {/* Row 4 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              PF A/C NO.
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              -
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              STD days
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.daysWorked || "30"}
            </td>
          </tr>

          {/* Row 5 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              PF UAN
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              -
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              No of Days Paid
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.daysPaid || "30"}
            </td>
          </tr>

          {/* Row 6 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              Transaction ID
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.transactionId || "-"}
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              Department
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.department || "-"}
            </td>
          </tr>

          {/* Row 7 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              Location
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.workLocation || "-"}
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              Designation
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              {data.designation || "-"}
            </td>
          </tr>

          {/* Row 8 */}
          <tr>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              ESI No.
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              -
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px',
              color: '#000',
              fontWeight: 'bold'
            }}>
              Previous Month LOP
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '3px 10px'
            }}>
              0
            </td>
          </tr>
        </tbody>
      </table>

      {/* Earnings and Deductions Table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginTop: '10px',
        fontSize: '11px'
      }}>
        <tbody>
          {/* Header Row */}
          <tr>
            <td colSpan={2} style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              EARNINGS
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '12%'
            }}>
              No.of Units
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '15%'
            }}>
              Earned
            </td>
            <td colSpan={2} style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Deduction
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '15%'
            }}>
              Amount
            </td>
          </tr>

          {/* Earnings Row 1 */}
          <tr>
            <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
              Basic Stipend
            </td>
            <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
              
            </td>
            <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
              {formatCurrency(data.earnings.baseStipend)}
            </td>
            <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
              {parseFloat(data.deductions.tds) > 0 ? "TDS" : ""}
            </td>
            <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
              {parseFloat(data.deductions.tds) > 0 ? formatCurrency(data.deductions.tds) : ""}
            </td>
          </tr>

          {/* Additional Earnings Rows */}
          {parseFloat(data.earnings.performanceBonus) > 0 && (
            <tr>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
                Performance Bonus
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                {formatCurrency(data.earnings.performanceBonus)}
              </td>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
                {parseFloat(data.deductions.otherDeductions) > 0 ? "Other Deductions" : ""}
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                {parseFloat(data.deductions.otherDeductions) > 0 ? formatCurrency(data.deductions.otherDeductions) : ""}
              </td>
            </tr>
          )}

          {parseFloat(data.earnings.travelAllowance) > 0 && (
            <tr>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
                Travel Allowance
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                {formatCurrency(data.earnings.travelAllowance)}
              </td>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
              </td>
            </tr>
          )}

          {parseFloat(data.earnings.mealAllowance) > 0 && (
            <tr>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
                Meal Allowance
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                {formatCurrency(data.earnings.mealAllowance)}
              </td>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
              </td>
            </tr>
          )}

          {parseFloat(data.earnings.internetAllowance) > 0 && (
            <tr>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
                Internet Allowance
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                {formatCurrency(data.earnings.internetAllowance)}
              </td>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
              </td>
            </tr>
          )}

          {parseFloat(data.earnings.otherAllowance) > 0 && (
            <tr>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
                Other Allowance
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
                {formatCurrency(data.earnings.otherAllowance)}
              </td>
              <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '5px 10px' }}>
              </td>
              <td style={{ border: '1px solid #008B8B', padding: '5px 10px', textAlign: 'right' }}>
              </td>
            </tr>
          )}

          {/* Totals Row */}
          <tr>
            <td colSpan={2} style={{ 
              border: '1px solid #008B8B', 
              padding: '6px 10px',
              fontWeight: 'bold'
            }}>
              GROSS EARNING
            </td>
            <td style={{ border: '1px solid #008B8B', padding: '6px 10px', textAlign: 'right' }}>
              
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '6px 10px', 
              textAlign: 'right',
              fontWeight: 'bold'
            }}>
              {formatCurrency(totalGrossEarnings)}
            </td>
            <td colSpan={2} style={{ 
              border: '1px solid #008B8B', 
              padding: '6px 10px',
              fontWeight: 'bold'
            }}>
              GROSS DEDUCTION
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '6px 10px', 
              textAlign: 'right',
              fontWeight: 'bold'
            }}>
              {formatCurrency(totalDeductions)}
            </td>
          </tr>

          {/* Net Pay Row */}
          <tr>
            <td colSpan={7} style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              Net Pay = {formatCurrency(netStipend)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Employer Contribution (Optional - can be hidden for interns) */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginTop: '10px',
        fontSize: '11px'
      }}>
        <tbody>
          <tr>
            <td colSpan={2} style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '50%'
            }}>
              Employer Contribution
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '20%'
            }}>
              No.of Units
            </td>
            <td style={{ 
              border: '1px solid #008B8B', 
              padding: '8px 10px',
              backgroundColor: '#00A0A0',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '30%'
            }}>
              Earned
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ border: '1px solid #008B8B', padding: '6px 10px' }}>
              -
            </td>
            <td style={{ border: '1px solid #008B8B', padding: '6px 10px', textAlign: 'right' }}>
              
            </td>
            <td style={{ border: '1px solid #008B8B', padding: '6px 10px', textAlign: 'right' }}>
              
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div style={{
        marginTop: '20px',
        padding: '10px 15px',
        textAlign: 'center',
        fontSize: '10px',
        color: '#666',
        fontStyle: 'italic'
      }}>
        ** This is a computer generated payslip and does not require signature and stamp.
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          #payslip-preview {
            width: 210mm !important;
            min-height: 148.5mm !important;
          }
        }
        #payslip-preview td {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};

export default ModernInternPayslipPreview;
