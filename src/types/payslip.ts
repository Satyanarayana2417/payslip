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
