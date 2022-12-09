
const InventoryScreen = {

  render: () => {
    return `
    <div class = "inventory">
      <div class="inventory-content">
      <div class = "form-container">
      <form id = "inventory-form">
        <ul class = "form-items">
          <li>
            <h1>Inventory </h1>
          </li> 
           
          <li>
            <label for = "name">Name </label>
            <input type = "text" name ="name" id = "name">
          </li> 
          <li>
            <label for = "category">Product category </label>
            <input type = "text" name ="category" id = "category">
          </li>
          <li>
            <label for = "images">Images </label>
            <input type = "text" name ="imges" id = "images">
          </li> 
          <li>
            <label for = "price">Price </label>
            <input type = "number" name ="price" id = "price" min = 1500>
          </li> 
          <li>
            <label for = "brand">brand </label>
            <input type = "text" name ="brand" id = "brand">
          </li> 
          <li>
            <label for = "rating">Rating </label>
            <input type = "number" name ="rating" id = "rating" min="1" max = "5">
          </li> 
          <li>
            <label for = "num-reviews">Num of Reviews </label>
            <input type = "number" name ="num-reviews" id = "num-reviews" min="0">
          </li> 
          <li>
            <label for = "quantity">Quantity</label>
            <input type = "number" name ="quantity" id = "quantity" min="0">
          </li> 
        </ul>
      </form>
    </div>
      </div>

    </div>`
  }
}

export default InventoryScreen