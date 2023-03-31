var Userdb = require('../model/model');

exports.create =(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be emtpy!"})
        return;
    }
    const user = new Userdb({
        name:req.body.name,
        age: req.body.age,
        room: req.body.room
    })

    user.save(user).then(data=>{
        res.redirect('/add-user');
    })
    .catch(err=>{
        res.status(500).send({ massage :err.message || "some error accured...."})
    })

}

exports.find =(req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

}

exports.update =(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body)
    .then(data=>{
        if(!data){
            res.status(404).send({massage:`Connot Update user with ${id}`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update user information"})
    })

}

exports.delete =(req,res)=>{
    const id =req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete with id${id}`})
        }else{
            res.send({massage :"User was deleted successfully"})
        }
       
    })
    .catch(err=>{
        res.status(500).send({ massage:"could not delete User with id="+id})
    })
}
