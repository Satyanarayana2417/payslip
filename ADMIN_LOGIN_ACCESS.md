# How to Access the Admin Login Page

## 🎯 Quick Access

Your admin login page is accessible in **TWO WAYS**:

### Method 1: React Route (Recommended for App Integration)
Once Firebase is installed, access through the React app:
```
http://localhost:8080/admin-login
```

### Method 2: Standalone HTML (Currently Working)
Access the pure HTML version directly:
```
http://localhost:8080/admin-login.html
```

## 📦 Installation Required

To use the React version (Method 1), you need to install Firebase:

```powershell
# Stop the dev server (Ctrl+C in terminal)
cd "c:\Users\Latitude\OneDrive\Attachments\Desktop\payslip\pixel-payslip-studio"
npm install firebase
npm run dev
```

## 🔗 All Available Routes

After installing Firebase, these routes will be available:

| Route | Description |
|-------|-------------|
| `http://localhost:8080/` | Main Payslip Generator |
| `http://localhost:8080/intern-payslip` | Intern Payslip Generator |
| `http://localhost:8080/admin-login` | Admin Login (React) |
| `http://localhost:8080/admin-dashboard` | Admin Dashboard (Protected) |
| `http://localhost:8080/admin-login.html` | Admin Login (Standalone HTML) |
| `http://localhost:8080/home.html` | Admin Home (Standalone HTML) |

## 🎨 Features Comparison

### React Version (`/admin-login`)
✅ Integrated with your React app
✅ Uses shadcn/ui components
✅ Consistent styling with your app
✅ TypeScript support
✅ Better navigation integration
✅ Uses your existing UI library

### HTML Version (`/admin-login.html`)
✅ Works immediately (no dependencies)
✅ Standalone page
✅ Pure HTML/CSS/JS
✅ Custom Amazon-inspired design
✅ Can be deployed separately

## 🚀 Quick Start

**Right Now (Without Firebase):**
1. Open: `http://localhost:8080/admin-login.html`
2. Create an account or login
3. You'll be redirected to `home.html`

**After Installing Firebase:**
1. Stop dev server (Ctrl+C)
2. Run: `npm install firebase`
3. Run: `npm run dev`
4. Open: `http://localhost:8080/admin-login`
5. Use the React-integrated version

## 🔧 Troubleshooting

### "Cannot find module 'firebase/app'"
**Solution:** Install Firebase:
```powershell
npm install firebase
```

### "Login page not showing"
**Solutions:**
1. ✅ Use `http://localhost:8080/admin-login.html` (works now)
2. ⏳ Install Firebase, then use `http://localhost:8080/admin-login`

### Dev server not running
**Solution:**
```powershell
cd "c:\Users\Latitude\OneDrive\Attachments\Desktop\payslip\pixel-payslip-studio"
npm run dev
```

## 📝 Note

Both versions use the **same Firebase backend**, so accounts created in one version will work in the other!

---

**Current Status:** 
- ✅ HTML version is ready at `/admin-login.html`
- ⏳ React version needs `npm install firebase` to work at `/admin-login`
