// 创建集合:  createCollection()
// 删除集合：  drop()
// 插入数据:  insertOne()、insertMany()
// 查询数据:    find()
// 更新数据:   updateOne()、updateMany()
// 删除数据:   deleteOne()、deleteMany()
// 排序:   sort()
//         { type: 1 }  // 按 type 字段升序
//         { type: -1 } // 按 type 字段降序
// 查询分页:   limit()、skip()
// 左连接： $lookup

var orders ={ _id: 1, product_id: 154, status: 1 }

var products = [
    { _id: 154, name: '笔记本电脑' },
    { _id: 155, name: '耳机' },
    { _id: 156, name: '台式电脑' }
]

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
      if(err){
          throw err;
      }
      
    var dbo = db.db("runoob");
    var products_collection =  dbo.collection("products");
    var order_collection =  dbo.collection("orders");

    //插入数据
    //   dbo.collection("orders").insertOne(orders, function(err, res) {
    //     if (err) throw err;
    //     console.log("文档插入成功");
    //     db.close();
    //     });

    //插入数据
    // products_collection.insertMany(products,function(err,res){
    //     if (err) throw err;
    //     console.log("文档插入成功");
    //     });
        
      // 查询数据
      order_collection.find().toArray(function(err,res){
            if(err) throw err;
            console.log(JSON.stringify(res));products
      })

      products_collection.find().toArray(function(err,res){
            if(err) throw err;
            console.log(JSON.stringify(res));
      })
      
    // 删除集合
    //   dbo.collection("products").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
    //     if (err) throw err;
    //     if (delOK) console.log("集合已删除");
    //     db.close();
    // });
    
   
      //左连接
      dbo.collection('orders').aggregate([
          { $lookup:
            {
                from:'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'orderdetails'
            }
          }
      ]).toArray(function(err,res){
          if(err) throw err;
          console.log(JSON.stringify(res));
          db.close();
      })
  })




