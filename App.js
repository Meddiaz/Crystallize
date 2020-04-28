import React from 'react';
import Bears from './bears';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


const client = new ApolloClient({
  uri: 'https://api.crystallize.com/teddy-bear-shop/catalogue',
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">

        <Bears/>
        
      </div>
    </ApolloProvider>
  );
}

export default App;
