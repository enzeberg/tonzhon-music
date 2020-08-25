# tongzhong-music

<img src="./qr_code.png" width="64" alt="QR code">

<h3>Listen to the music from different platforms in one place.</h3>

## Addresses
- [tongzhong.xyz](http://tongzhong.xyz)
- [mini.tongzhong.xyz](http://mini.tongzhong.xyz)

## Features
### Desktop
- Search
 (Searching with query string is supported, try: [http://mini.tongzhong.xyz/search?keyword=Iron%20Man](http://mini.tongzhong.xyz/search?keyword=Iron%20Man).)
- Play
- Download
- Get playlist from Netease (try: [http://mini.tongzhong.xyz/netease-playlist/5132177936](http://mini.tongzhong.xyz/netease-playlist/5132177936))
- Hot list (including QQ Music, Netease Music and Kuwo Music)
- Record search history

### Mobile
- Search
- Play

## Usage
    # Install dependencies
    npm install
    # Build client-side bundle
    npm run build
    # Start the server
    npm run server
Open `http://localhost:8081` to visit the page that uses the production build.

## Developing
### Server-side
    # Start nodemon dev server (nodemon needs to be installed globally.)
    npm run dev-server

### Client-side
    # Start webpack dev server
    npm start
Open `http://localhost:3000/` for desktop, and `http://localhost:3000/m/` for mobile.

## License
MIT