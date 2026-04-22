import Home from "../../HomeArea/Home/Home";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>

      <main>
        <Home />
      </main>
    </div>
  );
}

export default Layout;
