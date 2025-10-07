# Pixel Payslip Studio

## Project info

Created by **Satya from Dream Team Services**

A professional payslip generator for both employees and interns with comprehensive features, auto-calculations, and export capabilities.

## Features

### 🎯 Dual Payslip Types
- **Employee Payslips** - Full-featured payslips with PF, ESI, and detailed deductions
- **Intern Payslips** - Comprehensive intern stipend slips with all compliance fields

### ✨ Key Features
- 📝 **Professional Forms** - Clean, organized input forms with validation
- 👁️ **Live Preview** - Real-time A4 format preview
- 🧮 **Auto-Calculations** - Automatic gross, deductions, and net pay calculation
- 📥 **Multi-Format Export** - Download as PNG or PDF
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- ⚡ **No Focus Loss** - Smooth typing experience without cursor jumps
- 🔄 **Collapsible Sections** - Clean UI with expandable optional sections

### 🎓 Intern Payslip Features
- General company information with address
- Complete intern details (ID, department, duration)
- Stipend breakdown (base, bonus, allowances)
- Optional deductions (TDS, adjustments)
- Payment details with multiple modes
- Bank information with privacy masking
- Declaration and HR contact
- Three view modes: Form Only, Split View, Preview Only

## Tech Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Export:** html2canvas + jsPDF
- **Routing:** React Router DOM

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Satyanarayana2417/pixel-payslip-studio.git

# Navigate to project directory
cd pixel-payslip-studio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:8080` (or next available port)

## Usage

### Creating Employee Payslips
1. Visit the homepage
2. Click "Create Employee Payslip"
3. Fill in company, employee, and salary details
4. View live preview in split-screen mode
5. Download as PNG or PDF

### Creating Intern Payslips
1. Visit the homepage
2. Click "Create Intern Payslip"
3. Fill in all required intern information
4. Enter stipend and allowance details
5. Optional: Add deductions and bank info
6. Switch between Form, Split, or Preview modes
7. Download as PNG or PDF

## Project Structure

```
pixel-payslip-studio/
├── src/
│   ├── components/
│   │   ├── PayslipForm.tsx              # Employee payslip form
│   │   ├── PayslipPreview.tsx           # Employee payslip preview
│   │   ├── InternPayslipForm.tsx        # Intern payslip form
│   │   ├── InternPayslipPreview.tsx     # Intern payslip preview
│   │   └── ui/                          # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx                    # Homepage
│   │   ├── InternPayslip.tsx            # Intern payslip page
│   │   └── NotFound.tsx                 # 404 page
│   ├── types/
│   │   └── payslip.ts                   # TypeScript interfaces
│   └── lib/
│       └── utils.ts                     # Utility functions
├── public/                              # Static assets
└── ...config files
```

## Development Notes

### Fixed Issues
- ✅ Removed all "lovable" references
- ✅ Fixed input cursor jumping issue
- ✅ Proper component structure to prevent re-renders
- ✅ Full TypeScript type safety

### Component Architecture
All form components are defined outside parent components to prevent:
- Component recreation on every render
- Loss of input focus
- Performance degradation

## How can I edit this code?

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Simply run `npm run build` to create a production build, then deploy the `dist` folder.
