# 🦷 Dental Education System

A web-based platform designed to help dental students track, manage, and review patient procedures. Built with **Next.js**, this system focuses on clean UI, authentication, and easy access to patient information.

🌐 [Live Demo](https://dentist-app-lovat.vercel.app/)

## 📌 Features

- 👩‍⚕️ **User Authentication**: Sign up, login, and logout functionality using session-based auth.
- 🗃️ **Patient Records**: Add and view patient data, including procedures and notes.
- 🔒 **Protected Pages**: Only logged-in users can access patient and profile pages.
- 🍪 **Session Handling with Cookies**: Secure session management with `httpOnly` cookies.
- 🧼 **Clean Design**: Built with Tailwind CSS for a modern and responsive layout.

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: MySQL (via a custom API and query utility)
- **Styling**: Tailwind CSS
- **Authentication**: Custom auth using sessions + cookies
- **Icons**: react-icons (e.g., `FaTooth`)
- **Client Cookie Access**: js-cookie

## 🏗️ Folder Structure

```
📁 pages
 ┣ 📂 api
 ┃ ┗ 📂 auth      → Login, signup, logout APIs
 ┣ 📜 index.tsx   → Home page
 ┣ 📜 login.tsx   → Login form
 ┣ 📜 signup.tsx  → Signup form
 ┣ 📜 profile.tsx → User profile (protected)
 ┣ 📜 patients.tsx→ View/Add patients (protected)

📁 lib
 ┣ 📜 auth.ts     → Logic for sign-in and sign-up
 ┣ 📜 session.ts  → Session create/delete/check logic
 ┣ 📜 db.ts       → MySQL DB helper

📁 components
 ┣ 📜 Navbar.tsx  → Top navigation bar
 ┗ 📜 Sidebar.tsx → (optional) Sidebar trigger
```

## ⚙️ Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/Amjad-Manafikhi/Dentist-App.git
cd Dentist-App
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file:

```env
DATABASE_URL=your_mysql_connection_url
NODE_ENV=development
```

4. **Run the development server:**

```bash
npm run dev
```

The app should be running at `http://localhost:3000`.

## 🔐 Auth & Cookies

- Sessions are stored in encrypted cookies.
- Login sets an `httpOnly` cookie for the session and a visible `loggedIn` cookie (used for UI state).
- Logout deletes both cookies via API.

## ✅ TODO / Future Improvements

- Add user roles (e.g., student vs supervisor)
- Validation on patient input fields
- Password reset flow
- Admin dashboard for analytics

## 👤 Author

**Amjad Manafikhi**  
Aspiring software engineer & full-stack web developer  
GitHub: [@Amjad-Manafikhi](https://github.com/Amjad-Manafikhi)
