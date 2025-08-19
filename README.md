# Movie App

**Description:**  
A web app to browse movies, view details, and check actors & directors.


## Folder Structure 
Movie-App/
├── env/                  # Python virtual environment
├── frontend/             # React frontend
├── movie-app-backend/    # Django backend
│   ├── movie_project/
│   ├── movies/
│   ├── db.sqlite3
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
└── .gitignore


## Setup

```bash
# Clone repo
git clone https://github.com/Anurudh-c/movie-app.git
cd movie-app

# Backend setup
python -m venv env
# Linux/Mac: source env/bin/activate
# Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend setup
cd frontend
npm install
npm start
