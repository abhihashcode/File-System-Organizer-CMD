let fs=require("fs");
let path=require("path");

function treeFn(dirPath){
    if(dirPath==undefined){
        // process.cwd();//process.current working directory become global means where you will run this program it will take the current directory path.
        treeHelper(process.cwd(),"");//now treehelper will recognize the path of the current folder
        return;
    }else{
        let doesExist=fs.existsSync(dirPath);//check if input directory is exist or not
        if(doesExist){
            treeHelper(dirPath,"");//treeHelper will create a tree structure of our folder and file (dirPath-> path of directory , ""->for space (indentation));
        }else{
            console.log("Please Enter valid Directory Path")
            return;
        }
    }
}

function treeHelper(dirPath,indent){
    let isFile=fs.lstatSync(dirPath).isFile();//check if it is file or folder 
    if(isFile==true){//if file 
        let fileName=path.basename(dirPath);//simple provide the name of file means the part of the file path
        console.log(indent+ "├─" +fileName);//print that file name
    }else{
        let dirName=path.basename(dirPath);//The path.basename() method returns the filename part of a file path.
        console.log(indent+"└─"+dirName);//print that directory
        let children=fs.readdirSync(dirPath);//again read the directory to check if there is any file inside directory is available or not
        for(let i=0;i<children.length;i++){//iterate to all the child means the file inside that directory
            let childPath=path.join(dirPath,children[i]);//made an path of the particular file inside the folder
            treeHelper(childPath,indent+ "\t")//treeHelper() function will recursively call to now print and check if there inside folder is there another folder or file and so on and this will print all the file inside file folder and all.
        }
    }
}

module.exports={
    treeKey:treeFn
}