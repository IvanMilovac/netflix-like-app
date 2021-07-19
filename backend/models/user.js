const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String, 
        validate:{
            validator: async function(email){
            const user = await this.constructor.findOne({email});
            if(user){
                if(this.id===user.id){
                    return true;
                }
                return false;
            }
            return true;
        }
        }
    },
    hash: String,
    salt: String,
});

module.exports = mongoose.model("User", userSchema);
