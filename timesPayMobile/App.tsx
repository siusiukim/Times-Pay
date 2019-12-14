import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import {
  NativeRouter as Router,
  Switch,
  Route,
  Link,
  routerReducer
} from "react-router-native";
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import InitPage from './src/pages/InitPage';
import ExchangePage from './src/pages/ExchangePage';
import DepositPage from './src/pages/DepositPage';

import initReducer from './src/reducers/initReducer';
import exchangeReducer from './src/reducers/exchangeReducer';
import depositReducer from './src/reducers/depositReducer';

let store = createStore(combineReducers({
  initReducer,
  exchangeReducer,
  depositReducer
}));

// const AppNavigator = createStackNavigator({
//   Initial: {
//     screen: InitPage,
//   },
//   Exchange: {
//     screen: ExchangePage,
//   }
// })
const MaterialBottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Initial: {
      screen: InitPage,
    },
    Exchange: {
      screen: ExchangePage,
    },
    Deposit:{
      screen: DepositPage,
    }
  },
  {
    initialRouteName: 'Initial',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
)
let Navigation = createAppContainer(MaterialBottomTabNavigator);
const uiTheme = {
  palette: {
    primaryColor: COLOR.yellow50,
  },
  toolbar: {
    container: {
      height: 50
    }
  }
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={uiTheme}>
          <>
            {/* <BasicLayout> */}
              <Navigation />
            {/* </BasicLayout> */}
          </>
        </ThemeContext.Provider>
      </Provider>
    )
  }
}
export default App;

// const history = createMemoryHistory();
// interface AppState {
//   active: string,
// }
// class AppPages extends React.Component<{}, {}> {
//   constructor(props: any) {
//     super(props);
//
//   }
//   render() {
//     return (
//       <>
//         <View style={styles.scrollView}>
//           <Router history={history}>
//             <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#F5FCFF' }} />
//             <Switch>
//               <Route name="initial" initial={true} title="Initial" path="/">
//                 <InitPage />
//               </Route>
//             </Switch>
//           </Router>
//         </View>
//       </>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: COLOR.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: COLOR.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: COLOR.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: COLOR.black,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: COLOR.red600,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
//
// export default App;