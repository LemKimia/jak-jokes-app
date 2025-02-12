# Jakmall Mobile Developer Test

This is a **mobile application** built using **React Native** as part of the technical test for the Mobile Developer position at Jakmall.

## 📜 Task Description

As a Mobile Developer candidate, the task involves developing a feature-rich mobile application following the provided problem statement. The challenge requires implementing functionalities such as API integration, state management, and UI improvements.

You can read the full test details in the provided instructions.

## 🚀 Features Implemented

- Fetch jokes by category from a public API.
- Load additional jokes dynamically with a limit on fetch count.
- Display jokes in an accordion-style list.
- Implement pull-to-refresh functionality for better UX.
- Improved state management using Zustand.
- Optimized UI and performance with FlatList.
- Enhanced loading indicators for better feedback.

## 🛠️ Tech Stack

- **React Native** (with Expo)
- **TypeScript**
- **Tamagui** (for UI components)
- **Zustand** (for state management)
- **React Query** (for data fetching)
- **Axios** (for API requests)

## 🤖 API Reference

Jokes are fetched from the following public API:

```
https://api.example.com/jokes/{category}
```

## 📌 Notes

- The app limits joke fetching per category to **2 times** before hiding the fetch button.
- The category list is managed dynamically.
- UI components are styled using **Tamagui** for better performance.

## 👨‍💻 Author

Developed by **Samuel Joel Tangkawarow** as part of the Jakmall Mobile Developer Test.
