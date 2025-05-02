const cron = require('node-cron');
const LandingUser = require('../models/LandingUser');

function startMissedTicketsJob() {
  cron.schedule('0 * * * *', async () => {
    console.log('Checking for tickets with no staff response in 10 hours...');

    const tenHoursAgo = new Date(Date.now() - 10 * 60 * 60 * 1000);

    try {
      const tickets = await LandingUser.find({
        status: 'open',
        createdAt: { $lte: tenHoursAgo },
        messages: {
          $not: {
            $elemMatch: { sender: { $in: ['admin', 'member'] } }
          }
        }
      });

      for (const ticket of tickets) {
        ticket.status = 'missed';
        await ticket.save();
        console.log(`Marked ticket ${ticket.ticketNumber} as missed`);
      }
    } catch (err) {
      console.error('Error updating missed tickets:', err.message);
    }
  });
}

module.exports = startMissedTicketsJob;
