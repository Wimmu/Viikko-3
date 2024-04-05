import { restaurantModal, restaurantRow } from './components.js';
import { fetchData } from './utils.js';

const fetchRestaurants = async () =>
  await fetchData('restaurants');

const fetchDailyMenu = async (id) =>
  await fetchData(`restaurants/daily/${id}/fi`);

const sortRestaurants = (restaurants) =>
  restaurants.sort((a, b) => a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase()));

const createTable = (restaurants) => {
  const tableNode = document.getElementById('restaurant-list');
  const dialogNode = document.getElementById('dialog');

  restaurants.forEach((restaurant) => {
    const tr = restaurantRow(restaurant);
    tableNode.appendChild(tr);

    tr.addEventListener('click', async () => {
      const menu = await fetchDailyMenu(restaurant._id);
      dialogNode.innerHTML = restaurantModal(restaurant, menu);
      dialogNode.showModal();
    });
  });
};

const buildWebsite = async () => {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);
  sortRestaurants(restaurants);
  createTable(restaurants);
};

buildWebsite();
