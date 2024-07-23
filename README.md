# Your Project

## Description

This project is a backend API developed with Node.js, Express, and Sequelize for managing a restaurant system. It includes features such as user authentication, CRUD operations for different entities, and integration with a MySQL database.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://dev.mysql.com/downloads/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://gitlab.com/laortiz937/lasabrosita.git
   cd your-project
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create and Configure  File**

   Create a  file in the root directory of the project with the following content:

   ```env
   DB_HOST=localhost
   DB_USER=administrador
   DB_PASSWORD=admin123
   DB_NAME=La_Sabrosita

   PORT=3000
   JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxZDFkZWE3LTkwODctNDNmNy1hYjJlLWIzMjE5N2U0MTRhYiIsImlhdCI6MTcyMTc1MjUzOCwiZXhwIjoxNzIxNzU2MTM4fQ.f-VojL_IP9O5WAq9H4wXDGJcXOfK7P8EShqBmSh2mdY
   ```

   Make sure to replace  with a secure JWT secret.

### Database Setup

1. **Run Migrations**

   To set up the database schema, run:

   ```bash
   npm run migrate
   ```

2. **Seed the Database**

   If you have seed data, you can populate the database with:

   ```bash
   npm run seed
   ```

### Running the Project

To start the project in development mode with auto-reloading, run:

```bash
npm run dev
```

For a production build, run:

```bash
npm start
```

### API Endpoints

You can find the API endpoints and their documentation in the  directory.

## Contributing

Feel free to open issues or submit pull requests if you have any improvements or bug fixes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
