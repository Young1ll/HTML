# minimum-kanban

## Table of Contents

- [About](#about)
- [Structure](#project-structure)
- [Features](#features)
- [References](#references)

## About <a name = "about"></a>

minimum-kanban은 Vite(react), MUIv5, Firebase, Zustand로 제작된 kanban Web App 입니다. 프로젝트, 일정 등을 간편하게 관리할 수 있는 일반적인 Kanban 3-columns flow 방식이며...

## Project Structure <a name = "project-structure"></a>
```shell
📦src
 ┣ 📂assets
 ┃ ┗ 📜logo.svg
 ┣ 📂components
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📜AppLoader.jsx
 ┃ ┃ ┣ 📜GlobalTopbar.jsx
 ┃ ┃ ┗ 📜ModalHeader.jsx
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜ImageEl.jsx
 ┃ ┃ ┣ 📜PrivateRoute.jsx
 ┃ ┃ ┣ 📜PublicOnlyRoute.jsx
 ┃ ┃ ┣ 📜SnackbarManager.jsx
 ┃ ┃ ┗ 📜StrictModeDroppable.jsx    # <-- Dnd custom config
 ┣ 📂hooks
 ┃ ┗ 📜use-app.js   # <------------------ App Services(firebase)
 ┣ 📂screens
 ┃ ┣ 📂AuthScreen
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┣ 📜LoginForm.jsx
 ┃ ┃ ┗ 📜RegisterForm.jsx
 ┃ ┣ 📂BoardScreen
 ┃ ┃ ┣ 📜AddTaskModal.jsx
 ┃ ┃ ┣ 📜BoardInterface.jsx
 ┃ ┃ ┣ 📜BoardNotReady.jsx
 ┃ ┃ ┣ 📜BoardTab.jsx
 ┃ ┃ ┣ 📜BoardTopbar.jsx
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┣ 📜ShiftTaskModal.jsx
 ┃ ┃ ┗ 📜Task.jsx
 ┃ ┣ 📂BoardsScreen
 ┃ ┃ ┣ 📜BoardCard.jsx
 ┃ ┃ ┣ 📜CreateBoardModal.jsx
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┗ 📜NoBoards.jsx
 ┃ ┣ 📂ExploreScreen
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┗ 📂UserScreen
 ┃ ┃ ┗ 📜index.jsx
 ┣ 📜App.jsx        # <------------------- routing
 ┣ 📜firebase.js
 ┣ 📜index.css
 ┣ 📜main.jsx
 ┣ 📜store.js
 ┗ 📜theme.js
```

## Features <a name = "features"></a>

- Firebase Authentication을 사용한 사용자 인증
- Firestore를 이용한 데이터 저장 및 관리
- 3 Columns Layout + Backlogging
- Drag and Drop Tasks
- Responsive
- 마크다운, 이미지, 링크 첨부 지원
- 공유 및 PDF 내보내기

## References <a name = "references"></a>

- <https://youtu.be/5H0I97Pe9YY?si=eAV_xBvxhkzgScIb>
