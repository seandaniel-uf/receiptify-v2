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
npm or yarn
```
Install once the repository is cloned locally:
```
npm install
# or
yarn
```
Run locally:
```
npm run dev
# or
yarn dev
```
The app will be available at: [http://localhost:5173/](http://localhost:5173/)

## 🧩 Folder Structure

```
src/
├── Components/
│   ├── Form.tsx
│   ├── Header.tsx
│   ├── Legend.tsx
│   ├── Loading.tsx
│   ├── Login.tsx
│   ├── Receipt.tsx
│   └── ReceiptFormContainer.tsx
│
├── partials/
│   ├── _form.scss
│   ├── _global.scss
│   ├── _header.scss
│   ├── _legend.scss
│   ├── _loading.scss
│   ├── _login.scss
│   ├── _receipt.scss
│   ├── _receiptFormContainer.scss
│   ├── _setup.scss
│   └── _variables.scss
│
├── testCoverage/
│   ├── Header.test.tsx
│   ├── Loading.test.tsx
│   └── utils.test.ts
│
├── App.tsx
├── main.tsx
├── index.scss
├── utils.ts
```

## 💪 To Do

- 100% Test coverage for all components
- Create a playlist from your selected receipt
- Open the receipt in a new tab
- API error states
