const {User} =  require('../models');


//create a user

exports.createUser = async (req, res) => {
     try{
         const user = await User.create(req.body) 
	 res.status(200).json({
           message: 'success',
	   data: {
             usercreated: user
	   }
	 })
     }catch(error){
          res.status(400).json({
            error: error.message
	  })
     }
}
