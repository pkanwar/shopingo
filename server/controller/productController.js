const Product = require('../models/product');
const error = require('../util/error');

exports.addProduct = (req,res)=>{
    if(!req.body){
        return res.status(400).send(error.getError('ER010'));
    }
    const productRequest =  req.body;
    const newProduct = new Product({
        "title":productRequest.title,
        "description":productRequest.description,
        "category":productRequest.category,
        "subCategory":productRequest.subCategory,
        "author": productRequest.author,
        "rating": productRequest.rating,
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
    }).catch(e => {
        console.log('error : ',e);
        res.status(500).send({ error: "Internal Server Error" });
    });
}

exports.getProduct = (req,res)=>{
    const prodId = req.params.id;
    Product.findById({_id : prodId},(err,product)=>{
        if(err){
            return res.status(400).send(error.getError('ER009'));
        }
        if(!product){
            return  res.status(404).send(error.getError('ER011'));
        }
        res.status(200).send(product);
        return;
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
}

exports.getProducts = (req,res)=>{
  
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    let skip = 0;
    let limit = 10;
    let category = req.query.category;
    let subCategory = req.query.subCategory;
    let title = req.query.title;
    let author = req.query.author;
    let rating = req.query.rating;
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
    if(author){
        parameters['author'] = new RegExp(author,'i');
    }
    if(rating){
        let rate = parseInt(rating[0]);
        const ratings = [];
        
        rating.split('|').forEach(rating => {
            let regexp = new RegExp("^"+ parseInt(rating));
            ratings.push(regexp);
        });

        //parameters['rating'] = new RegExp("^"+ rating);
        parameters['rating'] = { $in : ratings };
    }

    if(page && size){
        skip = (page-1) * size;
        limit = size
    }

    Product.find(parameters).skip(skip).limit(limit).then(product=>{
        let response = {};
        Product.find().countDocuments().then((count)=>{
            let totalPages = Math.ceil(count/limit);
            response['products'] = product;
            response['totalItems'] = count;
            response['totalPages'] = totalPages;
            res.status(200).send(response);
            return;
        })
       
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });

}

exports.getProductsByFilter = (req,res)=>{
    
    let page = parseInt(req.body.page);
    let size = parseInt(req.body.size);
    let skip = 0;
    let limit = 16;
    let category = req.body.genre;
    let author = req.body.author;
    let rating = req.body.rating;
    let parameters = {};
    if(category && category.length !== 0){
        parameters['category'] =  { $in : category };
    }
    if(author && author.length !== 0){
        parameters['author'] =  { $in : author };
    }
    if(rating && rating.length !== 0){

        const ratings = [];
        
        rating.forEach(rating => {
            //round off rating in case of decimal
            let regexp = new RegExp("^"+ parseInt(rating));
            ratings.push(regexp);
        });

        parameters['rating'] = { $in : ratings };
    }
    if(page && size){
        skip = (page-1) * size;
        limit = size
    }

    Product.find(parameters).skip(skip).limit(limit).then(product=>{
       // console.log('product : ',product);
    //    let result = {};
    //    result['products'] = product;
    //    result['status'] = "SUCCEEDED";
    //     res.status(200).send(result);
        let response = {};
        Product.find(parameters).countDocuments().then((count)=>{
            let totalPages = Math.ceil(count/limit);
            response['products'] = product;
            response['totalItems'] = count;
            response['totalPages'] = totalPages;
            response['status'] = "SUCCEEDED";
            res.status(200).send(response);
            return;
        })
        return;
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });

}

exports.getFilterMap = (req,res)=>{
    let response = {};
    Product.find({},{category:1,author:1,rating:1}).then(products=>{
        let authors = [];
        let categories = [];
        let ratings = [];
        let filterMap = new Map();
        products.forEach(item=>{
            if(!filterMap.has(item.author)){
                authors.push(item.author);
                filterMap.set(item.author,true);
            }

            if(!filterMap.has(item.category)){
                categories.push(item.category);
                filterMap.set(item.category,true);
            }

            if(!filterMap.has(item.rating)){
                ratings.push(item.rating);
                filterMap.set(item.rating,true);
            }
        })
        response['status'] = "SUCCEEDED";
        response['authors'] = authors;
        response['ratings'] = ratings;
        response['categories'] = categories;
        res.status(200).send(response);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
}
