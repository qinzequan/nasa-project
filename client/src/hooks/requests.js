const API_URL = "http://127.0.0.1:8000/v1";

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  return await fetch(`${API_URL}/planets`).then((res) => res.json());
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  return await fetch(`${API_URL}/launches`).then((res) => res.json());
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  return fetch(`${API_URL}/launches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  });
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  return fetch(`${API_URL}/launches/${id}`, {
    method: "DELETE",
  }).catch((err) => ({ oK: false }));
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
