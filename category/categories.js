const mysql = require("mysql");
const mysqlconnection = require("../databaseconnection");
const express = require("express");
const category_router = express.Router();



category_router.get('/', (req, res, next) => {
    var parent_category =[];
 
  
  
   
   var sql = "SELECT * FROM categories_details_tb WHERE parent=?";
    mysqlconnection.query("SELECT * FROM categories_details_tb WHERE parent = '0'", (err, rows, feilds) => {
        if (!err) {
           
            rows.forEach((v) => 
            {
                parent_category.push({id:v.category_id,name:v.category_name});
            
            });
            parent_category.forEach((v) =>{
                var id = v.id;
                mysqlconnection.query(sql,id, (err,result_child,feilds)=>{
                   result_child.forEach((c) =>{
                    child_category.push({id:c.category_id,name:c.category_name,parent:c.parent}); 
                    
                    });
                
                });
                
            });
            
            console.log(child_category);
            console.log(parent_category);
            
            res.status(200).json(
                rows
            );
        } else {
            console.log(err);
        }
    });

});
var parent_category =[];
var p = [];
var child_category = [];
var child_next_category = [];
var  child_category_revoiced =[];


//Multiple statements
category_router.get('/p', (req, res, next) => {
parent_category= [];
    var child = [];
    var  child_c= {0:[],
            101:[],
        102:[],
    103:[]};
    var parent_c= [];
    var  getInformationFromDB = function(callback){
        
sql= "SELECT * FROM categories_details_tb WHERE parent =?";
mysqlconnection.query("SELECT * FROM categories_details_tb",(err,result)=>{
  result.forEach(c=>{
parent_category.push({id:c.category_id,name:c.category_name,parent:c.parent});
  });

    callback(null,parent_category);
}
);

    }
   
getInformationFromDB((err,result)=>{
  
   // console.log(result);
    result.forEach(c =>{
        var par = '0';
        if(c.parent == par){
            parent_c.push(c);
            child_c[0].push(c);
          
        }else{

             child.push(c);
        }


    });
   // console.log(parent_c);
    //console.log(child);
    //console.log(parent_c.length);
    for(var i=0;i<parent_c.length;i++){
        var p = parent_c[i].id;
      //  console.log(p);
        for(var j =0; j<child.length;j++){
        
         if(p == child[j].parent){
              child_c[p].push(child[j]);
              //55+console.log(child[j]);
         }
        
        }
    }
  
//child_c[0].push(parent_c);

console.log(child_c);
res.status(200).json(child_c);
});


});
module.exports = category_router;