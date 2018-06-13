var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
var users = [];
var typeing_user = [];
var userCounts = 0;
var gulpUserData = function(){
    var gulp = []
    
    for (var key in users) {
        // skip loop if the property is from prototype
        if (!users.hasOwnProperty(key)) continue;

        gulp.push(users[key]['data']);
    }
    
    return gulp;
}



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
    //io.emit('chat message', '[ a user connected]');

    socket.on('add user name', function(name){
        socket.userName = name;
        
        if(!users[name]){
            //console.log('no ex');
            users[name] = {
                _socket: socket,
                data: {
                    name:name,
                    // online list
                    online:1,
                    // index
                    index:userCounts
                }
            }
            //next
            userCounts++;
        }else {
            users[name]['data']['online'] = 1;
            users[name]['_socket'] = socket
        }
        
        
        //console.log(gulpUserData());
        //return ;
        
        io.emit('update users', gulpUserData());

        io.emit('news', {
            msg: '' + name + ' connected '
        });
        
        
        

    })


    socket.on('chat message', function(msg , msgTo = '', callback){
        var fromUserindex = users[socket.userName]['data']['index'],
            userSocket = {}
        
        //console.log('get message ' + msgTo);
        //console.log(msg);
        
        if(msgTo === ''){
            //public
            io.emit('chat message', {
                indexNum: fromUserindex,
                name:socket.userName,
                msg:msg
            }); 
        }else {
            //private
            
            if(users[msgTo]){
                userSocket = users[msgTo]['_socket']
                
                userSocket.emit('private message', {
                    fromUserIndex: fromUserindex,
                    fromUser:socket.userName,
                    msg:msg
                });
                
                callback({
                    state:'success',
                    msg:msg
                })
            }else {
                callback({
                    state:'error',
                    msg:"User doesn't exist!"
                })
            }
            
        }

        
    })
    
    
    socket.on('typing', function(user,act){
        
        var i = 0,
            indexTyping = typeing_user.indexOf(user)
        
        //act: 1->add, 0->remove
        if(act){
            if( indexTyping == -1){
                typeing_user.push(user);
            }
        }else {
            if( indexTyping >= 0){
                typeing_user.splice(indexTyping,1)
            }
        }
        
        
        
        
        //console.log(typeing_user);
        //console.log('are typing');
        
        socket.broadcast.emit('typing', typeing_user);
    })

    socket.on('disconnect', function(){
        
        var indexTyping = typeing_user.indexOf(socket.userName)
        
        
        
        if(socket.userName != undefined ){
            
            users[socket.userName]['data']['online'] = 0;
            delete users[socket.userName]['_socket'];
            
            socket.broadcast.emit('news', {
                msg: '' + socket.userName + ' disconnect '
            });
            
            typeing_user.splice(indexTyping,1)
            socket.broadcast.emit('typing', typeing_user);
            socket.broadcast.emit('update users', gulpUserData());
        }
    });
})

http.listen(4000, function(){
    console.log('listening on *:4000')
});