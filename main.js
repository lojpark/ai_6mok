var N = 19;
var INF = 2100000000;

var cnt = 0;
var rx = 0, ry = 0;

var hv = new Array();

$(document).ready(function(){
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	var i, j;
	var mx, my;
	
	/* 판 초기화 */
	var t = new Array();
	for( i = 0; i <= N + 1; i++ ){
		t[i] = new Array();
		for( j = 0; j <= N + 1; j++ ){
			if( i == 0 || i == N + 1 || j == 0 || j == N + 1 ){
				t[i][j] = 3;
				continue;
			}
			t[i][j] = 0;
		}
	}
	
	document.onmousemove = function (e) {
		var pkey = e || window.event;
		mx = pkey.pageX + 15;
		my = pkey.pageY + 15;
	}
	
	document.onmousedown = function (e) {
		t[ Math.floor( my/30 ) ][ Math.floor( mx/30 ) ] = 2;
		rx = Math.floor(mx / 30);
		ry = Math.floor(my / 30);
		
		context.clearRect( 0, 0, canvasWidth, canvasHeight );
		drawTable(t, context);
		winlose();

		cnt++;
		
		if (cnt == 2) {
		    forceDraw();
		}
	}

	function forceDraw() {
	    if (cnt < 2) return;

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawTable(t, context);

        cnt++;
        setTimeout(forceDraw, 10);

        if (cnt == 10) {
            cnt = 0;
            ai(t, 1);
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            drawTable(t, context);
            winlose();
        }
	}

	function winlose() {
	    var cnt = new Array();

	    /* Initialize count array */
	    for (i = 0; i <= N; i++) {
	        cnt[i] = new Object();
	        cnt[i].v = cnt[i].vm = 0;
	    }
	    /* Count continuous black stones */
	    heuristicCount(t, cnt, 1);

	    if (cnt[6].v >= 1 || cnt[6].vm >= 1) {
	        context.fillStyle = "rgb(0,0,0)";
	        context.font = "32px helvetica";
	        context.fillText("Black Win!", 235, 28);
	        return;
	    }

	    /* Initialize count array */
	    for (i = 0; i <= N; i++) {
	        cnt[i].v = cnt[i].vm = 0;
	    }
	    /* Count continuous white stones */
	    heuristicCount(t, cnt, 2);

	    if (cnt[6].v >= 1 || cnt[6].vm >= 1) {
	        context.fillStyle = "rgb(255,255,255)";
	        context.font = "32px helvetica";
	        context.fillText("White Win!", 235, 28);
	        return;
	    }
	}
	
	function init(){
		initHeuristic();
		/*t[7][11] = 1;
		t[8][9] = 2;
		t[8][10] = 1;
		t[8][11] = 1;
		t[9][8] = 2;
		t[9][10] = 1;
		t[9][11] = 1;
		t[10][7] = 2;
		t[10][9] = 1;
		t[10][10] = 2;
		t[10][11] = 1;
		t[11][8] = 2;
		t[11][9] = 2;
		t[11][10] = 1;
		t[12][9] = 2;*/
		/*
		t[6][14] = 2;
		t[7][13] = 1;
		t[8][6] = 1;
		t[8][8] = 2;
		t[8][9] = 1;
		t[8][10] = 1;
		t[8][11] = 1;
		t[8][12] = 1;
		t[8][13] = 1;
		t[8][14] = 2;
		t[9][7] = 2;
		t[9][8] = 1;
		t[9][9] = 1;
		t[9][10] = 2;
		t[9][11] = 1;
		t[9][12] = 2;
		t[10][7] = 2;
		t[10][8] = 2;
		t[10][9] = 2;
		t[10][10] = 1;
		t[10][11] = 2;*/
		t[ 10 ][ 10 ] = 1;
		//ai( t, 1 );

		context.clearRect( 0, 0, canvasWidth, canvasHeight );
		drawTable(t, context);
	}
	
	init();
});