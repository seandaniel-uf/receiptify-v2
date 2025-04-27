## ⚙️ Tech Used

- React
- TypeScript
- Vite
- Jest
- [Spotify API](https://developer.spotify.com/documentation/web-api)

## 🛠️ Getting Started

Make sure you have the following installed:
```
Node.js >= 16
npm
```
Install once the repository is cloned locally:
```
npm install
```
Run locally:
```
npm run dev
```
The app will be available at: [http://localhost:5173/](http://localhost:5173/)

## 📁 Folder Structure

```
src/
├── Components/
│   ├── Form.tsx              # To customize your receipt (Favorite tracks or artists, time period, length of receipt)
│   ├── Header.tsx
│   ├── Legend.tsx            # Legend explaining your receipt
│   ├── Loading.tsx           # For when the receipt is in a loading state after login
│   ├── Login.tsx             # Authentication directed to Spotify's secure login
│   ├── Receipt.tsx           # Your receipt with all your favorite tracks or artists, including a download button to share with friends
│   └── ReceiptFormContainer.tsx
│
├── partials/                  # All components have their individual partials
│   ├── _form.scss
│   ├── _global.scss           # Applies across all components
│   ├── _header.scss
│   ├── _legend.scss
│   ├── _loading.scss
│   ├── _login.scss
│   ├── _receipt.scss
│   ├── _receiptFormContainer.scss
│   ├── _setup.scss            # For browser consistency 
│   └── _variables.scss
│
├── testCoverage/              # All components and utility functions have their individual test coverage files
│   ├── Header.test.tsx        
│   ├── Loading.test.tsx
│   └── utils.test.ts
│
├── App.tsx                    # Login page
├── main.tsx
├── index.scss                 # All Sass partial imports 
├── utils.ts                   # Utilities for formatting time, generating random numbers, and more
```

## 💪 To Do

- 100% Test coverage for all components
- Create a playlist from your selected receipt
- Open the receipt in a new tab
- API error states
