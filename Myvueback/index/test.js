let isReading = false;
let isWriting = false;

if((!isReading)&&(!isWriting)){
    isWriting = true
    console.log("isWriting: ", isWriting)
}
else{
    if(isReading){
        console.log('接口被占用，无法写(isReading)')
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
            'isReading'
        );
    }
    if(isWriting){
        console.log('接口被占用，无法写(isWriting)')
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
            'isWriting'
        );
    }
}
