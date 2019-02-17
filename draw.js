function drawTable(t, image, context) {
	var i, j;

	context.drawImage(image.board, 0, 0, 600, 600, 0, 0, 600, 600);

	context.fillStyle = "rgb(0,0,0)";
	for (i = 1; i < N; i++) {
		for (j = 1; j < N; j++) {
			context.strokeRect(i * 30, j * 30, 30, 30);
		}
	}

	for (i = 1; i <= N; i++) {
		for (j = 1; j <= N; j++) {
			if (t[i][j] == 1) {
				context.drawImage(image.black, 0, 0, 26, 26, j * 30 - 13, i * 30 - 13, 26, 26);
				/*context.fillStyle = "rgb(0,0,0)";
				context.beginPath();
				context.arc(j * 30, i * 30, 13, 0, Math.PI * 2, true);
				context.fill();*/
			}
			if (t[i][j] == 2) {
				context.drawImage(image.white, 0, 0, 26, 26, j * 30 - 13, i * 30 - 13, 26, 26);
				/*
				context.fillStyle = "rgb(255,255,255)";
				context.beginPath();
				context.arc(j * 30, i * 30, 13, 0, Math.PI * 2, true);
				context.fill();*/
			}
			if (t[i][j] == 3) {
				context.fillStyle = "rgb(128,128,128)";
				context.beginPath();
				context.arc(j * 30, i * 30, 13, 0, Math.PI * 2, true);
				context.fill();
			}
			/* Recent stone */
			if (i == ry && j == rx) {
				if (i == ry && j == rx) context.fillStyle = "rgb(255,0,0)";
				context.beginPath();
				context.arc(j * 30, i * 30, 4, 0, Math.PI * 2, true);
				context.fill();
			}
		}
	}
};