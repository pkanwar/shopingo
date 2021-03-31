const Product = require('../models/product');
const error = require('../util/error');

exports.addProduct = (req,res)=>{
    if(!req.body){
        return res.status(400).send(error.getError('ER010'));
    }
    const productRequest =  req.body;
    console.log('productRequest : ',productRequest);
    const newProduct = new Product({
        "title":productRequest.title,
        "description":productRequest.description,
        "category":productRequest.category,
        "subCategory":productRequest.subCategory,
        "imageUrl":productRequest.imageUrl,
        "discount":productRequest.discount,
        "price": {
            "actualPrice":productRequest.price.actualPrice,
            "discountedPrice":productRequest.price.discountedPrice
        }
    });
    newProduct.save().then(()=>{
        res.status(201).send({_id : newProduct.id});
        return;
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
}

exports.getProduct = (req,res)=>{
    const prodId = req.params.id;
    Product.findById({_id : prodId},(err,product)=>{
        if(err){
            res.status(400).send(error.getError('ER009'));
        }
        if(!product){
            res.status(404).send(error.getError('ER011'));
        }
        res.status(200).send(product);
        return;
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
}

exports.getProducts = (req,res)=>{
    console.log('session : ', req.session);
    console.log('req.sessionID : ', req.sessionID);
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    let skip = 0;
    let limit = 10;
    let category = req.query.category;
    let subCategory = req.query.subCategory;
    let title = req.query.title;
    let parameters = {};
    if(category){
        parameters['category'] = new RegExp(category,'i') ;
    }
    if(subCategory){
        parameters['subCategory'] = new RegExp(subCategory,'i');
    }
    if(title){
        parameters['title'] = new RegExp(title,'i');
    }

    if(page && size){
        skip = (page-1) * size;
        limit = size
    }

    Product.find(parameters).skip(skip).limit(limit).then(product=>{
        console.log('product : ',product);
        res.status(200).send(product);
        return;
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });

}