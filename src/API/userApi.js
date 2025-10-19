import userEvent from "@testing-library/user-event";
import { Form } from "react-router-dom";  

export const login = async (credentials) => {

  const response = await fetch ('http://localhost:8080/user/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if(!response.ok || !data.userID){
     throw new Error('Login failed');
  }

  localStorage.setItem('userID', data.userID);
  getUser();
};

export const SignUp =  async (credentials)=>{

   const response = await fetch ('http://localhost:8080/user/signup',{
     method: "POST",
     headers: {'Content-Type' : 'application/json'},
     body: JSON.stringify(credentials)
   });

    if(!response.ok){
      throw new Error('Signup failed');
    }

    const data = await response.json();

    localStorage.setItem('userID', data.userID);
    getUser();
}

export const getUser = async () =>{

  const userID = localStorage.getItem('userID');
  if(!userID) return; 

  const response = await fetch (`http://localhost:8080/user/getUser/${userID}`);

  if(!response.ok){
    throw new Error('Fetching user data failed');
  }

  const data = await response.json();
  
  //converts image from bytes to base 64
  if (data.profileImage) {
    if (data.profileImage.data) {
      const bytes = data.profileImage.data;
      const base64String = btoa(new Uint8Array(bytes).reduce((acc, byte) => acc + String.fromCharCode(byte), ""));
      data.profileImage = `data:image/jpeg;base64,${base64String}`;
    } else if (typeof data.profileImage === "string") {
      data.profileImage = `data:image/jpeg;base64,${data.profileImage}`;
    }
  }

  localStorage.setItem('profileImage', data.profileImage || "");
  return data;
}

export const update = async (FormData) =>{

  const response = await fetch ('http://localhost:8080/user/update',{
    mathod: 'PUT',
    body: FormData
  });

  if(!response.ok){
    throw new Error('Update failed');
  }

  const data = await response.json();

  return data;
}

