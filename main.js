var N = 19;
var INF = 2100000000;

var count = 0;
var rx = 0, ry = 0;
var rrx = 0, rry = 0;

var difficulty = 'Hard';
var tick = 0;

var hv = new Array();

$(document).ready(function () {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");

	var i, j;
	var mx, my;
	var isPlaying = false;
	var menu = ['NONE', 'NONE', 'NONE'];
	var menuList = ['  Hard', 'Medium', '  Easy'];

	var image = new Object();
	image.board = new Image();
	image.board.src = "image/board.png";
	image.black = new Image();
	image.black.src = "image/black.png";
	image.white = new Image();
	image.white.src = "image/white.png";

	/* 판 초기화 */
	var t = new Array();
	for (i = 0; i <= N + 1; i++) {
		t[i] = new Array();
		for (j = 0; j <= N + 1; j++) {
			if (i == 0 || i == N + 1 || j == 0 || j == N + 1) {
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

		if (250 <= mx && mx <= 380 && 265 <= my && my <= 305) {
			if (menu[0] == 'NONE') menu[0] = 'OVER';
		}
		else menu[0] = 'NONE';
		if (250 <= mx && mx <= 380 && 315 <= my && my <= 355) {
			if (menu[1] == 'NONE') menu[1] = 'OVER';
		}
		else menu[1] = 'NONE';
		if (250 <= mx && mx <= 380 && 365 <= my && my <= 405) {
			if (menu[2] == 'NONE') menu[2] = 'OVER';
		}
		else menu[2] = 'NONE';
	}

	document.onmousedown = function (e) {
		if (!isPlaying) {
			if (menu[0] == 'OVER') menu[0] = 'CLICKED';
			if (menu[1] == 'OVER') menu[1] = 'CLICKED';
			if (menu[2] == 'OVER') menu[2] = 'CLICKED';
			return;
		}

		if (Math.floor(my / 30) < 0 || Math.floor(my / 30) > 19) return;
		if (Math.floor(mx / 30) < 0 || Math.floor(mx / 30) > 19) return;
		if (t[Math.floor(my / 30)][Math.floor(mx / 30)] != 0) return;
		if (count >= 2) return;
			
		t[Math.floor(my / 30)][Math.floor(mx / 30)] = 2;
		rrx = rx;
		rry = ry;
		rx = Math.floor(mx / 30);
		ry = Math.floor(my / 30);

		drawTable(t, image, context);
		winlose();

		count++;

		if (count == 2) {
			forceDraw();
		}
	}

	document.onmouseup = function (e) {
		if (!isPlaying) {
			if (menu[0] == 'CLICKED') difficulty = 'Hard';
			else if (menu[1] == 'CLICKED') difficulty = 'Medium';
			else if (menu[2] == 'CLICKED') difficulty = 'Easy';
			else return;

			isPlaying = true;
			t[10][10] = 1;
			drawTable(t, image, context);
			return;
		}
	}

	function forceDraw() {
		drawTable(t, image, context);
		winlose();
		setTimeout(forceDraw, 10);

		if (count < 2) return;

		count++;

		if (count == 50 && isPlaying) {
			count = tick = 0;
			ai(t, 1);
			drawTable(t, image, context);
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
			isPlaying = false;
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
			isPlaying = false;
			return;
		}
	}

	function selectOption() {
		if (isPlaying) return;

		drawTable(t, image, context);

		context.shadowBlur = 4;
		context.shadowOffsetX = 4;
		context.shadowOffsetY = 4;
		context.shadowColor = "rgba(0, 0, 0, 0.5)";

		// Select Difficulty
		context.fillStyle = "rgb(255, 255, 255, 0.9)";
		context.fillRect(225, 200, 150, 200);
		for (i = 0; i < 3; i++) {
			var offset = 0;
			context.shadowColor = "rgba(0, 0, 0, 0.5)";

			switch (menu[i]) {
				case 'NONE':
					context.fillStyle = "rgb(210, 210, 210)";
					break;
				case 'OVER':
					context.fillStyle = "rgb(150, 150, 150)";
					break;
				case 'CLICKED':
					context.fillStyle = "rgb(150, 150, 150)";
					offset = 4;
					context.shadowColor = "rgba(0, 0, 0, 0)";
					break;
			}
			context.fillRect(235 + offset, 250 + i * 50 + offset, 130, 40);

			context.fillStyle = "rgb(0,0,0)";
			context.font = "22px helvetica";
			context.shadowColor = "rgba(0, 0, 0, 0)";
			context.fillText("Difficulty", 260, 232);
			context.fillText(menuList[i], 262 + offset, 278 + i * 50 + offset);
		}

		setTimeout(selectOption, 10);
	}

	function init() {
		initHeuristic();

		selectOption();

		//t[10][10] = 1;
		//ai( t, 1 );
	}

	init();
});