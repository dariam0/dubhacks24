# Planetary Simulation Project - DubHacks 24

This project simulates gravitational forces between planets in a 2D plane. Users can interact with the simulation by placing different types of planets on the screen and adjusting their properties, such as angle, magnitude, and position. The backend performs calculations for gravitational interactions and updates planet positions over time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add different types of planets by clicking corresponding buttons.
- Animate planets based on gravitational forces calculated by the backend.
- Real-time simulation of planetary motion with adjustable parameters.

## Technologies Used

- **Frontend**: 
  - HTML
  - CSS
  - JavaScript
- **Backend**: 
  - Python (Flask)
- **Animation**: JavaScript `requestAnimationFrame` for smooth real-time updates.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/dariam0/dubhacks25.git
    cd dubhacks25
    ```

2. **Install Python dependencies**:
   - Create and activate a virtual environment (optional but recommended):
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install required Python packages:
     ```bash
     pip install -r backend/requirements.txt
     ```

3. **Run the Flask backend**:
    ```bash
    python backend/app.py
    ```

4. **Run the Frontend**:
   Open the `frontend/index.html` file in your browser, or use a local web server (e.g., `python -m http.server 8000`).

## Usage

1. Navigate to the frontend application in your browser.
2. Click on the buttons corresponding to different types of planets to add them to the simulation.
3. Adjust planet parameters (e.g., angle, magnitude) using the sliders or input fields.
4. The backend will calculate gravitational forces and update the positions of the planets.
5. Watch the planetary motion unfold in real-time.

## Project Structure

```bash
dubhacks25/
│
├── backend/                    # Backend server code (Flask)
│   ├── main.py                 # Main Flask application
│   ├── init.py                 # Application initialization
│   └── requirements.txt        # Python dependencies
│
├── frontend/                   # Frontend code (HTML, CSS, JS)
│   ├── index.html              # Main webpage
│   ├── main.js                 # JavaScript controlling planet logic
│   ├── backend.js              # JavaScript handling communication with backend
│   ├── styles.css              # Styling for the frontend
│
├── .vscode/                    # VSCode configuration
├── .git/                       # Git repository data
├── README.md                   # This README file
└── .gitignore                  # Files and directories to ignore in Git
