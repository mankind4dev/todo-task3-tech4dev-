document.addEventListener("DOMContentLoaded", () => {
  const itemForm = document.getElementById("item-form");
  const repository = document.getElementById("repository");

  // Retrieve items from localStorage or initialize an empty array
  let items = JSON.parse(localStorage.getItem("items")) || [];

  // Function to display items
  function displayItems() {
    repository.innerHTML = `<h1>To do Lists</h1>`; // Clear existing content

    items.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("repo-cover");
      itemDiv.innerHTML = `
              <img src="${item.picture}" alt="pic" />
              <p class="name">${item.name}</p>
                    
              <option> ${
                item.category === "car"
                  ? "Car"
                  : item.category === "bags"
                  ? "Bags"
                  : item.category === "other"
                  ? "others"
                  : ""
              }</option>
              <div class="icons">
                <i class="fa-solid fa-pencil" data-index="${index}"></i>
                <i class="fa-solid fa-trash" data-index="${index}"></i>
              </div>
            `;
      repository.appendChild(itemDiv);
    });
  }

  // Function to save items to localStorage
  function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
  }

  // Handle adding a new item
  itemForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const pictureInput = document.getElementById("picture");
    const nameInput = document.getElementById("name");
    const categoryInput = document.getElementById("category");

    if (pictureInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const newItem = {
          picture: e.target.result,
          name: nameInput.value,
          category: categoryInput.value,
        };

        items.push(newItem); // Add new item to items array
        saveItems(); // Save updated items array to localStorage
        displayItems(); // Refresh displayed items
        itemForm.reset(); // Clear form fields
      };
      reader.readAsDataURL(pictureInput.files[0]);
    }
  });

  // Handle edit and delete actions
  repository.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");

    if (e.target.classList.contains("fa-pencil")) {
      // Edit item
      const item = items[index];
      document.getElementById("name").value = item.name;
      document.getElementById("category").value = item.category;

      // Remove the item for editing
      items.splice(index, 1);
      saveItems();
      displayItems();
    } else if (e.target.classList.contains("fa-trash")) {
      // Delete item
      items.splice(index, 1); // Remove item from the array
      saveItems(); // Save updated items array to localStorage
      displayItems(); // Refresh displayed items
    }
  });

  // Initial display of items
  displayItems();
});
