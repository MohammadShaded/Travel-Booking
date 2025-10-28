# 🌍 Travel and Accommodation Booking Platform

A full-featured **web application** for booking hotels and accommodations — built using **React + TypeScript**.  
This project is developed as a **final capstone project** for the Front-End Developer Training at **Foothill Technology Soulutions**.

## What this is

The platform allows users to:

- Search for hotels by city, date, and number of guests.
- View featured deals and trending destinations.
- Check room availability and make bookings.
- Complete a secure checkout and view confirmation details.
- (Admin only) Manage cities, hotels, and rooms via a dedicated admin dashboard.

## 🚀 Tech Stack

| Area               | Technology                                |
| ------------------ | ----------------------------------------- |
| Frontend Framework | **React (Vite + TypeScript)**             |
| Routing            | **React Router DOM**                      |
| Forms & Validation | **Formik + Yup**                          |
| Styling            | **CSS Modules / Tailwind CSS (optional)** |
| HTTP Requests      | **Axios**                                 |
| State Management   | **Context API / Zustand**                 |
| Testing            | **Jest + React Testing Library**          |
| Documentation      | **Storybook** _(bonus)_                   |
| Code Quality       | **ESLint + Prettier**                     |
| Version Control    | **Git + GitHub**                          |

---

## Quick start


1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Preview the production build

```powershell
npm run preview
```

5. Lint the codebase

```powershell
npm run lint
```

These scripts are provided in `package.json`.

## Project structure (important files)

- `index.html` — app entry HTML
- `src/main.tsx` — app bootstrap
- `src/App.tsx` — root React component
- `src/pages/` — page components
- `src/api/axiosClient.ts` — axios instance for API calls
