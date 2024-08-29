# Strixhaven Tracker

## Overview
Strixhaven Tracker is a comprehensive tool designed to manage and track the progress of players in the Strixhaven: Curriculum of Chaos adventure, a crossover between Dungeons & Dragons and Magic: The Gathering. This application allows users to manage relationships, report cards, extracurricular activities, and job assignments within the Strixhaven university setting.

## Features

- **Relationship Management**: Track and manage character relationships, including points, types, and special boons or banes. See the relevant code in [Relationships.tsx](typescript:src/components/Relationships.tsx) 

- **Report Cards**: Monitor academic performance through customizable report cards for each year, reflecting passed and failed exams, skills used, and rerolls. See the relevant code in [ReportCards.tsx](typescript:src/components/ReportCards.tsx) 

- **Extracurricular Activities**: Assign characters to various clubs and societies, tracking the skills they gain and their roles within these groups. See the relevant code in [Extracurriculars.tsx](typescript:src/components/Extracurriculars.tsx) 

- **Job Assignments**: Manage part-time jobs alongside academic activities, including details about employers and coworkers. See the relevant code in [Job.tsx](typescript:src/components/Job.tsx) 

- **Data Import/Export**: Easily export and import your game data to and from local storage to ensure no progress is lost.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Juxsta/strixhaven-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd strixhaven-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```
g
## Usage

After launching the app, navigate through the tabs to access different features:
- **Relationships**: Add or modify character relationships.
- **Report Cards**: View or update academic records.
- **Extracurriculars**: Assign characters to activities and track their involvement.
- **Jobs**: Manage job assignments and interactions with coworkers.

Use the import/export buttons to save or load your data.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
