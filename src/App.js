import logo from './logo.svg';
import './App.css';

import { useQuery, gql, useSubscription } from '@apollo/client';

const GET_DATA_ALL = gql`
      query MyQuery {
        jupiter_all {
          owner
          pubkey
          slot
        }
      }
`;

const GET_DATA_VARIABLE = gql`
      query MyQuery($pubkey: String!) {
        jupiter_all(where: {pubkey: {_eq: $pubkey}}) {
          owner
          pubkey
          slot
        }
      }
`;

const GET_SUBSCRIPTION_DATA = gql`
      subscription getAllPostsOfAProfile($cl_pubkey: String!) {
        wordcel_0_1_1_decoded_profile(
          where: {cl_pubkey: {_eq: $cl_pubkey}}
        ) {
          authority
          cl_pubkey
          posts_inside_profile {
            cl_pubkey
            metadatauri
          }
        }
      }
`;





function DisplayAllData() {
  const { loading, error, data } = useQuery(GET_DATA_ALL);

  // const { loading, error, data } = useQuery(GET_DATA_ALL, {
  //   variables: {pubkey:"DuNWE6rE8sAQJMcjAy5KeCBMRjEHpKThyyZ8sPmhbxYF"}
  // });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  //return "<p>" + String(data.jupiter_all) + "</p>";
  const len = data.jupiter_all.length;
  return data.jupiter_all.map(({ owner, pubkey, slot }) => (
    <div key={slot}>
      <h3>No of items {len} Owner: {owner}</h3>      
      <br />
      <b>pubkey:</b>
      <p>{pubkey}</p>
      <br />
      <b>slot:</b>
      <p>{slot}</p>
    </div>
  ));
}

function DisplayVariableData() {
  
  const { loading, error, data } = useQuery(GET_DATA_VARIABLE, {
    variables: {pubkey:"DuNWE6rE8sAQJMcjAy5KeCBMRjEHpKThyyZ8sPmhbxYF"}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  //return "<p>" + String(data.jupiter_all) + "</p>";
  const len = data.jupiter_all.length;
  return data.jupiter_all.map(({ owner, pubkey, slot }) => (
    <div key={slot}>
      <h3>No of items {len} Owner: {owner}</h3>            
      <br />
      <b>pubkey:</b>
      <p>{pubkey}</p>
      <br />
      <b>slot:</b>
      <p>{slot}</p>
    </div>
  ));
}

function DisplaySubscriptionData() {
  
  const { loading, error, data } = useSubscription(GET_SUBSCRIPTION_DATA, {
    variables: {cl_pubkey:"9TcgsKZBUgQAdwMC2XtJE5TWdtssg9KmbHiL6X72GRhh"}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({error}</p>;
    

   console.log(data)
  // return "<p>" + String(data) + "</p>";
  // const len = 10
  const len = data.wordcel_0_1_1_decoded_profile[0].posts_inside_profile.length;
  return data.wordcel_0_1_1_decoded_profile[0].posts_inside_profile.map(({ cl_pubkey, metadatauri }) => (
    <div >

      <h3>No of items {len}</h3>      
      <br />
      <b>cl_pubkey:</b>
      <p>{cl_pubkey}</p>
      <br />
      <b>metadatauri:</b>
      <p>{metadatauri}</p>
    </div>
  ));
}



function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br>
      </br>
      {/* <DisplayAllData /> */}
      {/* <DisplayVariableData/> */}
      <DisplaySubscriptionData />
    </div>
  );
}

export default App;
