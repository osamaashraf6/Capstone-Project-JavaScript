import './style.css';
import Api from './modules/api_class.js';
import RENDER from './modules/render.js';
import ApiLikes from './modules/api_likes_class.js';

window.addEventListener('load', async () => {
  const LIKES = await ApiLikes.getLikes();
  const MEALS = await Api.getAllMeals();
  const newMeals = MEALS.map((meal) => {
    const likesArr = LIKES.filter((like) => like.item_id === meal.id);
    meal.changeLikes = likesArr.length && likesArr[0].likes;
    return meal;
  });
  RENDER(newMeals);

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-icon')) {
      if (event.target.src.includes('heart-line')) {
        event.target.src = './assets/img/heart-fill.png';
        ApiLikes.postLikes(event.target.id);
        newMeals.forEach((meal) => {
          if (meal.id === event.target.id) {
            const counterLikes = event.target.nextElementSibling;
            counterLikes.innerHTML = `${meal.likes + 1} likes`;
          }
        });
      } else {
        event.target.src = './assets/img/heart-line.png';
        newMeals.forEach((meal) => {
          if (meal.id === event.target.id) {
            const counterLikes = event.target.nextElementSibling;
            counterLikes.innerHTML = `${meal.likes} likes`;
          }
        });
      }
    }
  });
});