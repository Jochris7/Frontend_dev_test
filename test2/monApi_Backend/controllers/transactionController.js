const Transaction = require('../models/Transaction');

// GET all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction non trouvée' });
    }
    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE transaction
exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Transaction créée',
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction non trouvée' });
    }

    res.json({
      success: true,
      message: 'Transaction mise à jour',
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction non trouvée' });
    }
    res.json({ success: true, message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// STATS
exports.getStats = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const totalCredit = transactions
      .filter(t => t.type === 'Credit')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalDebit = transactions
      .filter(t => t.type === 'Debit')
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({
      success: true,
      data: {
        totalCredit,
        totalDebit,
        balance: totalCredit - totalDebit + 95150,
        transactionCount: transactions.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
