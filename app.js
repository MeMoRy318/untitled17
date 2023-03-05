const fs = require('node:fs/promises');

const path = require('node:path');


const foo = async () =>{

    const directory = ['directory1','directory2','directory3','directory4','directory5'];
    const file = ['file1.txt','file2.txt','file3.txt','file4.txt','file5.txt'];

    const directoryCreate = directory.map(async (directory,index)=>{
        await fs.mkdir(path.join(process.cwd(),directory),{recursive:true})
        await fs.writeFile(path.join(process.cwd(),directory,file[index]),'hello world')
    })

    const promise = await Promise.all(directoryCreate);
    const result = await fs.readdir(path.join(process.cwd()));

    for (const item of result) {
        const stats = await fs.stat(path.join(process.cwd(),item));
        if (stats.isFile()){
            console.log(path.join(process.cwd(),item), ' is file')
        }else {
            console.log(path.join(process.cwd(),item), ' is directory')
        }
    }
}

foo().catch()