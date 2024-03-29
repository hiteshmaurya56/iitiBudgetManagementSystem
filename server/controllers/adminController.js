import User from "../models/User.js";
import { validationResult } from "express-validator";
import Consumable from "../models/Consumable.js";
import Equipment from "../models/Equipment.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    const { username, name, role } = req.body;
    user = await User.create({
      username,
      name,
      password: secPass,
      role,
    });
    res.json({ success: "User has been created!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Some error occured!" });
  }
};

//===============================================================================

export const addDept = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    const {
      username,
      name,
      password,
      cons_budget,
      cons_expenditure,
      equip_budget,
      equip_expenditure,
      year,
    } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }
    let entry = await Consumable.create({
      username,
      department: name,

      budget:cons_budget,
      expdenditure:cons_expenditure,

      year,
      indents_process: [],
      direct_purchase: [],
    });
    let entry2 = await Equipment.create({
      username,
      department: name,

      budget:equip_budget,
      expenditure:equip_expenditure,
      year,
      indents_process: [],
      direct_purchase: [],
    });
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(password, salt);
    const role = 0;
    user = await User.create({
      username,
      name,
      password: secPass,
      role,
    });
    res.json({ success: "Department has been created!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
};

//{     "username":"cse2",
// "password":"password",
// "name":"CSE245",
// "budget":9000000,
// "expenditure":3444440,
// "in_process":0,
// "year":2022
// }


export const increase_budget=async(req,res)=>{
  try{const {username,budget_type,new_amount,year}=req.body;
    let table;
    if(budget_type=="Equipment"){
      table=await Equipment.findOne({username,year});
    }
    else{
      table=await Consumable.findOne({username,year});
    }
    console.log(table)
    const old_amount=table.budget;
    table.budget=new_amount;
    const indent={remark:`previous budget was ${old_amount}, increased to ${new_amount} by admin`};
    console.log(indent)
    table.indents_process.push(indent);
    table.direct_purchase.push(indent);
    await table.save();
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
}


//department names, eq budg ,cons budg , usernames,

export const newyear=async(req,res)=>{
  try{
    const {new_year,curr_year} = req.body;
    //const department_list=[];
    // let dep_object={
    //   username:String,
    //   department:String,
    //   budget:Number,
    //   expenditure:{type:Number,default:0},
    //   in_process:{type:Number,default:0},
    //   year:Number
    // };

    let tables1=await Consumable.find({year:curr_year})
    let users =await User.find({role:0});
    let usernames=[];
    for(let user of users){
      usernames.push(user.username)
    }

    for(let table1 of tables1){
      const username=table1.username

      if(usernames.includes(username)){
        await Consumable.create({
          username:table1.username,
          department: table1.department,
          budget:table1.budget,
          expenditure:0,
          in_process:0,
          year:new_year,
          indents_process: [],
          direct_purchase: [],
        });
      }
    
      
    }
    
    let tables2=await Equipment.find({year:curr_year})
    for(let table2 of tables2){
      const username=table2.username
      if(usernames.includes(username)){
        await Equipment.create({
          username:table2.username,
          department: table2.department,
          budget:table2.budget,
          expenditure:0,
          in_process:0,
          year:new_year,
          indents_process: [],
          direct_purchase: [],
        });
      }
    }
}
  catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occured!");
  }
}

// {
//   "new_year":2024,
//   "curr_year":2023
// }


//removing user
export const removeUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ error: "Username not found!" });
    }
    else{
      await User.findOneAndDelete({username:req.body.username});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Some error occured!" });
  }
};

//updating user
//limitation -- username is immutable (this is reasonable)
export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ error: "Username not found!" });
    }
    else{
      const { username, name } = req.body;
      let {role}=req.body;
      console.log(role)

      await Consumable.updateMany({username}, { $set: { department:name } })
      await Equipment.updateMany({username}, { $set: { department:name } })


      if(req.body.password){
        let user=await User.findOne({username})
        if(role!=0&&!role) role= user.role;
        console.log(role)
        await User.findOneAndDelete({username});
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        
        user = await User.create({
          username,
          name,
          password: secPass,
          role,
        });
      }
      else{
        //console.log(User.findOne({username}));
        await User.updateOne({username},{$set:{name:name}})
        //console.log(User.findOne({username}));
      }
      
      
      res.json({ success: "User has been updated!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Some error occured!" });
  }
};
// {
//   "username":"Electrical",
//   "name":"Electrical change3",
//   "password":"pp"
  
// }