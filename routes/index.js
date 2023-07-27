const authRouter = require('./AuthRouter');
const accountRouter = require('./AccountRouter');
const appointmentRouter = require('./AppointmentRouter');
const roomRouter = require('./RoomRouter');
const slotRouter = require('./SlotRouter');
const treatment_profileRouter = require('./Treatment_profileRouter');
const treatment_inRouter = require('./Treatment_InRouter');
const TransactionRouter = require('./TransactionRouter');
const admin = require('./admin');
const Amount = require('./amount');
const balance = require('./balance_detail');


function route(app) {
    app.use('/api/auth', authRouter);

    app.use('/api/account', accountRouter);

    app.use('/api/appointment', appointmentRouter);

    app.use('/api/room', roomRouter);

    app.use('/api/slot', slotRouter);

    app.use('/api/treatment_profile', treatment_profileRouter);

    app.use('/api/treatmentin', treatment_inRouter);
    app.use('/api/transaction', TransactionRouter);
    app.use('/api/amount', Amount);
    app.use('/api/balance', balance);

    // api for admin
    app.use('/api/admin', admin);
    
} 

module.exports = route;