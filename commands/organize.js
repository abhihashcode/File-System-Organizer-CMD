let fs=require("fs");
let path=require("path");

function organizeFn(dirPath){
    // console.log("Organise Command Implemented")

    //Pseudo code for implementing organizer
    //Step 1. check if user input->directory path or not
    let dest;
    if(dirPath==undefined){
        dest=process.cwd();
        return;
    }else{
        let doesExist=fs.existsSync(dirPath);//check if input directory is exist or not
        if(doesExist){

            //Step 2. create->organize_file->directory

            dest=path.join(dirPath,"organised_files");//it join organised_files with the given path by user 
            if(fs.existsSync(dest)==false){//if organised_files is not exist then create otherwise not
                fs.mkdirSync(dest);//create folder/directory
            }
        }else{
            console.log("Please Enter valid Directory Path")
            return;
        }

    }
   
    organizeHelper(dirPath,dest);
    
}

function organizeHelper(src,dest){

    //Step 3. identify categories of all the files present in that input directory

    let childName=fs.readdirSync(src);//only names of files and folder are provided by this function
    // console.log(childName)
    for(let i=0;i<childName.length;i++){//to getting the exact path we iterate a loop
        let childAddress=path.join(src,childName[i]);//this will join the exact path of file with the source
        let isFile=fs.lstatSync(childAddress).isFile();//to check if the select path is folder of file if folder then we will do nothing 
        if(isFile){//if file then do organised in organised folder
            // console.log(childName[i]);//print the file name only
            
            let category=getCategory(childName[i]); //to know the file type (media,music,text,zip)
            // console.log(childName[i],"belongs to -->>",category);


            //Step 4. copy/cut files to that organised directory inside of any of category folder

            sendFile(childAddress,dest,category);//this function will copy paste in the organised_folder of all the file with their type (childAddress -> the file address , dest-> address of destination where to paste , category-> the file belongs to which category will put into that folder (like    .zip-> Archive category so it will be inside Archive folder)).

        }
    }
}

function getCategory(name){
    let ext=path.extname(name);//it will provide the extension of particular file
    ext=ext.slice(1);//this will remove the . means(.zip,.txt,.docx) after this (zip,txt,docx) to match with type objects
    // console.log(ext);
    for(let type in types){//it will iterate in type objects
        let cTypeArray=types[type];//it will return the type of type like(for archive type there is rar,7zip type means type of type)
        for(let i=0;i<cTypeArray.length;i++){//it will iterate over all the particular types
            if(ext==cTypeArray[i]){//if extension will match with any of type which is available in type object
                return type;//then simply return the type name(ex: for rar file it will return Archive);
            }
        }
    }
    return "others";//if no file type found in type object then simply return others as type

}

function sendFile(src,dest,category){
    let categoryPath=path.join(dest,category);//it will be path to store particular file
    if(fs.existsSync(categoryPath)==false){//if the folder is already available then don't create
        fs.mkdirSync(categoryPath)//make directory of category type in the category path 
    }

    //Note : How copy file works
    //Basically when we copy from another file to any folder happened is the same name file created in the destination folder and the content gets copied not the file get copied so the basename function create the empty file with the same name (what the source file name is).

    let fileName=path.basename(src);//create empty file name same as source file name.

    let destFilePath=path.join(categoryPath,fileName);//it will made a path of destination like where to copied files go.
    fs.copyFileSync(src,destFilePath); //this will copy source file into destination folder
    fs.unlinkSync(src);//it will delete all the file that has been copied before
    console.log(fileName,"Copied to ",category)//just simple message to show that this has been copied
}

module.exports={
    organizeKey:organizeFn
}