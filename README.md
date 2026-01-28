# DNB Hub – Client (Frontend)

This repository contains the **frontend application** for DNB Hub.  
It is built with **React** and communicates with a REST API to manage drum & bass artists, events and promoters.

The frontend focuses on usability, clean structure and a mobile-first responsive design.

---

## Features

### Authentication

- User signup and login
- JWT-based session handling
- Protected routes
- User profile page
- Edit profile functionality

### Artists, Events & Promoters

- Create, read, update and delete entities
- Relationship management between events, artists and promoters
- Placeholder images when no image is provided

### UI / UX

- Mobile-first responsive design
- Clean layout built with plain CSS (no frameworks)
- Active navigation state
- Custom 404 / Not Found page

---

## Tech Stack

- React
- React Router
- CSS
- REST API integration

---

## Pages & Routes

- `/` – Home
- `/artists`
- `/events`
- `/promoters`
- `/profile`
- `/profile/edit`
- `*` – Not Found

---

## MVP Scope

- Authentication with JWT
- CRUD functionality for main entities
- Responsive UI
- Error handling and custom 404 page

---

## Future Improvements

- Image upload from the client
- Loaders/spinners during data fetching
- Map integration to display event locations

---

## Author

Developed by **Luís Castro** as part of the Module 3 project.
