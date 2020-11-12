import React, { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import "./App.css";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "create",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web!!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for imformation" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactivs" },
      ],
    };
  }
  render() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      let i = 0;
      while (i < this.state.contents.length) {
        let data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            //add content to this.state.contents
            console.log(_title, _desc);
          }.bind(this)}
        ></CreateContent>
      );
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>
        {/* <Subject title="React" sub="For UI"></Subject> */}
        {/* <header>
          <h1>
            <a
              href="/"
              onClick={function (e) {
                console.log(e);
                e.preventDefault(); //이벤트가 발생하구 페이지 리로드를 막아준다.
                // this.state.mode = "welcome";
                this.setState({
                  mode: "welcome",
                });
                // debugger;
              }.bind(this)}
            >
              {this.state.subject.title}
            </a>
          </h1>
          {this.state.subject.sub}
        </header> */}
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            this.setState({ mode: _mode });
          }.bind(this)}
        ></Control>
        {_article}
      </div>
    );
  }
}

export default App;
