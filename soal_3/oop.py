from typing import List

class Transaction:
    def __init__(self, transaction_type: str, amount: float, description: str = ""):
        self.transaction_type = transaction_type  # "Deposit", "Withdrawal", "Transfer"
        self.amount = amount
        self.description = description

    def __str__(self):
        return f"{self.transaction_type}: {self.amount} ({self.description})"

class Account:
    def __init__(self, account_number: str, owner_name: str, initial_balance: float = 0.0):
        self.account_number = account_number
        self.owner_name = owner_name
        self.__balance = initial_balance  # Enkapsulasi saldo
        self.transactions: List[Transaction] = []  # Riwayat transaksi

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.__balance += amount
        self.transactions.append(Transaction("Deposit", amount, "Deposit to account"))

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            raise ValueError("Insufficient balance.")
        self.__balance -= amount
        self.transactions.append(Transaction("Withdrawal", amount, "Withdraw from account"))

    def transfer(self, amount: float, recipient: 'Account'):
        if amount <= 0:
            raise ValueError("Transfer amount must be positive.")
        if amount > self.__balance:
            raise ValueError("Insufficient balance.")
        self.__balance -= amount
        recipient.deposit(amount)
        self.transactions.append(Transaction("Transfer", amount, f"Transfer to {recipient.account_number}"))
        recipient.transactions.append(Transaction("Transfer", amount, f"Transfer from {self.account_number}"))

    @property
    def balance(self):
        return self.__balance

    def print_statement(self):
        print(f"Account Statement for {self.account_number} ({self.owner_name}):")
        for transaction in self.transactions:
            print(transaction)
        print(f"Current Balance: {self.__balance}\n")


if __name__ == "__main__":
    account1 = Account("123456", "Alice", 1000.0)
    account2 = Account("654321", "Bob", 500.0)

    # Deposit account 1
    account1.deposit(500.0)

    # Withdraw account 1
    account1.withdraw(200.0)

    # Transfer from account 1 to account 2
    account1.transfer(300.0, account2)

    # Print Current Balance after transaction
    account1.print_statement()
    account2.print_statement()
