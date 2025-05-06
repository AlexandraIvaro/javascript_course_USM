let transactions = [];
let idGenerator = 1;
let totalAmount = 0;

/**
 * @description class-template for transaction object
 * @constructor
 * @param {number} id - transaction id
 * @param {string} date - transaction date
 * @param {number} amount - transaction amount
 * @param {string} category - transaction category
 * @param {string} description - transaction description
 */
class Transaction {
    constructor (id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }
}

/**
   * @description calculate total trasaction amount method
   * and post the result in the HTML document
   */
function calculateTotalAmount() {
    totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById("totalAmount").textContent = totalAmount;
}

calculateTotalAmount();

/**
   * @description function to wait for Submit button to be clicked
   * and get the appropriate values from the HTML document
   * validation for all fields to be populated included
   * validation for amount numeric value included
   * after Submit button is clicked all form fields are cleared
   */
document.getElementById("transaction_submit").addEventListener("click", function() {
    const amount = Number(document.getElementById("transaction_amount").value);
    const description = document.getElementById("transaction_description").value;
    const date = document.getElementById("transaction_date").value;
    const category = document.getElementById("transaction_category").value;

    if (date == "" || amount == "" || category == "" || description == "") {
        alert("All fields must be filled out!");
        return false;
      } else if (isNaN(amount)) {
        alert("Amount must be a numeric value!");
        return false;
      }


    addTransaction(amount, description, date, category);

    document.getElementById("transaction_amount").value = "";
    document.getElementById("transaction_description").value = "";
    document.getElementById("transaction_date").value = "";
    document.getElementById("transaction_category").value = "";

 
});

/**
   * @description add new Transaction from the HTML form to object array method
   * creation of a new row in the HTML document with added Transaction information included
   * color coding of the row based on the transaction category included
   * population of the Transaction Details section with added transaction information included
   * recalculation on total amount included
    * @param {string} date - transaction date
    * @param {number} amount - transaction amount
    * @param {string} category - transaction category
    * @param {string} description - transaction description
   */
function addTransaction (amount, description, date, category) {
    const id = idGenerator;
    idGenerator = idGenerator + 1;

    const addedTransaction = new Transaction(id, date, amount, category, description);
    transactions.push(addedTransaction);


    const row = document.createElement("tr");
    const cellId = document.createElement("td");
    const cellDate = document.createElement("td");
    const cellCategory = document.createElement("td");
    const cellDescription = document.createElement("td");
    const cellAction = document.createElement("td");


    cellId.textContent = addedTransaction.id;
    row.appendChild(cellId);
    cellDate.textContent = addedTransaction.date;
    row.appendChild(cellDate);
    cellCategory.textContent = addedTransaction.category;
    row.appendChild(cellCategory);
    cellDescription.textContent = addedTransaction.description;
    row.appendChild(cellDescription);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    cellAction.appendChild(deleteButton);
    row.appendChild(cellAction);

    if (category === "Expenses") {
        row.style.backgroundColor = "red";
        row.style.border = 'solid 1px black';
    } else {
        row.style.backgroundColor = "green";
        row.style.border = 'solid 1px black';
    }

    document.getElementById("details_id").textContent = addedTransaction.id;
    document.getElementById("details_date").textContent = addedTransaction.date;
    document.getElementById("details_amount").textContent = addedTransaction.amount;
    document.getElementById("details_category").textContent = addedTransaction.category;
    document.getElementById("details_description").textContent = addedTransaction.description;

    deleteButton.addEventListener("click", deleteTransaction);

    document.getElementById("transactions_table").appendChild(row);


    calculateTotalAmount();

}



/**
   * @description delete transaction after Delete button is clicked function
   * deletes transaction object from array as well as entire transaction information row from HTML document
   * after Delete button is clicked all Transaction Details fields are cleared
   * recalculation on total amount included
   */
function deleteTransaction() {
    const row = this.closest("tr");
    const transactionID = row.querySelector("td").textContent;
    row.remove();
    transactions = transactions.filter(t => t.id !== Number(transactionID));
    document.getElementById("details_id").textContent = "";
    document.getElementById("details_date").textContent = "";
    document.getElementById("details_amount").textContent = "";
    document.getElementById("details_category").textContent = "";
    document.getElementById("details_description").textContent = "";
    calculateTotalAmount();
}

