import keycloak from "../keycloak";

//check if user already exists in the database, if not create a new user
export const checkForUser = async (token) => {
  try{
      const response = await fetch(`https://lagalt-bckend.azurewebsites.net/api/users/${token}`, {
          headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'}
      }
      )
      if(response.status === 404){
          createUser()
      }
      else if(!response.ok){
          throw new Error('User could not be created')
      }
      const data = await response.json()
      console.log(data);
  }
  catch(error){
      console.log([error.message,[]])
  }
}

//method for creating a new user in the backend
const createUser = async () => {
  await fetch('https://lagalt-bckend.azurewebsites.net/api/users/', {
      method: 'POST',
      headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
          "id": `${keycloak.tokenParsed.sub}`,
          "userName": `${keycloak.tokenParsed.preferred_username}`,
          "description": 'Write something about yourself', 
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