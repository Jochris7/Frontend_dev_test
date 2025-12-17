const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

router.get('/transactions', controller.getTransactions);
router.get('/transactions/:id', controller.getTransactionById);
router.post('/transactions', controller.createTransaction);
router.put('/transactions/:id', controller.updateTransaction);
router.delete('/transactions/:id', controller.deleteTransaction);

router.get('/stats', controller.getStats);

module.exports = router;
