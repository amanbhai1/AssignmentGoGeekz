# Immigration Client Portal

A comprehensive client-facing portal for the immigration industry built with React.js and Node.js/Express.js.

## 🚀 Features

### ✅ Core Requirements (All Implemented)

1. **Client Dashboard** - Logged-in clients can view their immigration file details
2. **CRS Score Management** - Manual entry and display of CRS scores
3. **Document Upload** - Upload documents per immigration file
4. **Application Categories** - View and select immigration categories (Express Entry, Study Permit, etc.)
5. **Checklist Management** - Interactive checklist with checkboxes to track document readiness

### ✅ Bonus Features (All Implemented)

1. **Tailwind CSS** - Modern, responsive UI design
2. **Login Persistence** - localStorage/session management for authentication
3. **Mobile-Responsive Design** - Fully responsive across all devices
4. **Enhanced UI/UX** - Modern design with animations and transitions

### 🎯 Additional Features

- **OTP Email Verification** - Secure registration and login process
- **Real-time Progress Tracking** - Visual progress indicators
- **File Management** - Complete CRUD operations for immigration files
- **Role-based Access Control** - Client, consultant, and admin roles
- **Document Management** - Upload, view, and delete documents
- **Interactive Forms** - Dynamic forms with validation

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
AssignmentGoGeekz/
├── Frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layers
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── config/          # Configuration files
│   ├── uploads/             # File upload directory
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AssignmentGoGeekz
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# MONGODB_URI=mongodb://localhost:27017/immigration_portal
# JWT_SECRET=your_jwt_secret_here
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_app_password
# PORT=5000

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install

# Create .env file (optional)
# VITE_API_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔐 Authentication

### Registration Process
1. User enters name, email, and password
2. System sends OTP to email
3. User verifies OTP to complete registration
4. User can then login with credentials

### Login Process
1. User enters email and password
2. System validates credentials
3. JWT token stored in localStorage
4. User redirected to dashboard

### Test Credentials
You can register a new account or use the registration flow to create test credentials.

## 📱 Pages & Features

### 1. Dashboard (`/dashboard`)
- **Overview**: Complete immigration file statistics
- **Quick Actions**: Navigate to different sections
- **Progress Tracking**: Visual progress indicators
- **Recent Activity**: Latest updates and actions

### 2. Immigration File (`/immigration-file`)
- **Personal Information**: Basic details and contact info
- **Education & Work**: Educational background and work experience
- **Language Proficiency**: English and French language scores
- **File Management**: Create, view, and update immigration files

### 3. CRS Score (`/crs-score`)
- **Score Calculation**: Manual entry of CRS score
- **Score History**: Track score changes over time
- **Detailed Breakdown**: Component-wise score analysis

### 4. Application Categories (`/application-category`)
- **Category Selection**: Choose immigration program
- **Detailed Information**: Requirements and eligibility
- **Status Tracking**: Current selection status
- **Program Comparison**: Compare different programs

### 5. Checklist (`/checklist`)
- **Task Management**: Add, edit, delete checklist items
- **Progress Tracking**: Visual completion progress
- **Due Dates**: Set and track deadlines
- **Notes**: Add detailed notes for each item

### 6. Document Upload (`/document-upload`)
- **File Upload**: Upload documents with descriptions
- **File Management**: View and delete uploaded files
- **File Types**: Support for various document formats
- **Progress Tracking**: Upload progress indicators

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/send-otp` - Send OTP
- `POST /api/users/verify-otp` - Verify OTP

### Immigration Files
- `GET /api/immigration-files` - Get all files
- `POST /api/immigration-files` - Create new file
- `GET /api/immigration-files/:id` - Get specific file
- `PUT /api/immigration-files/:id` - Update file
- `DELETE /api/immigration-files/:id` - Delete file

### Checklist
- `GET /api/immigration-files/checklist` - Get checklist items
- `POST /api/immigration-files/:id/checklist` - Add checklist item
- `PUT /api/immigration-files/:id/checklist/:itemId` - Update item
- `DELETE /api/immigration-files/:id/checklist/:itemId` - Delete item

### Application Categories
- `GET /api/immigration-files/categories` - Get available categories
- `PUT /api/immigration-files/category` - Update selected category

### Documents
- `POST /api/immigration-files/:id/documents` - Upload document
- `DELETE /api/immigration-files/:id/documents/:docId` - Delete document

### CRS Score
- `PUT /api/immigration-files/:id/crs-score` - Update CRS score

## 🎨 UI/UX Features

### Design System
- **Modern Design**: Clean, professional interface
- **Consistent Styling**: Unified design language
- **Accessibility**: WCAG compliant components
- **Dark Mode Ready**: Theme support built-in

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop Enhanced**: Rich desktop features
- **Cross-browser**: Works on all modern browsers

### Interactive Elements
- **Smooth Animations**: Framer Motion animations
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Real-time feedback
- **Progress Indicators**: Visual progress tracking

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt password protection
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin request handling
- **File Upload Security**: Secure file handling

## 📊 Database Schema

### User Model
- Personal information
- Authentication credentials
- Role-based permissions
- Email verification status

### Immigration File Model
- Complete client profile
- Document attachments
- Checklist items
- CRS score tracking
- Application status

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd Frontend
npm run build
# Deploy dist/ folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd backend
# Set environment variables
# Deploy to your preferred platform
```

### Environment Variables
```env
# Backend
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
PORT=5000

# Frontend
VITE_API_URL=your_backend_url
```

## 🧪 Testing

### Frontend Testing
```bash
cd Frontend
npm run test
```

### Backend Testing
```bash
cd backend
npm test
```

## 📈 Performance

- **Fast Loading**: Optimized bundle sizes
- **Lazy Loading**: Component-based code splitting
- **Caching**: Efficient API response caching
- **Optimized Images**: Compressed and optimized assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Aman Gupta**
- Email: [amangupta121@gmail.com]
- GitHub: [https://github.com/amanbhai1]

## 🎯 Test Assignment Completion

### ✅ All Requirements Met

1. **Dashboard with Immigration File Details** ✅
2. **CRS Score (Manual Entry)** ✅
3. **Document Upload per File** ✅
4. **Application Category Selection** ✅
5. **Checklist with Checkboxes** ✅
6. **React.js Frontend** ✅
7. **Node.js/Express.js Backend** ✅
8. **Tailwind CSS** ✅
9. **Login Persistence** ✅
10. **Mobile-Responsive Design** ✅

### 🚀 Additional Features Added

- OTP-based email verification
- Real-time progress tracking
- Advanced file management
- Role-based access control
- Modern UI/UX design
- Comprehensive API documentation
- Error handling and validation
- Security best practices

---

**Ready for Production** 🎉

This project is fully functional and ready for demonstration or production deployment.