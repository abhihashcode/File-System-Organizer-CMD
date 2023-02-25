#!/usr/bin/env node


//Important NOTE:///
//Q. How to make global this file system orgranser?
//A. To make this project global means from anywhere in the computer you can run all this command easily through windows cmd for this............(and it used the same inside every language)

//Steps 1 : Searched on the google => (shebang syntax) for (language name) stackoverflow 
//                   for example :  shebang syntax for node.js stackoverflow
//        then you willl get (#!/usr/bin/env node) <- this should be pasted global into your code on the top

//Step 2:  NPM Link
            // type npm init -y
            // then change inside npm ("bin":"fileSystemOrganiser.js")
            // "license": "ISC",
//                  "bin":{
//  (at the place of peppy it could be anything)-> "peppy":"fileSystemOrganiser.js"
//                    }

//Step 3: run command 
//            npm link
//Step 4: opne cmd write (peppy help) this will run correctly

let helpObject=require("./commands/help");
let treeObject=require("./commands/tree");
let organizeObject=require("./commands/organize");

//this is an array in which first two indexes are what we write (ex: node (space) filename) that comes into this array in cmd argv[0]=node , argv[1]=filename
//and whatever user input it starts after 2 so we do slice and it will give in array after clearing all
let inputArr=process.argv.slice(2);//process.arguments

let types={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps'],
    app:['exe','dmg','pkg','deb','msi']
}



// console.log(inputArr);

//we are building these belows command
//node fileSystemOrganiser.js tree "directoryPath"
//node fileSystemOrganiser.js organize "directoryPath"
//node fileSystemOrganiser.js help

let command=inputArr[0];//to check which command user input
switch(command){
    case "tree":
        treeObject.treeKey(inputArr[1]);//inputArr[1] provide the dirPath
        break;
    case "organize":
        organizeObject.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObject.helpKey();
        break;
    default:
        console.log("Please 🙏 Input Right Command");
        break;
}


