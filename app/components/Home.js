var React = require('react-native');
var api = require('./../utils/api');

var {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
  } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  },

  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    margin: 5
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: []
    };
  }
  componentWillMount() {
    api.getTodos()
      .then((res) => {
        var todos = res.rows.map(function (row) {
          return row.doc;
        });
        this.setState({
          todos: todos
        });
      });
  }
  handleTodoChange(event) {
    this.setState({
      newTodo: event.nativeEvent.text
    });
  }
  handleSave() {
    api.saveTodo(this.state.newTodo)
      .then((res) => {
        api.getTodos()
          .then((res) => {
            var todos = res.rows.map(function (row) {
              return row.doc;
            });
            this.refs.inputText.value = '';
            this.setState({
              todos: todos,
              newTodo: ''
            });
          });
      });
  }
  handleSync() {
    api.startSync()
      .then(function(res) {
        console.log(res);
      });
  }
  render() {
    var lists = this.state.todos.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowContent}> {item.title} </Text>
          </View>
        </View>
      );
    });
    return (
      <View style={styles.mainContainer}>
        <TextInput
          ref='inputText'
          value={this.state.newTodo}
          onChange={this.handleTodoChange.bind(this)}
          style={styles.searchInput}/>
        <TouchableOpacity onPress={this.handleSave.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSync.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Sync</Text>
        </TouchableOpacity>
        <ScrollView style={styles.container}>
          {lists}
        </ScrollView>
      </View>
    );
  }
}

Home.propTypes = {
  lists: React.PropTypes.array.isRequired
};

module.exports = Home;