import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEdit from "./CreateEdit";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/form/:type" exact>
              <CreateEdit />
            </Route>
            <Route path="/form/:id/:type" exact>
              <CreateEdit />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
