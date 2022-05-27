class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
    this.updateQuote = this.updateQuote.bind(this);
    this.copy = this.copy.bind(this);
    this.updateQuote();
  }

  updateQuote(e) {
    if (e) {
      e.target.style.transform = "scale(1.1)";
      setTimeout(() => {
        e.target.style.transform = "scale(1)";
      }, 200);
    }
    axios.get("https://api.quotable.io/random").then((res) => {
      this.props.getColor();
      this.setState({
        quote: res.data.content,
        author: res.data.author,
      });
    });
  }

  copy(e) {
    let button = document.getElementById("copy");
    button.style.transform = "scale(1.1)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 200);
    navigator.clipboard.writeText(
      this.state.quote + "\n\n- " + this.state.author
    );
  }

  render() {
    if (!this.state.quote)
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    return (
      <div id="quote-box">
        <p
          id="text"
          className="text-center"
          style={{ color: this.props.color }}
        >
          <i className="fa-solid fa-quote-left"></i>{" "}
          <span>{this.state.quote}</span>
        </p>
        {this.state.author && (
          <p style={{ color: this.props.color }} id="author">
            - {this.state.author}
          </p>
        )}
        <div id="links">
          <div className="d-flex">
            <button
              onClick={this.copy}
              style={{ color: "white", background: this.props.color }}
              className="btn"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Copy to clipboard"
              id="copy"
            >
              <i className="fa-solid fa-clipboard"></i>
            </button>
          </div>
          <div>
            <button
              style={{ color: "white", background: this.props.color }}
              onClick={this.updateQuote}
              id="new-quote"
              className="btn"
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
    this.getRandomColor = this.getRandomColor.bind(this);
    document.body.style.backgroundColor = this.state.color;
  }

  getRandomColor() {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.setState({
      color: randomColor,
    });
    document.body.style.backgroundColor = randomColor;
  }

  render() {
    return (
      <div className="wrapper">
        <QuoteBox color={this.state.color} getColor={this.getRandomColor} />
      </div>
    );
  }
}
const e = React.createElement;
const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));
