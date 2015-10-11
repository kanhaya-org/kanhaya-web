"use strict";

var List = React.createClass({
  displayName: "List",

  render: function render() {
    return React.createElement(
      "ul",
      null,
      this.props.items.map(function (item) {
        return React.createElement(
          "div",
          { key: item.name },
          React.createElement(
            "li",
            null,
            React.createElement(
              "h5",
              null,
              item.name
            ),
            " by ",
            item.author,
            "  |  ",
            React.createElement(
              "b",
              null,
              item.location
            )
          ),
          " ",
          React.createElement(
            "li",
            null,
            React.createElement(
              "p",
              { "class": "flow-text" },
              item.recentComment
            )
          )
        );
      })
    );
  }
});

var FilteredList = React.createClass({
  displayName: "FilteredList",

  filterList: function filterList(event) {
    var updatedList = this.state.booklist;
    updatedList = updatedList.filter(function (item) {
      return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
  },
  getInitialState: function getInitialState() {
    return {
      booklist: [{
        name: "Humans of New York: Stories",
        author: ["Brandon Stanton"],
        location: "Berkeley",
        language: "English",
        recentComment: "There's no judgment, just observation and in many cases reverence, making for an inspiring reading and visual experience. (Publishers Weekly (starred review) on Humans of New York)"
      }, {
        name: "The Metamorphosis",
        author: ["Franz Kafka"],
        location: "San Francisco",
        language: "English",
        recentComment: "The Metamorphosis is a short novel by Franz Kafka, first published in 1915. It is often cited as one of the seminal works of fiction of the 20th century and is widely studied in colleges and universities across the western world. The story begins with a traveling salesman, Gregor Samsa, waking to find himself transformed into an insect."
      }, {
        name: "Franz Kafka: The Complete Stories",
        author: ["Franz Kafka", "Nahum N. Glatzer"],
        location: "Oakland",
        language: "English",
        recentComment: "[Kafka] spoke for millions in their new unease; a century after his birth, he seems the last holy writer, and the supreme fabulist of modern man’s cosmic predicament. —from the Foreword by John Updike."
      }],
      items: []
    };
  },
  componentWillMount: function componentWillMount() {
    this.setState({ items: this.state.booklist });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "filter-list" },
      React.createElement("input", { type: "text", placeholder: "Search", onChange: this.filterList }),
      React.createElement(List, { items: this.state.items })
    );
  }
});

React.render(React.createElement(FilteredList, null), document.getElementById('mount-point'));
