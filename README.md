## Dev Links

This project is a platform to create custom software engineer profiles! It houses development-focused links, social media, contact info and a profile picture in a dynamically rendered URL. It utilizes Node, Typescript and Postgres on the backend, Tailwind and Radix Primitives on the frontend, and AWS for file storage.

## Running this Repo Locally

Clone the repo to your machine, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- [x] User Authentication w/ Credentials & Github
- [x] Create/Edit/Delete Links
- [x] Validate Links Server-Side
- [x] Drag and Drop Links (Reorder)
- [x] Preview Aggregated Links
- [x] Generate
- [x] Add/Edit Profile Details
- [x] Upload Profile Picture via Drag and Drop
- [x] Responsive Design

## Details

### User Authentication w/ Credentials & Github

Users can sign up and login with their email and password. They can also sign up and login with their Github account. The Github OAuth flow is handled by the server, and the user is redirected back to the client with a JWT token. The client then stores the token in a cookie and uses it for subsequent requests.

If a user already has an account, and then logs in with Github, the two accounts will be linked to the user via logic in the signIn callback (Next-Auth).

### Create/Edit/Delete Links

Users can create, edit and delete links. The links are stored in a Postgres database. The links are validated server-side to ensure they are valid URLs.

### Drag and Drop Links (Reorder)

Users can drag and drop links to reorder them. The order is stored in the database and persisted in the client for a seamless user experience.

### Preview Aggregated Links

Users can preview their aggregated links. The preview rendered server-side in a component and reused in multiple places in the app, including the external-facing 'Dev Link' (your custom link containing all aggregated links).

### Generate Dev Link

The 'Dev Link' is generated when a user registers based on their username. The link is a dynamic, SSR'ed route that fetches the user's links and displays them for the external viewer.

### Add/Edit Profile Details

Profile details can be added/edited by the user. The form is submitted and details are updated in the database. Image uploads are handled separately.

### Upload Profile Picture via Drag and Drop

Users can upload a profile picture via drag and drop. The image is uploaded to an AWS S3 bucket and the URL is stored in the database. The dropzone is tied to a callback that triggers when the image file is uploaded.

### Responsive Design

The app is responsive and works on mobile, tablet and desktop.

## Tech Stack

### Next.js

Next.js is a React framework that allows for server-side rendering, static site generation, and more. It is used in this project for server-side rendering and static site generation.

### Typescript

Typescript is a superset of Javascript that adds static typing. It is used in this project to add type safety to the codebase.

### Postgres

Postgres is a relational database. It is used in this project to store user and link data.

### Prisma

Prisma is an ORM that allows for type-safe database access. It is used in this project to interact with the Postgres database.

### Next-Auth

Next-Auth is a library that allows for easy authentication with Next.js. It is used in this project to handle user authentication via user credentials and Github OAuth.

### Tailwind

Tailwind is a utility-first CSS framework. It is used in this project to style the app.

### Radix Primitives

Radix Primitives is a component library. It is used in this project to build the UI.

### AWS

AWS is a cloud computing platform. It is used in this project to store user profile pictures.

## Prospective Features

Feature that might be added to this project at a later date:

- [ ] Forgot Password Flow
- [ ] Email Verification
- [ ] Dark Mode
- [ ] Add Portfolio Section
- [ ] Add Blog Section
- [ ] Add Video Clip Section
- [ ] Custom Layout

This would turn the project into a full-fledged customizable developer portfolio site.
