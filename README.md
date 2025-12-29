# muse 

muse is a social networking platform that connects people through their music taste. built with React and powered by Spotify, users can discover others with similar musical interests, view their top artists, and save connections.

## this was made for [disc club at nu](https://discnu.org)
part of the assignment was to use a premade api to fetch users so the artists had to be randomly generated. this part was commmented out after supabase auth was added so that users can make their own account

- **Frontend**: [https://disc-app-five.vercel.app](https://disc-app-five.vercel.app)
- **Backend API**: [https://disc-users-api.onrender.com](https://disc-users-api.onrender.com)

## Features

- **Spotify Integration**: Sign up and login using Spotify OAuth
- **Profile Pictures**: Automatic profile picture sync from Spotify
- **Top Artists**: Display your top 3 artists from Spotify
- **Discover Users**: Browse all users on the platform
- **Save Connections**: Save users you're interested in connecting with
- **User Profiles**: View your own profile with saved connections count

## backend
- **Node.js + Express** - REST API
- **Supabase** - Database and authentication
- **Spotify Web API** - OAuth and user data
- **CORS** - Cross-origin resource sharing

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login existing user

### Users
- `GET /users` - Get all users
- `GET /users/:id/saved` - Get saved users for a specific user
- `POST /users/save` - Save a user connection

### Spotify
- `POST /spotify/callback` - Exchange Spotify auth code for user data


Made with ❤️ 
