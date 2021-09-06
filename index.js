#!/usr/bin/env node

const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let i of arguments){
    if(i[0] == '-'){
        flags.push(i);
    }else if(i[0] == "%"){
        secondaryArguments.push(i.slice(1));
    }else{
        filenames.push(i);    
    }
}


//if no flag present and 1 or more than 1 file present in filenames then it will run and disply the file.
/*  let assume a.txt and b.txt present in filenames then it will read the file and one by one and display 
    the content of file.  */

for(let file of filenames){
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        if(flag == '-rs'){
           fileData = removeAll(fileData," "); 
        }
        if(flag == '-rn'){
            fileData = removeAll(fileData,"\n"); 
        }
        if(flag == '-rsc'){
            for(let secArg of secondaryArguments){
                fileData = removeAll(fileData,secArg);     
            }    
        }
        if(flag == "-an"){
            fileData = addLineNumber(fileData);
        }
        if(flag == "-anws"){
            fileData = addLineNumberWithSpace(fileData);
        }
        if(flag == "-adwnl"){
            fileData = addDataWithoutNextLine(fileData);
        }
        if(flag == "-rel"){
            fileData = removeExtraLine(fileData);
        }
    }
    console.log(fileData);  
}    



function removeAll(string,removalData){
    return string.split(removalData).join("");
}


function addLineNumber(filedata){
     let arr = filedata.split("\n");
     let myfile = [];
     for(let i = 0; i < arr.length ;i++){
         myfile[i]= i+1 +") "+arr[i] +"\n";        
     }
     myfile = myfile.join("");
     return myfile;     
}


function addLineNumberWithSpace(filedata){
    
     let temp = 1;
     let arr = filedata.split("\n");

     let myfile = [];     
     for(let i = 0; i < arr.length ;i++){
         if(arr[i] != ""){
            myfile[i] = temp +") "+arr[i] +"\n";  
            temp++;      
         }else{
             myfile[i] = "\n";
         }   
     }
     myfile = myfile.join("");
     return myfile;     
}


function addDataWithoutNextLine(filedata){
    let arr = filedata.split("\n");    
    let count = 1;
    let myfile = [];
    for(let i = 0; i < arr.length ;i++){
        if(arr[i] != ""){
            myfile[i]= arr[i] +"\n";        
            count++;
        }
    }
    myfile = myfile.join("");
    return myfile;     
}

function removeExtraLine(filedata){

    let arr = filedata.split("\n");
    let myfile = [];
    myfile[0] = arr[0];
    let count = 1;
    for(let i = 1;i < arr.length;i++){
        if(arr[i] == "" && arr[i -1] != ""){
            myfile[count] = arr[i]; 
            count++;
        }
        if(arr[i] !=""){
            myfile[count] = arr[i];
            count++;
        }
    }
    myfile = myfile.join("\n");
    return myfile;
}