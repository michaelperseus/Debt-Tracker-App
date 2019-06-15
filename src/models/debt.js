const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    minimumPayment: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Number,
        required: true
    },
    startingBalance: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: false,
        default: 0
    },
    autopay: {
        type: Boolean,
        required: true
    },
    accountFrom: {
        type: String,
        required: false
    },
    
}, {
    timestamps: true
})

const Debt = mongoose.model('Debt', debtSchema);

module.exports = Debt;