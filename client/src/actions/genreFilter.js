import { GENRE_FILTER } from ".";

export default function genreFilter(payload) {
  return {
    type: GENRE_FILTER,
    payload
  }
}