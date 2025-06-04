# Refactoring Tracker

A web-based tool for tracking code refactoring progress and managing refactoring requests across the team.

## Features

- Track files that need refactoring
- Monitor refactoring progress and test coverage
- Make and manage refactoring requests
- View statistics on refactoring progress
- Secure login system for administrative access

## Access

The application is hosted at: [URL will be added after deployment]

## Usage

### For Team Members
1. Visit the website
2. View the current status of files being refactored
3. Submit refactoring requests using the "Make Request" button
4. Monitor the progress of refactoring efforts

### For Administrators
1. Log in using your credentials
2. Add/remove files from the tracking list
3. Update refactoring and testing status
4. Manage refactoring requests
5. View comprehensive statistics

## Local Development

To run the project locally:
1. Clone this repository
2. Open `index.html` in a web browser
3. For the best experience, use a local server

## Security Note

This application uses client-side storage for data management. In a production environment, consider implementing server-side storage for better security and data persistence.

A simple web-based tool to track the progress of code refactoring efforts and their associated unit tests.

## Features

- Secure login system for administrative access
- Track files that need to be refactored
- Mark files as refactored with hover functionality to show new file names
- Track unit test creation status
- Real-time statistics dashboard
- Simple and intuitive interface

## Usage

1. Open `login.html` in a web browser
2. Login credentials:
   - Username: `Discount-Tire-Devs`
   - Password: `VisionPOSDevs`

### As an Administrator (logged in):
- Click the '+' button to add new files that need refactoring
- Check/uncheck boxes to update the status of files
- View hover tooltips showing refactored file names and test file names
- Monitor progress through the statistics panel

### As a Viewer (not logged in):
- View the current status of all files
- See hover tooltips with refactored and test file names
- View statistics

## File Naming Convention
- Original file: `filename.ext`
- Refactored file: `filename_refactored.ext`
- Test file: `filename_refactored_tests.ext`

## Project Structure

```
refactoring-tracker/
├── src/
│   ├── index.html        # Main tracking interface
│   ├── login.html        # Login page
│   ├── css/
│   │   └── styles.css    # Styles for both pages
│   └── js/
│       ├── login.js      # Login functionality
│       ├── tracker.js    # Main tracking functionality
│       └── utils.js      # Shared utility functions
└── tests/
    └── tracker.test.js   # Test file for tracker functionality
```

## Security

This application uses client-side storage for simplicity. In a production environment, it's recommended to implement proper server-side authentication and database storage.
