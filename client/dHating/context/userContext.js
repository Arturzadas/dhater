import React from "react"
import { Provider } from "react"

export default React.createContext({
  userData: {}
})

// import React from 'react';

// // Declaring the state object globally.
// const user = {
  
// };

// const counterContextWrapper = (component) => ({
//   setUser: () => {
//     component.setState({user})
//   }
// });

// // const Context = ReturnType<typeof counterContextWrapper>;

// export const CounterContext = React.createContext(counterContextWrapper());

// const State = {
//   context
// }

// export class CounterContextProvider extends React.Component {
//   state = {
//     context: counterContextWrapper(this),
//   };

//   render() {
//     return (
//       <CounterContext.Provider value={this.state.context}>
//         {this.props.children}
//       </CounterContext.Provider>
//     );
//   }
// }