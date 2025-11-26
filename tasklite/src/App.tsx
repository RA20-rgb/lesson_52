// src/App.tsx
/** @jsxImportSource @emotion/react */
import { ThemeProvider, Global, css } from "@emotion/react";
import { TasksPage } from "./pages/tasks-page";
import { theme } from "./styles/theme";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #030722;
    color: ${theme.colors.text};
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.md};
    line-height: 1.5;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  #root {
    width: 100%;
    max-width: 600px;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <TasksPage />
    </ThemeProvider>
  );
}

export default App;