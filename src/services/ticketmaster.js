
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

function getStartDateTime() {
  return new Date().toISOString().split(".")[0] + "Z";
}

async function requestEvents(endpoint, filters = {}) {
  if (!API_KEY) {
    throw new Error("Ticketmaster API key is missing.");
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    ...filters,
  });

  const response = await fetch(
    `${BASE_URL}/${endpoint}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Ticketmaster API error: ${response.status}`);
  }

  return response.json();
}

export async function getEvents(
  keyword = "",
  category = "",
  city = ""
) {
  const filters = {
    size: "20",
    sort: "date,asc",
    startDateTime: getStartDateTime(),
  };

  if (keyword.trim()) {
    filters.keyword = keyword.trim();
  }

  if (category) {
    filters.classificationName = category;
  }

  if (city.trim()) {
    filters.city = city.trim();
  }

  const data = await requestEvents("events.json", filters);

  return data._embedded?.events ?? [];
}

export async function getEventById(id) {
  return requestEvents(
    `events/${encodeURIComponent(id)}.json`
  );
}
