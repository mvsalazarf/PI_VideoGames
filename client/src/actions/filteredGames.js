import { FILTERED_GAMES } from ".";

export default function filteredGames(payload) {
  return {
    type: FILTERED_GAMES,
    payload
  }
}