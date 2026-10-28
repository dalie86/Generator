import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ViennaRoot } from "./ViennaRoot";

const screens = import.meta.glob("../screens/**/index.tsx", { eager: true }) as Record<
  string,
  { default?: () => JSX.Element }
>;

function App() {
  const name = new URLSearchParams(location.search).get("screen");
  const entry = Object.entries(screens).find(([path]) => name && path.includes(`/${name}/`));
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
    <ViennaRoot>
      <App />
    </ViennaRoot>
  </StrictMode>,
);
