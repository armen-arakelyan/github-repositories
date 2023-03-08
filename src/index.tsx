import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './helpers'
import App from "./App";
import store from "./redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
     <App />
    </ApolloProvider>
  </Provider>
);
