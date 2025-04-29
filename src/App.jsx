import useScrollToTop from "./hooks/useScrollToTop";
import Router from "./routes/sections";

function App() {
  useScrollToTop()
  return <Router />;
}

export default App;
