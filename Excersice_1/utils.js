// utils.js
import { baseUrl } from './variables.js';

export const fetchData = async (url) => {
  const result = await fetch(`${baseUrl}/${url}`);
  return await result.json();
};
