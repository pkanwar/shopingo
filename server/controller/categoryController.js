
const Category = require('../models/category');
const error = require('../util/error');

exports.addCategory = (req,res)=>{
    
    const subCategoryList =  req.body.subCategory;
    const newCategory = new Category({
        "name" : req.body.name,
        "subCategories" : subCategoryList
    });
    console.log("category body :  ", newCategory);
    if(!req.body){
        res.status(400).send(error.getError('ER012'));
    }
    newCategory.save().then(()=>{
        res.status(201).send({id : newCategory.id})
    }).catch(()=>{
        res.status(500).send({error:'internal server error'});
    })
}

exports.getCategories = (req,res)=>{
    Category.find({},(err,categories)=>{
        console.log('categories : ',categories);
        res.status(200).send(categories);
    })
}