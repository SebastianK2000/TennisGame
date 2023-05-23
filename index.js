const canvas_1 = document.querySelector('canvas');
        const ctx = canvas_1.getContext('2d');

        canvas_1.width = 1000;
        canvas_1.height = 500;

        let playerSorce = 0;  // wynik gracza
        let aiSorce = 0;  // wynik komputera

        const ScorePlayer = document.getElementById('playerPKT'); // wyświetlanie wyniku gracza
        const ScoreAi = document.getElementById('aiPKT'); // wyświetlanie wyniku komputera

        // parametry boiska 

        const cw = canvas_1.width;
        const ch = canvas_1.height;

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

        let newGame = true;

     cancasTop = canvas_1.offsetTop;

        canvas_1.addEventListener("mousemove", playerPos);

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

        function aiMove()
        {
            const middlePadel = aiY + paddelH/2;
            const middleBall = ballY + ballSize/2;
            
            if(ballX >= 500)
            {
                if(middlePadel - middleBall > 200)
                {
                    aiY -= 15;
                }
                else if(middlePadel - middleBall > 40)
                {
                    aiY -= 8;        
                }
                else if(middlePadel - middleBall < -200)
                {
                    aiY += 15;
                }
                else if(middlePadel - middleBall < -40)
                {
                    aiY += 8;
                }   
            }
            else if(ballX < 500)
            {
                if(middlePadel - middleBall > 100)
                {
                    aiY -= 4;
                }
                else if(middlePadel - middleBall < -100)
                {
                    aiY += 4;
                }
            }
        }

        function playerPos(e)
{
    playerY = e.clientY - cancasTop - paddelHeight / 2;

    if(playerY < 0)
    {
        playerY = 0;
    }

    if(playerY > ch - paddelHeight)
    {
        playerY = ch - paddelHeight;
    } 
}

function ball()
{
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0)
    {
        ballSpeedY *= -1;
        ballY = 0;
        speedUp();
    }

    if(ballY >= ch - ballSize)
    {
        ballSpeedY *= -1;
        ballY = ch - ballSize;
        speedUp();
    }

    if(ballX + ballSize >= cw)
    {
        reset(true);
    }

    if(ballX <= 0)
    {
        reset(false);
    }

    if(ballX <= playerX + paddelWidth && 
       ballX >= playerX && 
       ballY + ballSize >= playerY && 
       ballY <= playerY + paddelHeight)
    { 
        ballSpeedX *= -1;
        ballX = playerX + paddelWidth;  
        speedUp();
    }

    if(ballX + ballSize >= aiX && 
       ballX + ballSize <= aiX + paddelWidth &&
       ballY + ballSize >= aiY && 
       ballY <= aiY + paddelHeight)
    {
        ballSpeedX *= -1;
        ballX = aiX - ballSize;
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

    function reset(who) { 
        if (who)
        {
            ScorePlayer.textContent = ++playerSorce;
        } else { 
            ScoreAi.textContent = ++aiSorce;
        }
        newGame = true;
    }

    function ballReset() {
        ballX = playerX + paddelWidth;
        ballY = playerY + paddelHeight / 2 - ballSize / 2;
        ctx.fillStyle = 'red';
        ctx.fillRect(ballX, ballY, ballSize, ballSize);


        canvas_1.addEventListener("click", play);
    }

    function play() {
        newGame = false;
        ballSpeedX = 4;
        ballSpeedY = 4;
    }
    

    

    topCanvas = canvas_1.offsetTop;
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



canvas_1.addEventListener("mousemove", playerPosition)

// wypisujemy zmienną która będzie zwracała uwagę na ruch naszej myszki


// pętla lini środkowej oraz funkcja tablicy głównej

        function game() 
        {
        table();
        if(!newGame) 
        {
            ball();
        } else { ballReset();
        } 
        player()
        ai()
        aiPosition()
        }

// wywoływanie wszystkich funkcji

        setInterval(game, 1000 / 60)

// odświeżanie nadpisywania animacji, częstotliwość