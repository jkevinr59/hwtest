# HR Application

A Node.js-based HR management application with automated data collection and applicant management. The application uses PostgreSQL for data storage and includes cron jobs for scheduled tasks.

## Features

- **Applicant Management**: Handle job applications and applicant data
- **Automated Data Collection**: Scheduled scripts to collect and process data
- **Data Cleaning**: Automated data maintenance and cleanup tasks
- **Database Migrations**: Structured database schema management
- **Docker Containerization**: Easy deployment with Docker and Docker Compose

## Prerequisites

Before running this application, make sure you have the following installed:

- **Docker** and **Docker Compose**
- **Git** for version control

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hwtest
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:
   ```env
   HOST_DB_PORT=5432
   HOST_APP_PORT=3000
   DATABASE_URL=postgres://app:onlydb@db:5432/appdatabase
   ```

## Environment Variables

The application uses the following environment variables:

- `HOST_DB_PORT`: Port to expose PostgreSQL database (default: 5432)
- `HOST_APP_PORT`: Port to expose the Node.js application (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string, replace according to HOST_DB_PORT if changed

## Running the Application

1. **Start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop services:**
   ```bash
   docker-compose down
   ```

## Running the Application on Production (using real /home/cron)

1. **Start all services:**
   ```bash
   docker-compose up -f compose.prod.yaml --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up  -f compose.prod.yaml -d --build
   ```

3. **Stop services:**
   ```bash
   docker-compose down
   ```


## Available Scripts

- `npm run collect`: Run data collection script
- `npm run clean`: Run data cleaning script
- `npm run scheduler`: Run scheduler script

## Database

The application uses PostgreSQL with the following structure:

- **Migrations**: Located in `migrations/` directory
- **Database Scripts**: Additional scripts in `db_scripts/` directory

Database migrations are automatically applied when the Docker containers start.

## Running SQL for Test Purpose

SQL Test answer stored in ./db_scripts folder and mounted inside db container in /home/db_scripts . For the test convenience this app already includes staff table inside hrapp_db container to be used to test the sql result,to run it

docker exec -i <db container> psql -U <username> -d <database name> -f <sql file inside>

example:
docker exec -i hr_app_db psql -U app -d appdatabase -f /home/db_scripts/task1.sql

## Project Structure

```
├── src/                    # Source code
│   ├── applicant.js       # Applicant management
│   ├── attendance.js      # Attendance tracking, deprecated
│   ├── index.js          # Main application entry
│   └── main.js           # Deprecated
├── scripts/               # Utility scripts
│   ├── collectdata.js    # Data collection
│   ├── dataclean.js      # Data cleaning
│   └── scheduler.js      # Task scheduling, deprecated
├── migrations/            # Database migrations
├── db_scripts/            # Database scripts for task given
├── data/                  # Processed data storage
├── Dockerfile             # Docker configuration
├── compose.yaml           # Docker Compose setup
├── crontab               # Cron job configuration
└── package.json           # Node.js dependencies
```

## Checking Scheduler result

Scheduler result are mounted using docker volumes crondata, for or in /home/cron if using production by using compose.prod.yaml