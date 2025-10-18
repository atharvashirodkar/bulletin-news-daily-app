# Bulletin News Daily

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)

A modern, responsive news aggregation web application that provides real-time access to news articles from various sources using the NewsAPI.

## Features

- 🔍 Real-time news search functionality
- 📱 Responsive design using Bootstrap 5
- 🖼️ Card-based article layout with images
- 🚀 Fast and efficient API integration
- 🔄 CORS enabled for cross-origin requests
- 📄 Pagination support for article browsing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- NPM (Node Package Manager)
- NewsAPI Key (Get it from [https://newsapi.org](https://newsapi.org))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bulletin-news-daily-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your NewsAPI key:
   - Sign up at [NewsAPI](https://newsapi.org) to get your API key
   - Replace `YOUR_API_KEY` in the API requests with your actual key

4. Start the local development server:
   ```bash
   npm start
   ```
   or with auto-reload for development:
   ```bash
   npm run app
   ```

5. Open the application:
   ```
    Run main file: index.html
   ```
   > **Important**: This is a frontend application that requires running a local server to proxy NewsAPI requests. 
   > The server is necessary because NewsAPI's free tier only allows requests from localhost.

## API Usage

The application provides a simple API endpoint that proxies requests to NewsAPI:

```
GET /api?{newsapi-parameters}
```

Example:
```
GET /api?q=technology&pageSize=10&page=1
```

## Tech Stack

- **Frontend**: HTML5, Bootstrap 5
- **Backend**: Node.js, Express
- **Dependencies**:
  - express ^5.1.0 - Web application framework
  - axios ^1.11.0 - HTTP client for API requests
  - cors ^2.8.5 - CORS middleware
  - nodemon ^3.1.10 - Development auto-reload utility

## Project Structure

```
bulletin-news-daily-app/
├── server.js        # Express server setup and API routes
├── index.html       # Main frontend interface
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

## Support

For support, please:

1. Check the [NewsAPI Documentation](https://newsapi.org/docs)
2. Open an issue in the project repository
3. Contact the project maintainers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Maintainers

This project is maintained by the original creator and open-source contributors. Feel free to reach out for any questions or contributions.