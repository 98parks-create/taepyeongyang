class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0 };

  }
  componentDidMount() {
    this.loadInterval = setInterval(() => {
      const { number } = this.state;
      
      if (number < 100) {
        this.setState({ number: number + 1 });
      } else {
        clearInterval(this.loadInterval);
        setTimeout(() => {
          window.location.href = "portfolio.html"; 
        }, 500);
      }
    }, 15);
  }

  componentWillUnmount() {
    clearInterval(this.loadInterval);
  }

  render() {
    return (
      React.createElement("div", { className: "App" }, 
      React.createElement(Loader, { number: this.state.number })));


  }}


const Loader = ({ number }) => {
  let numberString = number < 10 ? '0' + number : number;

  const loaderStyle = {
    transform: `scale(${0.5 + (number * 0.02)})`,
    opacity: number / 100,
    transition: 'transform 0.125s ease'
  };

  return React.createElement(
    "div", 
    { className: "Loader", style: loaderStyle }, 
    numberString, 
    React.createElement("sup", null, "%")
  );
};

ReactDOM.render(
React.createElement(App, null),
document.getElementById('root'));