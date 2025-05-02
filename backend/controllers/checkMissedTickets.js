const LandingUser = require('../models/LandingUser');

const checkMissedTickets = async (req, res) => {
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

    const updated = [];

    for (const ticket of tickets) {
      ticket.status = 'missed';
      await ticket.save();
      updated.push(ticket.ticketNumber);
    }

    res.json({ message: `Marked ${updated.length} tickets as missed`, tickets: updated });
  } catch (err) {
    console.error('Error manually checking missed tickets:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

console.log(' checkMissedTickets controller loaded');

const getWeeklyMissedChats = async (req, res) => {
  try {
    const ticketStats = await LandingUser.aggregate([
      {
        $addFields: {
          year: { $year: '$createdAt' },
          week: { $isoWeek: '$createdAt' },
        },
      },
      {
        $group: {
          _id: { year: '$year', week: '$week' },
          totalTickets: { $sum: 1 },
          missedTickets: {
            $sum: {
              $cond: [{ $eq: ['$status', 'missed'] }, 1, 0],
            },
          },
          resolvedTickets: {
            $sum: {
              $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0],
            },
          },


          totalReplyTime: {
            $sum: {
              $cond: [
                { $gt: [{ $size: '$messages' }, 0] },
                { $subtract: [{ $arrayElemAt: ['$messages.timestamp', 0] }, '$createdAt'] },
                0,
              ],
            },
          },
          replyCount: {
            $sum: {
              $cond: [{ $gt: [{ $size: '$messages' }, 0] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          totalTickets: 1,
          missedTickets: 1,
          resolvedTickets: 1,
          resolvedPercentage: {
            $cond: [
              { $eq: ['$totalTickets', 0] },
              0,
              { $multiply: [{ $divide: ['$resolvedTickets', '$totalTickets'] }, 100] },
            ],
          },
          avgReplyTime: {
            $cond: [
              { $eq: ['$replyCount', 0] },
              0,
              { $divide: ['$totalReplyTime', '$replyCount'] },
            ],
          },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.week': 1 },
      },
    ]);

    res.json(ticketStats);
  if (ticketStats.length === 0) {
  return res.status(200).json({ message: 'No data found', data: [] });
}


  } catch (err) {
    console.error('Error getting weekly ticket stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//  get daily missed chats count
const getDailyMissedChats = async (req, res) => {
  try {
    const ticketStats = await LandingUser.aggregate([
      {
        $match: {
          createdAt: { $ne: null },
        },
      },
      {
        $addFields: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' },
        },
      },
      {
        $group: {
          _id: { year: '$year', month: '$month', day: '$day' },
          totalTickets: { $sum: 1 },
          missedTickets: {
            $sum: {
              $cond: [{ $eq: ['$status', 'missed'] }, 1, 0],
            },
          },
          resolvedTickets: {
            $sum: {
              $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0],
            },
          },
          totalReplyTime: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $isArray: '$messages' },
                    { $gt: [{ $size: '$messages' }, 0] },
                  ],
                },
                {
                  $subtract: [
                    { $first: '$messages.timestamp' }, // Adjust this if needed
                    '$createdAt',
                  ],
                },
                0,
              ],
            },
          },
          replyCount: {
            $sum: {
              $cond: [
                { $gt: [{ $size: '$messages' }, 0] },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          totalTickets: 1,
          missedTickets: 1,
          resolvedTickets: 1,
          resolvedPercentage: {
            $cond: [
              { $eq: ['$totalTickets', 0] },
              0,
              { $multiply: [{ $divide: ['$resolvedTickets', '$totalTickets'] }, 100] },
            ],
          },
          avgReplyTime: {
            $cond: [
              { $eq: ['$replyCount', 0] },
              0, // If no replies, set to 0
              {
                $divide: [
                  { $max: [0, { $divide: ['$totalReplyTime', '$replyCount'] }] }, // Prevent negative values
                  1,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    if (ticketStats.length === 0) {
      return res.status(200).json({ message: 'No data found', data: [] });
    }

    res.json(ticketStats);
  } catch (err) {
    console.error('Error getting daily ticket stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


console.log(' missedTicketsController loaded');

module.exports = {
  checkMissedTickets,
  getWeeklyMissedChats,
  getDailyMissedChats,
};
