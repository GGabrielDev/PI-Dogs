import axios from "axios";

const backendConnection = axios.create({
  baseURL: "http://localhost:3080/",
  timeout: 8000,
});

export async function getAllDogs(dummy) {
  return await backendConnection.get("/dogs", {
    params: { dummy },
  });
}

export async function getDogsByName(dummy, name = "") {
  return await backendConnection.get("/dogs", {
    params: { dummy, name },
  });
}

export async function getDogById(dummy, id, isLocal) {
  return await backendConnection.get(`/dogs/${id}`, {
    params: { dummy, isLocal },
  });
}

export async function postDog(dog) {
  return await backendConnection.post("/dogs", {
    data: dog,
  });
}

export async function getTemperaments() {
  return await backendConnection.get("/temperaments");
}
