# 🎬 MovieApp

A full-featured movie search and watchlist management app built with **Next.js** and **React**. Search millions of movies, view detailed information, and manage your personal watchlist with full CRUD functionality.

<img width="1863" height="829" alt="Screenshot (61)" src="https://github.com/user-attachments/assets/56a5bb4c-85e5-4e6d-8203-d3927e99a985" />


---

## ✨ Features

- 🔍 **Movie Search** — Search millions of movies using the OMDB API with debounced input
- 🎥 **Movie Details** — View full plot, cast, director, runtime, and IMDb rating
- ❤️ **Watchlist** — Save movies and manage them across sessions using localStorage
- ➕ **Create** — Add custom movies manually to your watchlist
- ✏️ **Edit** — Update any movie details directly from the watchlist
- 🗑️ **Delete** — Remove movies with a confirmation prompt
- 📊 **Stats** — See total saved, custom added, and average rating at a glance
- ⚡ **Debounced Search** — Search fires automatically 500ms after you stop typing

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework & routing |
| React 18 | UI & component logic |
| Custom Hooks | Separated state management |
| OMDB API | Movie data source |
| localStorage | Persistent watchlist storage |
| CSS-in-JS | Component-level styling |

---

## 📁 Project Structure

```
movie-app/
├── app/
│   ├── layout.js              # Root layout
│   ├── page.js                # Home page (search)
│   └── watchlist/
│       └── page.js            # Watchlist CRUD page
├── components/
│   ├── Navbar.jsx             # Navigation with watchlist count
│   ├── SearchBar.jsx          # Debounced search input
│   ├── MovieCard.jsx          # Movie card with watchlist toggle
│   ├── MovieGrid.jsx          # Responsive movie grid
│   ├── MovieModal.jsx         # Full movie detail modal
│   ├── MovieTable.jsx         # CRUD table for watchlist
│   └── MovieFormModal.jsx     # Add / Edit movie form
├── hooks/
│   ├── useMovies.js           # Search state & API logic
│   └── useWatchlist.js        # CRUD operations & localStorage
├── lib/
│   └── api.js                 # All OMDB API calls
└── .env.local                 # API key (not committed)
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ThulaxanUthayakumar/MovieApp.git
cd movie-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a free OMDB API key

Go to [omdbapi.com](http://www.omdbapi.com/apikey.aspx) and register for a free key.

### 4. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Pages

### Home — Movie Search
- Loads popular movies on first visit
- Debounced search updates results as you type
- Click any card to open the full detail modal
- Toggle ❤️ to add or remove from your watchlist

### Watchlist — CRUD Management
- Table view of all saved movies
- Stats: total saved, custom movies, average rating
- **Add** custom movies with the form modal
- **Edit** any movie's details inline
- **Delete** movies with a confirmation prompt

---

## 🔑 Key Technical Decisions

**Custom Hooks for separation of concerns**
All API logic lives in `useMovies.js` and all watchlist state lives in `useWatchlist.js`. Components only handle rendering — they call the hook and display the result.

**Debounced search for performance**
Search fires 500ms after the user stops typing, reducing unnecessary API calls on every keystroke.

**Single `MovieFormModal` for Create and Update**
The same modal component handles both adding a custom movie and editing an existing one. It detects which mode it's in based on whether a `movie` prop is passed.

**localStorage persistence**
Watchlist data persists across page refreshes and sessions without needing a backend database.

---

## 🌱 Future Improvements

- [ ] Pagination for search results
- [ ] Skeleton loading cards
- [ ] Filter watchlist by genre or rating
- [ ] Backend database with Next.js API routes
- [ ] User authentication

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built by [Thulaxan Uthayakumar](https://github.com/ThulaxanUthayakumar)
