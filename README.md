
# EventHub - Event Management System

EventHub is a responsive event management application built using React, Redux Toolkit, and the Ticketmaster Discovery API.

## Features

- Browse upcoming events from Ticketmaster
- Search events by keyword
- Filter events by category and city
- View event details, including venue, date, time, and location
- Register and log in with simulated authentication
- Persist user sessions using localStorage
- Register for events
- Prevent duplicate event registrations
- Cancel event registrations
- View registered events in My Events
- Separate upcoming and completed events
- Responsive interface for desktop and mobile

## Technologies Used

- React.js
- Vite
- Redux Toolkit
- React Redux
- React Router
- Ticketmaster Discovery API
- JavaScript
- CSS
- Browser localStorage

## Installation

Clone the repository:

```bash
git clone https://github.com/abdullah-ahmed7/event-management-system.git
```

Navigate into the project:

```bash
cd event-management-system
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
VITE_TICKETMASTER_API_KEY=your_ticketmaster_consumer_key
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Authentication

This project uses simulated frontend authentication.

Registered accounts and login sessions are stored in browser localStorage. Authentication is intended for demonstration purposes only and is not suitable for production applications.

Use a test password that is not used for any real account.

## Event Registration

Users must be logged in to register for events.

The application uses Redux Toolkit to manage registrations and localStorage to preserve them across page refreshes.

Users cannot register for the same event more than once.

## Project Structure

```text
src/
├── app/
│   └── store.js
├── features/
│   ├── auth/
│   │   └── authSlice.js
│   └── registrations/
│       └── registrationSlice.js
├── components/
│   └── EventCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── EventDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── MyEvents.jsx
├── services/
│   └── ticketmaster.js
├── App.jsx
└── main.jsx
```

## API

Event data is retrieved from the Ticketmaster Discovery API.

Documentation:
https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/

## Limitations

- Authentication is simulated without a backend.
- User accounts and registrations are stored locally in the browser.
- A Ticketmaster API key is required to load events.
- Event availability depends on Ticketmaster API results.

## Author

Abdullah Ahmed

Web Programming - Assignment 2
```
