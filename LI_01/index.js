/**
 * @description class-template for transaction object
 * @constructor
 * @param {string} transaction_id - transaction id
 * @param {string} transaction_date - transaction date
 * @param {number} transaction_amount - transaction amount
 * @param {string} transaction_type - transaction type
 * @param {string} transaction_description - transaction description
 * @param {string} merchant_name - merchant name
 * @param {string} card_type - card type
 * @returns {string} transactionAsString - transaction in string format
 */
class Transaction {
  constructor({
    transaction_id,
    transaction_date,
    transaction_amount,
    transaction_type,
    transaction_description,
    merchant_name,
    card_type
  }) {
    this.transaction_id = transaction_id;
    this.transaction_date = transaction_date;
    this.transaction_amount = transaction_amount;
    this.transaction_type = transaction_type;
    this.transaction_description = transaction_description;
    this.merchant_name = merchant_name;
    this.card_type = card_type;
  }
  string() {
    let transactionAsString = JSON.stringify(this);
    return transactionAsString;
  }
}




/**
 * @description transaction analyzer class
 */
class TransactionAnalyzer {

  /**
   * @description transaction analyzer constructor
   * @constructor
   * @param {Array<Object>} transactions - transaction objects array
   */
    constructor(transactions) {
      this.transactions = transactions.map(transaction => new Transaction(transaction));
    }

  /**
   * @description add new transction method
   * @param {Object} newTransaction - new transaction object
   */
    addTransaction(newTransaction) {
      this.transactions.push(new Transaction(newTransaction));
    }

  /**
   * @descriiption get all transactions method
   * @returns {string} allTransactionsString - all transactions in string format
   */
    getAllTransaction() {
      let allTransactionsString = this.transactions.map(transaction => transaction.string()).join('\n');
      return allTransactionsString;
    }

  /**
   * @description get distinct transaction types array method
   * @returns {Array<string>} uniqueTypeTransactions - distinct transaction types in array
   */
    getUniqueTransactionType(){
      const allTypeTransactions = this.transactions.map(transaction => transaction.transaction_type);
      const uniqueTypeTransactions = [...new Set(allTypeTransactions)];
      return uniqueTypeTransactions;
    }

  /**
   * @description calculate total trasaction amount method
   * @returns {number} totalTransactionAmount - total amount of all transactions as number
   */
    calculateTotalAmount(){
      let totalTransactionAmount = this.transactions.reduce((total, transaction) => total + Number(transaction.transaction_amount), 0);
      return totalTransactionAmount;
    }

  /**
   * @description calculate total trasaction amount by given year/month/day method
   * @param {number} year - transaction year
   * @param {number} month - transaction moth
   * @param {number} day - transaction day
   * @returns {number} totalTransactionAmountByDate - total transaction amount by date as number
   */
    calculateTotalAmountByDate(year, month, day){
      const FilteredTransactions = this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        const yearMatches = year ? transactionDate.getFullYear() === year : true;
        const monthMatches = month ? transactionDate.getMonth() + 1 === month : true;
        const dayMatches = day ? transactionDate.getDate() === day : true;
        return yearMatches && monthMatches && dayMatches;
      });
      let totalTransactionAmountByDate = FilteredTransactions.reduce((total, transaction) => total + Number(transaction.transaction_amount), 0);
      return totalTransactionAmountByDate;
    }

  /**
   * @description get transaction by type method
   * @param {string} type - transaction type
   * @returns {string} transactionByTypeString - transactions by type as string
   */
    getTransactionByType(type){
      const transactionsByType = this.transactions.filter(transaction => transaction.transaction_type === type);
      let transactionByTypeString = transactionsByType.map(transaction => transaction.string()).join('\n');
      return transactionByTypeString;
    }

  /**
   * @description get transactions in given date range method
   * @param {string} startDate - start date
   * @param {string} endDate - end date
   * @returns {string} transactionsInDateRange - transactions in date range as string
   */
    getTransactionsInDateRange(startDate, endDate){
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filteredTransactions = this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate >= start && transactionDate <= end;
      });
      let transactionsInDateRange = filteredTransactions.map(transaction => transaction.string()).join('\n');
      return transactionsInDateRange;
    }

  /**
   * @description get transaction by merchant method
   * @param {string} merchantName - merchant name
   * @returns {string} transactionByMerchantString - transactions by merchant as string
   */
    getTransactionsByMerchant(merchantName){
      const transactionByMerchant = this.transactions.filter(transaction => transaction.merchant_name === merchantName);
      let transactionByMerchantString = transactionByMerchant.map(transaction => transaction.string()).join('\n');
      return transactionByMerchantString;
    }

  /**
   * @description calculate average transaction amount method
   * @returns {number} averageTransactionAmount - average transaction amount as number
   */
    calculateAverageTransactionAmount(){
      const totalAmount = this.calculateTotalAmount();
      let averageTransactionAmount = Math.round(totalAmount / this.transactions.length);
      return averageTransactionAmount;
    }

  /**
   * @description get transactions in given amount range method
   * @param {number} minAmount - min amount
   * @param {number} maxAmount - max amount
   * @returns {Array<string, number>} [transactionString, totalAmount] - transactions as string and total transactions amount as number
   */
    getTransactionsByAmountRange(minAmount, maxAmount){
      const filteredTransactions = this.transactions.filter(transaction => {
        const transactionAmount = Number(transaction.transaction_amount);
        return transactionAmount >= minAmount && transactionAmount <= maxAmount;
      });
      const transactionString = filteredTransactions.map(transaction => transaction.strig()).join('\n');
      const totalAmount = filteredTransactions.reduce((total, transaction) => total + Number(transaction.transaction_amount), 0);
      return [transactionString, totalAmount];
    }

  /**
   * @description calculate total amount of debit transactions method
   * @returns {number} totalDebitAmount - total amount of debit transactions as number
   */
    calculateTotalDebitAmount(){
      const totalDebitTransaction = this.transactions.filter(transaction => transaction.transaction_type === 'debit');
      const totalDebitAmount = totalDebitTransaction.reduce((total, transaction) => total + Number(transaction.transaction_amount), 0);
      return totalDebitAmount;
    }

  /**
   * @description find month with max transactions method
   * @returns {string} mostTransactionsMonth - month with max transactions as string
   */
    findMostTransactionsMonth(){
      let monthlyRevenue = 0;
      let mostTransactionsMonth = 0;
      const revenueByMonth = this.transactions.reduce((acc, transaction) => {
        const transactionDate = new Date(transaction.transaction_date);
        const transactionMonth = transactionDate.getMonth() + 1;
        if (!acc[transactionMonth]) {
          acc[transactionMonth] = 0;
        }
        acc[transactionMonth] += transaction.transaction_amount;
        return acc;
      }, {});

      for (let month = 1; month <= 12; month++){
        const revenue = revenueByMonth[month] || 0;
        if (revenue > monthlyRevenue) {
          monthlyRevenue = revenue;
          mostTransactionsMonth = month;
        }
      }
      return mostTransactionsMonth;
    }

  /**
   * @description find month with max debit type transactions method
   * @returns {string} monthWithMostDebit - month with max debit type transactions as string
   */
    findMostDebitTransactionMonth(){
      let maxDebitCount = 0;
      let monthWithMostDebit = 0;
      const transactionCountByMonth = this.transactions.reduce((acc, transaction) => {
        const transactionMonth = new Date(transaction.transaction_date).getMonth() + 1;
        if (transaction.transaction_type === 'debit') {
          acc[transactionMonth] = (acc[transactionMonth] || 0) + 1;
        }
        return acc;
      }, {});
      for (let month = 1; month <= 12; month++){
        const currentCount = transactionCountByMonth[month] || 0;
        if (currentCount > maxDebitCount) {
          maxDebitCount = currentCount;
          monthWithMostDebit = month;
        }
      }
      return monthWithMostDebit;
    }

  /**
   * @description find transaction type with max number of transactions occured method
   * @returns {string} debit OR credit OR equal - transaction type with max number of transactions as string
   */
    mostTransactionTypes(){
      let creditTransactions = 0;
      let debitTransactions = 0;
      let equalTransactions = 0;
      for (const transaction of this.transactions) {
        if (transaction.transaction_type === 'credit') {
          creditTransactions++;
        } else if (transaction.transaction_type === 'debit') {
          debitTransactions++;
        } else if (transaction.transaction_type === 'equal') {
          equalTransactions++;
        }
      }
      if (debitTransactions > creditTransactions && debitTransactions > equalTransactions) {
        return 'debit';
      } else if (creditTransactions > debitTransactions && creditTransactions > equalTransactions) {
        return 'credit';
      } else {
        return 'equal';
      }
    }

  /**
   * @description get transactions occured before given date method
   * @param {string} date - date
   * @returns {string} transactionsBeforeDateString - transactions before given date as string
   */
    getTransactionsBeforeDate(date) {
      const dateByMethod = new Date(date);
      const filteredTransactions = this.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate < dateByMethod;
      });
      let transactionsBeforeDateString = filteredTransactions.map(transaction => transaction.string()).join('\n');
      return transactionsBeforeDateString;
    }

  /**
   * @description find transaction by id method
   * @param {string} id - transaction id
   * @returns {string} transactionByIdString - transaction by id as string
   */
    findTransactionById(id) {
      let transactionByIdString = this.transactions.find(transaction => transaction.transaction_id === id).string();
      return transactionByIdString;
    }

  /**
   * @description get transaction descriptions method
   * @returns {Array<string>} transactionDescriptionsArray - transaction descriptions as array
   */
    mapTransactionDescriptions() {
      const transactionDescriptionsArray = this.transactions.map(transaction => transaction.transaction_description);
      return transactionDescriptionsArray;
    }
  }

  /**
   * @description import array of transaction objects from JSON file
   */
  const transactionsArray = require('C:/Users/37379/OneDrive/Desktop/University/JS/LI1/transaction.json');

  /**
   * @description TransactionAnalyzer class instance with transactionsArray as parameter
   */
  const transactionsAnalysis = new TransactionAnalyzer(transactionsArray);