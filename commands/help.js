function helpFn(){
    console.log(`
    List of All Commands
    1.node fileSystemOrganiser.js tree "directoryPath"
    2.node fileSystemOrganiser.js organize "directoryPath"
    3.node fileSystemOrganiser.js help
     
    `)
}

module.exports={
    helpKey:helpFn
}