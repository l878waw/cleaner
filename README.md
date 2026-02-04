# System Data Cleaner

A modern, desktop-based utility for macOS to visualize and clean system caches and logs. Built with Electron and designed with a premium "Glassmorphism" aesthetic.

## Features

- **Visual Dashboard**: View current system cache and log usage at a glance.
- **Glassmorphism Design**: sleek, dark-mode interface with translucent effects.
- **Safe Cleaning**: Targeted cleaning of user-level caches (`~/Library/Caches`) and logs (`~/Library/Logs`) to avoid system instability.
- **Real-time Feedback**: Animated status indicators and immediate feedback on cleaning actions.

## Installation

### From Source

1. Clone the repository:
   ```bash
   git clone https://github.com/l878waw/cleaner.git
   cd cleaner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

### Desktop App

A standalone `.app` bundle can be built using the included packager:

```bash
# Build for macOS (Intel)
npx electron-packager . cleaner --platform=darwin --arch=x64 --out=dist
```

## Troubleshooting

- **Startup Error**: If you see an error about `app` being undefined, standard `npm start` handles this automatically by setting `ELECTRON_RUN_AS_NODE=0`.
- **Permissions**: Ensure the app has permissions to access your `~/Library` folder (standard user permissions).

## Technologies

- **Electron**: App runtime.
- **Vanilla CSS**: Custom styling with glassmorphism effects.
- **Node.js**: Backend logic for file system operations.

## License

ISC
