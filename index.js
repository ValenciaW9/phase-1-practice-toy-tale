 
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      // Create a card for each toy and append it to the `toy-collection` div
    });
  });

  const createToyCard = (toy) => {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const name = document.createElement('h2');
    name.textContent = toy.name;
  
    const image = document.createElement('img');
    image.src = toy.image;
    image.classList.add('toy-avatar');
  
    const likes = document.createElement('p');
    likes.textContent = `${toy.likes} Likes`;
  
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    likeButton.id = toy.id;
    likeButton.textContent = 'Like ❤️';
  
    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(likes);
    card.appendChild(likeButton);
  
    // Append the card to the `toy-collection` div
  };
  const toyForm = document.querySelector('.add-toy-form');

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Extract the toy data from the form inputs
  
    const toyData = {
      name: // Get the name from the form input,
      image: // Get the image URL from the form input,
      likes: 0 // Set the initial number of likes to 0
    };
  
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toyData)
    })
    .then(response => response.json())
    .then(newToy => {
      const card = createToyCard(newToy);
      // Append the new card to the `toy-collection` div
    });
  });
  const toyCollection = document.querySelector('#toy-collection');

toyCollection.addEventListener('click', (event) => {
  if (event.target.classList.contains('like-btn')) {
    const toyId = event.target.id;
    const toyCard = event.target.closest('.card');
    const likesElement = toyCard.querySelector('p');

    // Calculate the new number of likes
    const currentLikes = parseInt(likesElement.textContent);
    const newLikes = currentLikes + 1;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
    .then(response => response.json())
    .then(updatedToy => {
      // Update the likes count in the DOM
      likesElement.textContent = `${updatedToy.likes} Likes`;
    });
  }
});


