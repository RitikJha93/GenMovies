import { Component } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "./List";
import "./Navbar.css";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      menuWidth: 0 + "%",
      menuDisplay: "none",
      click: "home"
    };
  }
  render() {
    const effect = (data) => {
      this.setState({ click: data });
    };

    const menu = (data) => {
      if (this.state.menu) {
        this.setState({ menu: false, menuWidth: 0 + "%", menuDisplay: "none" });
      } else {
        this.setState({
          menu: true,
          menuWidth: 100 + "%",
          menuDisplay: "block"
        });
      }
    };

    const x = () => {
      console.log("x");
    };
    return (
      <div className="navbar">
        <div className="header">
          {this.state.menu ? (
            <CloseIcon className="close" onClick={menu} />
          ) : (
            <MenuIcon className="menu" onClick={menu} />
          )}

          <h3 onClick={() => window.scroll(0, 0)}>GenMovies</h3>

          {this.state.menu ? (
            <div
              className="nav"
              style={{
                width: this.state.menuWidth,
                display: this.state.menuDisplay
              }}
            >
              <List close={menu} hover={effect} clicked={this.state.click} />
            </div>
          ) : (
            <div className="nav" style={{ display: "block" }}>
              <List close={x} hover={effect} clicked={this.state.click} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
