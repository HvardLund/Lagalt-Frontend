import keycloak from "../keycloak";

const apiURL = 'https://lagalt-bckend.azurewebsites.net/api/users'
const apiURLWithUser = keycloak.tokenParsed? apiURL + keycloak.tokenParsed.sub: null

export const checkForUser = async () => {
  try{
      const response = await fetch(apiURLWithUser, {
          headers: {Authorization: `Bearer ${keycloak.token}`}
      }
      )
      if(!response.ok){
          throw new Error('Could not load projects')
      }
      const data = await response.json()
      console.log(data);
  }
  catch(error){
      console.log([error.message,[]])
  }
}

const createUser = async () => {
  await fetch(apiURL, {
      method: 'POST',
      headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
          "id": `${keycloak.tokenParsed.sub}`,
          "description": 'Jeg er kul', 
      })
  }).then(resp => {
      if (!resp.ok) {
          alert('user was not created properly, try reloading the page')
          throw new Error(resp.status);
      }
      console.log(resp);
  }).catch(error => {
      alert('user was not created properly, try reloading the page')
      console.log(error);
  });
}