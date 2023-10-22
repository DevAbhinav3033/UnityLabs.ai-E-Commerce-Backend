// models/user.js
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {type:String, required:[true,'required field'],select:false, minlength:8 },
  userType: { type: String, enum: ['buyer', 'seller'] },
});

userSchema.pre("save",async function(next){
  if (! this.isModified("password")){
    return next();
  }
  this.password=await bcrypt.hash(this.password,12);
  next();
})

userSchema.methods.comparepassword = async function (password){
  // console.log(password,this.password);
  return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('User', userSchema);
