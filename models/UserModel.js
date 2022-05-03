const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide user's name"]
    },
    email:{
        type:String,
        unique:true,
        lowecase:true,
        required:[true, "Please provide valid email"],
        validate: [validator.isEmail, "Please provide valid email"]
    },
    password:{
        type:String,
        required:[true, "Please provide passowrd"]
    }
},
{
    timestamps: true
}
)

UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 8)

    next()
})

UserSchema.methods.correctPassword = async (candidatePwd, userPwd) => {
    return await bcrypt.compare(candidatePwd, userPwd);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;