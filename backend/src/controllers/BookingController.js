const Booking = require('../models/Booking');

module.exports = {

    async store(req, res){
        
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        //const user = await user.findById(user_id);

        //if(!user){
        //   return res.status(400).json({error:'User does not exists'})
        //}

        const booking = await Booking.create({
            user: user_id,
            date,
            spot: spot_id
        })

        await booking.populate('spot').populate('user').execPopulate()
  
      const ownerSocket = req.connectedUsers[booking.spot.user]
  
      if (ownerSocket) {
          req.io.to(ownerSocket).emit('booking_request', booking)
      }
  

        return res.json({booking});
    }

};