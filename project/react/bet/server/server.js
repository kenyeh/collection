const io = require('socket.io')();

const randomWord = function (randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

let users = [];
let messages = [
    {id: 111,created: '00:00',level: 'lv1',msg: 'earlier message',uname: 'ABC'},
    {id: 111,created: '00:00',level: 'lv1',msg: 'earlier message',uname: 'ABC'},
    {id: 111,created: '00:00',level: 'lv1',msg: 'earlier message',uname: 'ABC'},
    {id: 111,created: '00:00',level: 'lv1',msg: 'earlier message',uname: 'ABC'},
    {id: 111,created: '00:00',level: 'lv1',msg: 'earlier message',uname: 'ABC'}
]

const channels = [
    'public',
    'room 1'
]

io.on('connection', (client) => {
    // init
    client.name = randomWord(false, 5);
    console.log('create user name', client.name);
    client.emit('init client', {
        name: client.name,
        channel: 'public'
    });

    
    client.on('joinChannel', function(channel) {
        client.channel = channel
        console.log('some one join channel' ,channel)
        if (channels.indexOf(channel) >= 0) {
            client.join(channel, function () {
                console.log('join channel', channel)
                client.emit('load messages', messages);
            })
        }
    })

    client.on('say', function(msg , callback){
        console.log('got msg' + msg)

        if (msg.trim().length > 0) {

            var nowDate = new Date();
            var sh = nowDate.getHours()
            var sm = nowDate.getMinutes()
            var createdTime = `${sh < 10 ? '0' + sh : sh}:${sm < 10 ? '0' + sm : sm}`
            var messageData = {
                channel: 'public',
                id: Number,
                created: createdTime,
                level: 'lv1',	
                msg: msg,
                uname: client.name
            }

            console.log('new msg', messageData)
            
            // console.log(messages)
            console.log('client.channel', client.channel)
            io.to(client.channel).emit('said', messageData);            
            callback({
                success: 1
            })
        }
    })


    client.on('disconnect', function(){
        console.log(client.name, ' exit')
    });
});





const port = 4000;
io.listen(port);
console.log('listening on port ', port);