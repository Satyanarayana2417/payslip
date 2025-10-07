export interface PayslipData {
  companyName: string;
  month: string;
  year: string;
  employeeNo: string;
  employeeName: string;
  bankName: string;
  bankAccount: string;
  dob: string;
  lopDays: string;
  pfAccount: string;
  stdDays: string;
  pfUan: string;
  daysPaid: string;
  department: string;
  designation: string;
  location: string;
  prevLop: string;
  esiNo: string;
  earnings: {
    basic: string;
    hra: string;
    lta: string;
    medical: string;
    conveyance: string;
    mealAllowance: string;
    flexiAllowance: string;
    joiningBonus: string;
    transport: string;
  };
  deductions: {
    pfEmployee: string;
    profTax: string;
    labourWf: string;
    insurance: string;
  };
  pfEmployer: string;
}

export interface InternPayslipData {
  // General Information
  companyName: string;
  companyAddress: string;
  month: string;
  year: string;
  payslipReferenceNo: string;
  
  // Intern Information
  internName: string;
  internId: string;
  department: string;
  designation: string;
  joiningDate: string;
  internshipStartDate: string;
  internshipEndDate: string;
  workLocation: string; // Office / Remote / Hybrid
  daysWorked: string;
  daysPaid: string;
  
  // Stipend & Earnings
  earnings: {
    baseStipend: string;
    performanceBonus: string;
    travelAllowance: string;
    mealAllowance: string;
    internetAllowance: string;
    otherAllowance: string;
  };
  
  // Deductions
  deductions: {
    tds: string;
    otherDeductions: string;
  };
  
  // Bank Information
  bankName: string;
  accountNumber: string;
  upiId: string;
  paymentMode: string; // Bank Transfer / UPI / Cash
  paymentDate: string;
  transactionId: string;
  
  // Declaration / Notes
  remarks: string;
  hrContact: string;
}
