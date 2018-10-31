function getStatus( t, turn, fs ){
	var i;
	var status = 0, value = 0;
	
	var cnt = new Array();
	
    /* Initialize count array */
	for( i = 0; i <= N; i++ ){
		cnt[i] = new Object();
		cnt[i].v = cnt[i].vm = cnt[i].vs = 0;
	}
    /* Count my continuous stones */
	heuristicCount( t, cnt, 1 );
	
	/* Set value */
	value = 0;
	if( turn == 1 ){
		if( fs == 1 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v >= 1 || cnt[5].vm >= 1 ) value += 30000;
			else if( cnt[4].v >= 1 || cnt[4].vm >= 1 ) value += 30000;
			else if( cnt[3].v + cnt[3].vs >= 2 ) value += 1000;
			else if( cnt[3].v + cnt[3].vs >= 1 && cnt[3].vm >= 1 ) value += 1000;
			else if( cnt[3].v + cnt[3].vs >= 1 && cnt[2].v + cnt[2].vs >= 3 ) value += 1000;
			else if (cnt[2].v + cnt[2].vs >= 2) value += 1000;
			
			value += (cnt[3].v + cnt[3].vs) * 15;
			if( (cnt[3].v + cnt[3].vs) > 0 ){
				if( cnt[2].v + cnt[2].vs >= 1 ){
					value += ( cnt[2].v + cnt[2].vs ) * 15;
				}
			}
			else if( cnt[2].v + cnt[2].vs > 0 ){
				if( cnt[2].v + cnt[2].vs >= 2 ){
					value += ( cnt[2].v + cnt[2].vs ) * 15;
				}
			}
			value += (cnt[2].v + cnt[2].vs) * 10;
			value += cnt[3].vm * 2;
			value += cnt[2].vm;
		}
		else if( fs == 2 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v + cnt[5].vs >= 1 || cnt[5].vm >= 1 ) value += 30000;
			else if( cnt[4].v + cnt[4].vs >= 2 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].v + cnt[3].vs >= 1 ) value += 5000;
			else if( cnt[4].v + cnt[4].vs >= 1 && cnt[3].v >= 1 ) value += 5000;
			else if( cnt[4].vm >= 1 && cnt[3].v + cnt[3].vs >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if (cnt[4].v >= 1 && cnt[2].v + cnt[2].vs >= 1) value += 5000;
			else if (cnt[3].v >= 1 && cnt[2].v + cnt[2].vs >= 1) value += 5000;
	
			value += (cnt[4].v + cnt[4].vs) * 15;
			value += (cnt[3].v + cnt[3].vs) * 15;
			if( cnt[3].v > 0 ){
				if( (cnt[3].v + cnt[3].vs) >= 2 ){
					value += ( cnt[3].v + cnt[3].vs) * 20;
				}
				if( cnt[2].v + cnt[2].vs>= 2 ){
					value += ( cnt[2].v + cnt[2].vs) * 15;
				}
			}
			value += (cnt[2].v + cnt[2].vs) * 10;
			value += cnt[4].vm * 5;
			value += cnt[3].vm * 2;
			value += cnt[2].vm;
		}
	}
	if( turn == 2 ){
		if( fs == 1 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v >= 1 && cnt[4].v >= 1 ) value += 5000;
			else if( cnt[5].v >= 1 && cnt[4].vm >= 1 ) value += 5000;
			else if( cnt[5].v >= 1 && cnt[3].v >= 2 ) value += 5000;
			else if( cnt[5].v >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if( cnt[5].vm >= 1 && cnt[4].v >= 1 ) value += 5000;
			else if( cnt[4].v >= 2 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[4].vm >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].v >= 2 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[2].v >= 1 ) value += 2000;
			else if( cnt[3].v >= 3 ) value += 1000;
			
			value += cnt[5].v * 15;
			value += cnt[4].v * 15;
			if( cnt[4].v > 0 ){
				if( cnt[3].v >= 2 ){
					value += ( cnt[3].v ) * 20;
				}
				if( cnt[2].v >= 2 ){
					value += ( cnt[2].v ) * 15;
				}
			}
			value += cnt[3].v * 15;
			value += cnt[2].v * 10;
			value += cnt[5].vm * 5;
			value += cnt[4].vm * 5;
			value += cnt[3].vm * 2;
			value += cnt[2].vm * 2;
		}
		else if( fs == 2 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v >= 1 ) value += 5000;
			else if( cnt[5].vm >= 1 && cnt[4].vm >= 1 ) value += 5000;
			else if( cnt[5].vm >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 ) value += 5000;
			else if( cnt[4].vm >= 2 ) value += 5000;
			else if( cnt[4].vm >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 1000;
			else if( cnt[4].vm >= 1 && cnt[2].v >= 2 ) value += 1000;
			else if( cnt[3].v >= 2 ) value += 1000;
	
			value += cnt[5].vm * 10;
			value += cnt[4].vm * 10;
			value += cnt[3].v * 15;
			if( cnt[3].v > 0 ){
				if( cnt[2].v >= 2 ){
					value += ( cnt[2].v ) * 15;
				}
			}
			else if( cnt[2].v > 0 ){
				if( cnt[2].v >= 3 ){
					value += ( cnt[2].v ) * 15;
				}
			}
			value += cnt[3].vm * 2;
			value += cnt[2].v * 10;
			value += cnt[2].vm * 2;
			value *= 2;
		}
	}
	status += value;
	
	/* Initialize count array */
	for( i = 0; i < N; i++ ){
		cnt[i].v = cnt[i].vm = cnt[i].vs = 0;
	}
	/* Count enemy's continuous stones */
	heuristicCount( t, cnt, 2 );
	
	/* Set value */
	value = 0;
	if( turn == 2 ){
		if( fs == 1 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v >= 1 || cnt[5].vm >= 1 ) value += 30000;
			else if( cnt[4].v >= 1 || cnt[4].vm >= 1 ) value += 30000;
			else if( cnt[3].v + cnt[3].vs >= 2 ) value += 1000;
			else if( cnt[3].v + cnt[3].vs >= 1 && cnt[3].vm >= 1 ) value += 1000;
			else if( cnt[3].v + cnt[3].vs >= 1 && cnt[2].v + cnt[2].vs >= 3 ) value += 1000;
			else if (cnt[2].v + cnt[2].vs >= 2) value += 1000;
			
			value += (cnt[3].v + cnt[3].vs) * 15;
			if( (cnt[3].v + cnt[3].vs) > 0 ){
				if( cnt[2].v + cnt[2].vs >= 1 ){
					value += ( cnt[2].v + cnt[2].vs ) * 15;
				}
			}
			else if( cnt[2].v + cnt[2].vs > 0 ){
				if( cnt[2].v + cnt[2].vs >= 2 ){
					value += ( cnt[2].v + cnt[2].vs ) * 15;
				}
			}
			value += (cnt[2].v + cnt[2].vs) * 10;
			value += cnt[3].vm * 2;
			value += cnt[2].vm;
		}
		else if( fs == 2 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v + cnt[5].vs >= 1 || cnt[5].vm >= 1 ) value += 30000;
			else if( cnt[4].v + cnt[4].vs >= 2 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].v + cnt[3].vs >= 1 ) value += 5000;
			else if( cnt[4].v + cnt[4].vs >= 1 && cnt[3].v >= 1 ) value += 5000;
			else if( cnt[4].vm >= 1 && cnt[3].v + cnt[3].vs >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if (cnt[4].v >= 1 && cnt[2].v + cnt[2].vs >= 1) value += 5000;
			else if (cnt[3].v >= 1 && cnt[2].v + cnt[2].vs >= 1) value += 5000;
	
			value += (cnt[4].v + cnt[4].vs) * 15;
			value += (cnt[3].v + cnt[3].vs) * 15;
			if( cnt[3].v > 0 ){
				if( (cnt[3].v + cnt[3].vs) >= 2 ){
					value += ( cnt[3].v + cnt[3].vs) * 20;
				}
				if( cnt[2].v + cnt[2].vs>= 2 ){
					value += ( cnt[2].v + cnt[2].vs) * 15;
				}
			}
			value += (cnt[2].v + cnt[2].vs) * 10;
			value += cnt[4].vm * 5;
			value += cnt[3].vm * 2;
			value += cnt[2].vm;
		}
	}
	if( turn == 1 ){
		if( fs == 1 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v >= 1 && cnt[4].v >= 1 ) value += 5000;
			else if( cnt[5].v >= 1 && cnt[4].vm >= 1 ) value += 5000;
			else if( cnt[5].v >= 1 && cnt[3].v >= 2 ) value += 5000;
			else if( cnt[5].v >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if( cnt[5].vm >= 1 && cnt[4].v >= 1 ) value += 5000;
			else if( cnt[4].v >= 2 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[4].vm >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].v >= 2 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 && cnt[2].v >= 1 ) value += 2000;
			else if( cnt[3].v >= 3 ) value += 1000;
			
			value += cnt[5].v * 15;
			value += cnt[4].v * 15;
			if( cnt[4].v > 0 ){
				if( cnt[3].v >= 2 ){
					value += ( cnt[3].v ) * 20;
				}
				if( cnt[2].v >= 2 ){
					value += ( cnt[2].v ) * 15;
				}
			}
			value += cnt[3].v * 15;
			value += cnt[2].v * 10;
			value += cnt[5].vm * 5;
			value += cnt[4].vm * 5;
			value += cnt[3].vm * 2;
			value += cnt[2].vm * 2;
		}
		else if( fs == 2 ){
			if( cnt[6].v >= 1 || cnt[6].vm >= 1 ) value += 100000;
			else if( cnt[5].v >= 1 ) value += 5000;
			else if( cnt[5].vm >= 1 && cnt[4].vm >= 1 ) value += 5000;
			else if( cnt[5].vm >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 5000;
			else if( cnt[4].v >= 1 ) value += 5000;
			else if( cnt[4].vm >= 2 ) value += 5000;
			else if( cnt[4].vm >= 1 && cnt[3].v >= 1 && cnt[3].vm >= 1 ) value += 1000;
			else if( cnt[4].vm >= 1 && cnt[2].v >= 2 ) value += 1000;
			else if( cnt[3].v >= 2 ) value += 1000;
	
			value += cnt[5].vm * 10;
			value += cnt[4].vm * 10;
			value += cnt[3].v * 15;
			if( cnt[3].v > 0 ){
				if( cnt[2].v >= 2 ){
					value += ( cnt[2].v ) * 15;
				}
			}
			else if( cnt[2].v > 0 ){
				if( cnt[2].v >= 3 ){
					value += ( cnt[2].v ) * 15;
				}
			}
			value += cnt[3].vm * 2;
			value += cnt[2].v * 10;
			value += cnt[2].vm * 2;
			value *= 2;
		}
	}
	status -= value;
	
	return status;
};

function ai( t, fs ){
	abp( t, -INF, INF, 0, null );
};

function abp( t, alpha, beta, dep, usp ){
	/* Return status when dep is max */
	if( dep == 4 ){
		return getStatus( t, 1, 1 );
	}
	
	var i, j, k;
	
	var w = new Array();
	w[ 0 ] = new Array( -1, 1, 0, 0, -1, -1, 1, 1 );
	w[ 1 ] = new Array( 0, 0, -1, 1, -1, 1, 1, -1 );
	
	var sp = new Object(), spc = new Object();
	sp.x = sp.y = 0;
	spc.x = spc.y = 0;
	
	var cn = 0, isHigh = false, isLow = false;
	var cand = new Array();
	
	/* Find candidates */
	for( i = 1; i <= N; i++ ){
		for( j = 1; j <= N; j++ ){
			for( k = 0; k < 8; k++ ){
				if( t[ i ][ j ] == 0 && t[ i + w[0][ k ] ][ j + w[1][ k ] ] != 0 && t[ i + w[0][ k ] ][ j + w[1][ k ] ] != 3 ){
					cn++;
					cand[ cn ] = new Object();
					cand[ cn ].x = j;
					cand[ cn ].y = i;
					break;
				}
			}
		}
	}
	
	/* Set value to candidates */
	for( i = 1; i <= cn; i++ ){
		cand[ i ].v = 0;
		if( dep <= 1 ) t[ cand[ i ].y ][ cand[ i ].x ] = 1;
		else t[ cand[ i ].y ][ cand[ i ].x ] = 2;
		
		if( dep == 0 ) cand[ i ].v += getStatus( t, 1, 2 );
		if( dep == 1 ) cand[ i ].v += getStatus( t, 2, 1 );
		if( dep == 2 ) cand[ i ].v += getStatus( t, 2, 2 );
		if( dep == 3 ) cand[ i ].v += getStatus( t, 1, 1 );
		
		t[ cand[ i ].y ][ cand[ i ].x ] = 0;

		if( dep == 2 || dep == 3 || dep == 6 || dep == 7 ) cand[ i ].v *= -1;
		
		if( cand[ i ].v > 80000 ){
			if( dep == 1 ){
				usp.x = cand[ i ].x;
				usp.y = cand[ i ].y;
			}
			if( dep == top ){
				t[ cand[ i ].y ][ cand[ i ].x ] = 1;
				t[ sp.y ][ sp.x ] = 1;
				rx = cand[ i ].x;
				ry = cand[ i ].y;
			}
			if( dep == 2 || dep == 3 || dep == 6 || dep == 7 ) cand[ i ].v *= -1;
			return cand[ i ].v;
		}
		if( cand[ i ].v < -80000 ){
			if( dep == 1 ){
				usp.x = cand[ i ].x;
				usp.y = cand[ i ].y;
			}
			if( dep == 0 ){
				t[ cand[ i ].y ][ cand[ i ].x ] = 1;
				t[ sp.y ][ sp.x ] = 1;
				rx = cand[ i ].x;
				ry = cand[ i ].y;
			}
			if( dep == 2 || dep == 3 || dep == 6 || dep == 7 ) cand[ i ].v *= -1;
			return cand[ i ].v;
		}
	}
	
	/* Sort candidates */
	for( i = 1; i <= cn; i++ ){
		for( j = i + 1; j <= cn; j++ ){
			if( cand[ i ].v < cand[ j ].v ){
				var temp = cand[ i ];
				cand[ i ] = cand[ j ];
				cand[ j ] = temp;
			}
		}
	}
	
	if( cand[ 1 ].v >= 900 ) isHigh = true;
	if( cand[ cn ].v <= -900 && cand[ 1 ].v > -900 ) isLow = true;
	
	var value = 0, index = 0;
	/* Max player */
	if( dep == 0 || dep == 1 || dep == 4 || dep == 5 ){
		for( i = 1; i <= cn; i++ ){
			/* Cut candidates */
			if( isHigh && !isLow){
			//	if( cand[ i ].v < 900 && alpha > -80000 ) break;
			}
			if( isLow && !isHigh){
			//	if( cand[ i ].v < -900 ) break;
			}
			
			t[ cand[ i ].y ][ cand[ i ].x ] = 1;
			value = abp( t, alpha, beta, dep + 1, spc );
			t[ cand[ i ].y ][ cand[ i ].x ] = 0;
			
			if( alpha < value ){
				alpha = value;
				sp.x = spc.x;
				sp.y = spc.y;
				index = i;
			}
			/* Beta cut-off */
			if( alpha >= beta || alpha >= 80000 ){
				break;
			}
		}
		if( dep == 1 && index > 0 ){
			usp.x = cand[ index ].x;
			usp.y = cand[ index ].y;
		}
		if( dep == 0 ){
			t[ cand[ index ].y ][ cand[ index ].x ] = 1;
			t[ sp.y ][ sp.x ] = 1;
			rx = cand[ index ].x;
			ry = cand[ index ].y;
		}
		return alpha;
	}
	/* Min player */
	else{
		for( i = 1; i <= cn; i++ ){
			/* Cut candidates */
			if( isHigh && !isLow){
			//	if( cand[ i ].v < 900 ) break;
			}
			if( isLow && !isHigh){
			//	if( cand[ i ].v < -900 ) break;
			}
			
			t[ cand[ i ].y ][ cand[ i ].x ] = 2;
			value = abp( t, alpha, beta, dep + 1, sp );
			t[ cand[ i ].y ][ cand[ i ].x ] = 0;
			
			if( beta > value ){
				beta = value;
			}
			/* Alpha cut-off */
			if( alpha >= beta || beta <= -80000 ){
				break;
			}
		}
		return beta;
	}
};