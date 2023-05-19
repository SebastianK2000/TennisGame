const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1000;
        canvas.height = 500;

        const cw = canvas.width;
        const ch = canvas.height;

        // tworzenie skrótów zmiennych na własne potrzeby

        const ballSize = 20;
        let ballX = cw /  2 - ballSize / 2
        let ballY = ch / 2 - ballSize / 2

        const paddelHeight = 100;
        const paddelWidth = 20;

        const playerX = 70; 
        const aiX = 910;
        
        let playerY = 200;
        let aiY = 200;

        const lineWidth = 6;
        const lineHeight = 16;

        let ballSpeedX = 4;
        let ballSpeedY = 4;

        function player() {
            ctx.fillStyle = 'red';
            ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);

            if (ballX - paddelWidth <= playerX && ballY >= playerY - ballSize && ballY <= playerY + paddelHeight){
            ballSpeedX = -ballSpeedX;
   }
        }

            function ai() {
            ctx.fillStyle = 'green';
            ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);

            if (ballX + ballSize >= aiX && ballY <= aiY + paddelHeight && ballY >= aiY - ballSize){
            ballSpeedX = -ballSpeedX;
   }

        }


        function ball() {
            ctx.fillStyle = '#fff';
            ctx.fillRect(ballX, ballY, ballSize, ballSize);

            ballX += ballSpeedX;
            ballY += ballSpeedY;
            
            if (ballY <= 0 || ballY + ballSize >= ch) {
                ballSpeedY = -ballSpeedY;
                speedUp();
            }

            if (ballX <= 0 || ballX + ballSize >= cw) {
                ballSpeedX = -ballSpeedX;
                speedUp();
            }
        }

        function table() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, cw, ch);
        

        for (let linePosition = 20; linePosition < ch;
        linePosition +=30) {
        ctx.fillStyle = "gray"
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
        }
    }

    

    topCanvas = canvas.offsetTop;
    console.log(topCanvas)

    function playerPosition(e) {
// oznaczenie (e) sprawia że funkcja cały czas śledzi ruch myszki i podaje nam go
        playerY = e.clientY - topCanvas - paddelHeight / 2;
    

    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
    }

// wypisujemy gdy próbuje wyjechać nasza rakieta na dole poza canvas

    if (playerY <= 0) {
        playerY = 0;
    }

// gdy próbuje wyjechac na górze poza canvas
//aiY = playerY;

}

function speedUp() {

    if(ballSpeedX > 0 && ballSpeedX < 16){
        ballSpeedX += .3;
    } else if (ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= .4;
    }

    //przyspieszenie X

    if(ballSpeedY > 0 && ballSpeedY < 16){
        ballSpeedY += .3;
    } else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= .3;
    }

    //przyspieszenie Y
}

//SZTUCZNA INTELIGENCJA 

function aiPosition() {

    const middlePaddel = aiY + paddelHeight / 2;
    const middleBall = ballY + ballSize / 2;

    if (ballX > 500) {
        if (middlePaddel - middleBall > 200) {
            aiY -= 24;
        } else if (middlePaddel - middleBall > 50) {
            aiY -= 10;
        } else if (middlePaddel - middleBall < -200) {
            aiY += 24;
        } else if (middlePaddel - middleBall < -50) {
            aiY += 10;
        }
    } 
    
    if (ballX <= 500 && ballX > 100) {
        if (middlePaddel - middleBall > 100) {
            aiY -= 3;
        } 
        
        if (middlePaddel - middleBall < -100) {
            aiY += 3;
        }
    }

    if (aiY >= ch - paddelHeight) {
        aiY = ch - paddelHeight
    }

    if (aiY <= 0) {
        aiY = 0;
    }
}



canvas.addEventListener("mousemove", playerPosition)

// wypisujemy zmienną która będzie zwracała uwagę na ruch naszej myszki


// pętla lini środkowej oraz funkcja tablicy głównej

        function game() {
        table()
        ball()
        player()
        ai()
        aiPosition()
        }

// wywoływanie wszystkich funkcji

        setInterval(game, 1000 / 60)

// odświeżanie nadpisywania animacji, częstotliwość