import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// TODO: подключите стили дизайн-системы (путь из pilot.config.json → dsStylesImport)
// import "TODO-ds-package/styles.css";

const screens = import.meta.glob("../screens/**/*.tsx", { eager: true }) as Record<
  string,
  { default?: () => JSX.Element }
>;

function App() {
  const name = new URLSearchParams(location.search).get("screen");
  const entry = Object.entries(screens).find(([path]) => name && path.includes(`/${name}`));
  if (!entry?.[1].default) {
    return (
      <ul>
        {Object.keys(screens).map((p) => {
          const id = p.split("/").at(-2) ?? p;
          return (
            <li key={p}>
              <a href={`?screen=${id}`}>{id}</a>
            </li>
          );
        })}
      </ul>
    );
  }
  const Screen = entry[1].default;
  return <Screen />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
