const server = document.querySelector("#serverIp");
const leave = document.querySelector("#leave");
const joinButton = document.querySelector('#join');
const tile = document.querySelectorAll(".board-item");
let chat_in = document.querySelector('.chat-input');
const chat_box = document.querySelector('.chat')
let mark = null;
let opponentMark = null;



joinButton.addEventListener('click',()=>{
    
    const socket = new WebSocket(`ws://localhost:3001`)
    joinButton.style.display = "none";
    server.style.display = "none";;

    gameOver = false;

    tile.forEach((el,id) => {
        el.addEventListener('click',() =>{
            socket.send(id)
        });
       });
    
 

    socket.addEventListener("message",({data}) => {
        exeEvent(data);
    });

    leave.addEventListener('click',() => {
        socket.send("Q");
        joinButton.style.display = "block";
        server.style.display = "block";;
        chat_box.innerHTML = null;
    });

    chat_in.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const chat_msg = "M"+chat_in.value 
            socket.send(chat_msg)
            chat_in.value = "Me : "+ chat_in.value;
            chat_box.innerHTML = chat_box.innerHTML + `<p>${chat_in.value}</p>`;
            chat_in.value = ""
    
        }
    });

});




exeEvent = (data) =>{

    if(data.startsWith("M")){
        let oppMsg = data.substring(1);
        oppMsg = "Opponent : "+ oppMsg;

        chat_box.innerHTML = chat_box.innerHTML + `<p>${oppMsg}</p>`;
    }

    if(data.startsWith("VALID")){
        let posMe = data[5]
        tile[posMe].firstChild.innerText = mark
    }

    if(data.startsWith("INVALID")){
        $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    }

    if(data.startsWith("Opponent")){
        let posOpp = data[8];
        tile[posOpp].firstChild.innerText = opponentMark
    }

    if(data.startsWith("Welcome")){
    mark = data[8];
    opponentMark = mark === 'X' ? 'O' : 'X';
    }



    console.log(data)


}




