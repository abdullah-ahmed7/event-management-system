
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function getEvents(keyword = "") {
  if (!API_KEY) {
    throw new Error("Ticketmaster API key is missing.");
  }

  // Current UTC time without milliseconds
  const now = new Date().toISOString().split(".")[0] + "Z";

  // Build the request
  const params = new URLSearchParams({
    apikey: API_KEY,
    size: "20",
    sort: "date,asc",
    startDateTime: now,
  });

  if (keyword.trim()) {
    params.set("keyword", keyword.trim());
  }

  const response = await fetch(
    `${BASE_URL}/events.json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Ticketmaster API error: ${response.status}`
    );
  }

  const data = await response.json();

  return data._embedded?.events ?? [];
}
