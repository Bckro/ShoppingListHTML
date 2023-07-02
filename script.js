const sampleProducts = [
  { name: 'Apple', price: 1.99 },
  { name: 'Banana', price: 0.99 },
  { name: 'Orange', price: 1.49 },
  { name: 'Mango', price: 2.99 },
  { name: 'Strawberry', price: 2.49 },
  { name: 'Grapes', price: 3.99 },
  { name: 'Pineapple', price: 4.49 },
  { name: 'Watermelon', price: 5.99 },
  { name: 'Blueberries', price: 3.49 },
  { name: 'Peach', price: 2.79 },
];

// Funkcja inicjalizująca
function initialize() {
  // Pobranie referencji do elementów DOM
  const productSelect = document.getElementById('product-select');
  const quantityInput = document.getElementById('quantity');
  const addButton = document.getElementById('add-button');
  const shoppingList = document.getElementById('shopping-list');
  const totalElement = document.getElementById('total');
  const resetButton = document.getElementById('reset-button');

  let total = 0; // Suma początkowa

  // Wypełnienie listy rozwijanej produktami
  sampleProducts.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
    productSelect.appendChild(option);
  });

  // Obsługa kliknięcia przycisku "Add to List"
  addButton.addEventListener('click', () => {
    const selectedProduct = productSelect.value;
    const quantity = parseInt(quantityInput.value);

    if (selectedProduct && quantity > 0) {
      const product = sampleProducts.find((p) => p.name === selectedProduct);

      if (product) {
        const item = createListItem(product, quantity);
        shoppingList.appendChild(item);
        total += product.price * quantity; // Dodanie ceny produktu do sumy
        totalElement.textContent = `Total: $${total.toFixed(2)}`; // Aktualizacja sumy
        clearForm();
        resetButton.style.display = 'block'; // Wyświetl przycisk resetu po dodaniu przedmiotu
      }
    }
  });

  // Funkcja tworząca element listy dla danego produktu i ilości
  function createListItem(product, quantity) {
    const item = document.createElement('li');
    item.className = 'item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        total -= product.price * quantity; // Odjęcie ceny produktu od sumy
        label.classList.add('strikethrough'); // Przekreślenie nazwy produktu
      } else {
        total += product.price * quantity; // Dodanie ceny produktu do sumy
        label.classList.remove('strikethrough'); // Usunięcie przekreślenia nazwy produktu
      }
      totalElement.textContent = `Total: $${total.toFixed(2)}`; // Aktualizacja sumy
    });

    const label = document.createElement('label');
    label.textContent = product.name;

    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity';
    quantitySpan.textContent = `Quantity: ${quantity}`;

    const priceSpan = document.createElement('span');
    priceSpan.className = 'price';
    priceSpan.textContent = `Price: $${(product.price * quantity).toFixed(2)}`;

    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newQuantity = parseInt(prompt('Enter new quantity:', quantity));
      if (!isNaN(newQuantity) && newQuantity > 0) {
        total -= product.price * quantity; // Odjęcie starej ceny produktu od sumy
        quantity = newQuantity;
        quantitySpan.textContent = `Quantity: ${quantity}`;
        priceSpan.textContent = `Price: $${(product.price * quantity).toFixed(2)}`;
        total += product.price * quantity; // Dodanie nowej ceny produktu do sumy
        totalElement.textContent = `Total: $${total.toFixed(2)}`; // Aktualizacja sumy
      }
    });

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      total -= product.price * quantity; // Odjęcie ceny produktu od sumy
      item.remove();
      totalElement.textContent = `Total: $${total.toFixed(2)}`; // Aktualizacja sumy
      if (shoppingList.children.length === 0) {
        resetButton.style.display = 'none'; // Ukryj przycisk resetu, gdy lista jest pusta
      }
    });

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(quantitySpan);
    item.appendChild(priceSpan);
    item.appendChild(editButton);
    item.appendChild(removeButton);

    return item;
  }

  // Funkcja czyszcząca formularz
  function clearForm() {
    productSelect.selectedIndex = 0;
    quantityInput.value = '';
  }

  resetButton.addEventListener('click', () => {
    shoppingList.innerHTML = ''; // Usunięcie wszystkich elementów z listy
    total = 0; // Wyzerowanie sumy
    totalElement.textContent = 'Total: $0.00'; // Zaktualizowanie sumy
    resetButton.style.display = 'none'; // Ukryj przycisk resetu po zresetowaniu listy
  });
}

// Inicjalizacja po załadowaniu strony
window.addEventListener('load', initialize);
