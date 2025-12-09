# Full Stack Landing Page + Admin Panel

## Stack

- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Image upload and cropping: Multer + Sharp
- Admin authentication: Simple email/password + JWT

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret and admin credentials
npm run dev
```

Backend will run on http://localhost:5000

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
# Edit VITE_API_URL if your backend is on a different URL
npm run dev
```

Frontend will run on http://localhost:5173

### Default Admin Credentials

Configure in `server/.env`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_jwt_secret_here
```

Use these credentials on the **Admin** tab to log in and manage:

- Projects (with image uploads and cropping to 450x350)
- Clients (with image uploads and cropping)
- Contact form responses
- Newsletter subscribers
