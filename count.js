function heuristicCount( t, cnt, turn ){
	var i, j, k, l;
	var notTurn = 0;
	var cntVal = 0;
	var v = 0;
	var jump = 0;
	
	if( turn == 1 ) notTurn = 2;
	else notTurn = 1;
	
	/* → */
	for( i = 1; i <= N; i++ ){
		cntVal = 0;
		v = 0;
		jump = 0;
		for( j = 1; j <= N; j++ ){
			if( t[ i ][ j ] == turn || t[ i ][ j ] == 0 ){
				cntVal++;
				if( cntVal == 6 ){
					if( v == 0 ){
						for( k = -5; k <= 0; k++ ){
							if( t[ i ][ j + k ] != 0 ) v++;
							if( k != 0 ) v <<= 1;
						}
						
						if( v == 0 ){
							if( t[ i ][ j ] == 0 ){
								cntVal--;
								continue;
							}
							if( t[ i ][ j ] == turn ){
								v = 1;
								cntVal--;
								continue;
							}
						}
					}
					else{
						if( t[ i ][ j - 6 ] == turn ){
							v -= 32;
						}
						v <<= 1;
						if( t[ i ][ j ] != 0 ) v++;
					}
					
					// 건너뛰기
					if( jump > 0 ){
						jump--;
						cntVal--;
						continue;
					}
					
					// 전 == O or 후 == O
					if( t[ i ][ j - 6 ] == turn || t[ i ][ j + 1 ] == turn ){
					}
					// connect 6
					else if( v == 63 ){
						cnt[ 6 ].v++;
					}
					// 전 == X or 후 == X
					else if( t[ i ][ j - 6 ] == notTurn || t[ i ][ j + 1 ] == notTurn || t[ i ][ j - 6 ] == 3 || t[ i ][ j + 1 ] == 3 ){
						cnt[ hv[ v ].v ].vm++;
					}
					// 전전 == O or 후후 == O
					else if( ( j - 7 > 0 && t[ i ][ j - 7 ] == turn ) || ( j + 2 <= N && t[ i ][ j + 2 ] == turn ) ){
						cnt[ hv[ v ].v ].vm++;
					}
					// It's free
					else{
						if( hv[ v ].t == 2 ){
							cnt[ hv[ v ].v ].v++;
						}
						else{
							if (hv[v].t == 3) {
								cnt[ hv[ v ].v ].vs++;
							}
							cnt[ hv[ v ].v ].vm++;
						}
						jump = ( hv[ v ].j - 2 );
					}
					cntVal--;
				}
			}
			else{
				cntVal = 0;
				v = 0;
				jump = 0;
			}
		}
	}
	
	/* ↓ */
	for( j = 1; j <= N; j++ ){
		cntVal = 0;
		v = 0;
		jump = 0;
		for( i = 1; i <= N; i++ ){
			if( t[ i ][ j ] == turn || t[ i ][ j ] == 0 ){
				cntVal++;
				if( cntVal == 6 ){
					if( v == 0 ){
						for( k = -5; k <= 0; k++ ){
							if( t[ i + k ][ j ] != 0 ) v++;
							if( k != 0 ) v <<= 1;
						}
						
						if( v == 0 ){
							if( t[ i ][ j ] == 0 ){
								cntVal--;
								continue;
							}
							if( t[ i ][ j ] == turn ){
								v = 1;
								cntVal--;
								continue;
							}
						}
					}
					else{
						if( t[ i - 6 ][ j ] == turn ){
							v -= 32;
						}
						v <<= 1;
						if( t[ i ][ j ] != 0 ) v++;
					}
					
					// 건너뛰기
					if( jump > 0 ){
						jump--;
						cntVal--;
						continue;
					}
					
					// 전 == O or 후 == O
					if( t[ i - 6 ][ j ] == turn || t[ i + 1 ][ j ] == turn ){
					}
					// connect 6
					else if( v == 63 ){
						cnt[ 6 ].v++;
					}
					// 전 == X or 후 == X
					else if( t[ i - 6 ][ j ] == notTurn || t[ i + 1 ][ j ] == notTurn || t[ i - 6 ][ j ] == 3 || t[ i + 1 ][ j ] == 3 ){
						cnt[ hv[ v ].v ].vm++;
					}
					// 전전 == O or 후후 == O
					else if( ( i - 7 > 0 && t[ i - 7 ][ j ] == turn ) || ( i + 2 <= N && t[ i + 2 ][ j ] == turn ) ){
						cnt[ hv[ v ].v ].vm++;
					}
					// It's free
					else{
						if( hv[ v ].t == 2 ){
							cnt[ hv[ v ].v ].v++;
						}
						else{
							if (hv[v].t == 3) {
								cnt[ hv[ v ].v ].vs++;
							}
							cnt[ hv[ v ].v ].vm++;
						}
						jump = ( hv[ v ].j - 2 );
					}
					cntVal--;
				}
			}
			else{
				cntVal = 0;
				v = 0;
				jump = 0;
			}
		}
	}
	
	/* ↗ */
	for( i = 1; i < N*2; i++ ){
		cntVal = 0;
		v = 0;
		jump = 0;
		var st = 1, ed = i;
		if( i > N ){
			st += i - N;
			ed -= i - N;
		}
		for( j = st; j <= ed; j++ ){
			if( t[ ( i - j + 1 ) ][ j ] == turn || t[ ( i - j + 1 ) ][ j ] == 0 ){
				cntVal++;
				if( cntVal == 6 ){
					if( v == 0 ){
						for( k = -5; k <= 0; k++ ){
							if( t[ ( i - j + 1 ) - k ][ j + k ] != 0 ) v++;
							if( k != 0 ) v <<= 1;
						}
						
						if( v == 0 ){
							if( t[ ( i - j + 1 ) ][ j ] == 0 ){
								cntVal--;
								continue;
							}
							if( t[ ( i - j + 1 ) ][ j ] == turn ){
								v = 1;
								cntVal--;
								continue;
							}
						}
					}
					else{
						if( t[ ( i - j + 1 ) + 6 ][ j - 6 ] == turn ){
							v -= 32;
						}
						v <<= 1;
						if( t[ ( i - j + 1 ) ][ j ] != 0 ) v++;
					}
					
					// 건너뛰기
					if( jump > 0 ){
						jump--;
						cntVal--;
						continue;
					}
					
					// 전 == O or 후 == O
					if( t[ ( i - j + 1 ) + 6 ][ j - 6 ] == turn || t[ ( i - j + 1 ) - 1 ][ j + 1 ] == turn ){
					}
					// connect 6
					else if( v == 63 ){
						cnt[ 6 ].v++;
					}
					// 전 == X or 후 == X
					else if( t[ ( i - j + 1 ) + 6 ][ j - 6 ] == notTurn || t[ ( i - j + 1 ) - 1 ][ j + 1 ] == notTurn ||
							  t[ ( i - j + 1 ) + 6 ][ j - 6 ] == 3 || t[ ( i - j + 1 ) - 1 ][ j + 1 ] == 3 ){
						cnt[ hv[ v ].v ].vm++;
					}
					// 전전 == O or 후후 == O
					else if( ( ( i - j + 1 ) + 7 <= N && j - 7 > 0 && t[ ( i - j + 1 ) + 7 ][ j - 7 ] == turn ) || 
								( ( i - j + 1 ) - 2 > 0 && j + 2 <= N && t[ ( i - j + 1 ) - 2 ][ j + 2 ] == turn ) ){
						cnt[ hv[ v ].v ].vm++;
					}
					// It's free
					else{
						if( hv[ v ].t == 2 ){
							cnt[ hv[ v ].v ].v++;
						}
						else{
							if (hv[v].t == 3) {
								cnt[ hv[ v ].v ].vs++;
							}
							cnt[ hv[ v ].v ].vm++;
						}
						jump = ( hv[ v ].j - 2 );
					}
					cntVal--;
				}
			}
			else{
				cntVal = 0;
				v = 0;
				jump = 0;
			}
		}
	}
	
	/* ↘ */
	for( i = 1; i < N*2; i++ ){
		cntVal = 0;
		v = 0;
		jump = 0;
		var st = 1, ed = i;
		if( i > N ){
			st += i - N;
			ed -= i - N;
		}
		for( j = st; j <= ed; j++ ){
			if( t[ N - ( i - j ) ][ j ] == turn || t[ N - ( i - j ) ][ j ] == 0 ){
				cntVal++;
				if( cntVal == 6 ){
					if( v == 0 ){
						for( k = -5; k <= 0; k++ ){
							if( t[ N - ( i - j ) + k ][ j + k ] != 0 ) v++;
							if( k != 0 ) v <<= 1;
						}
						
						if( v == 0 ){
							if( t[ N - ( i - j ) ][ j ] == 0 ){
								cntVal--;
								continue;
							}
							if( t[ N - ( i - j ) ][ j ] == turn ){
								v = 1;
								cntVal--;
								continue;
							}
						}
					}
					else{
						if( t[ N - ( i - j ) - 6 ][ j - 6 ] == turn ){
							v -= 32;
						}
						v <<= 1;
						if( t[ N - ( i - j ) ][ j ] != 0 ) v++;
					}
					
					// 건너뛰기
					if( jump > 0 ){
						jump--;
						cntVal--;
						continue;
					}
					
					// 전 == O or 후 == O
					if( t[ N - ( i - j ) - 6 ][ j - 6 ] == turn || t[ N - ( i - j ) + 1 ][ j + 1 ] == turn ){
					}
					// connect 6
					else if( v == 63 ){
						cnt[ 6 ].v++;
					}
					// 전 == X or 후 == X
					else if( t[ N - ( i - j ) - 6 ][ j - 6 ] == notTurn || t[ N - ( i - j ) + 1 ][ j + 1 ] == notTurn ||
							  t[ N - ( i - j ) - 6 ][ j - 6 ] == 3 || t[ N - ( i - j ) + 1 ][ j + 1 ] == 3 ){
						cnt[ hv[ v ].v ].vm++;
					}
					// 전전 == O or 후후 == O
					else if( ( N - ( i - j ) - 7 > 0 && j - 7 > 0 && t[ N - ( i - j ) - 7 ][ j - 7 ] == turn ) || 
							  ( N - ( i - j ) + 2 <= N && j + 2 <= N && t[ N - ( i - j ) + 2 ][ j + 2 ] == turn ) ){
						cnt[ hv[ v ].v ].vm++;
					}
					// It's free
					else{
						if( hv[ v ].t == 2 ){
							cnt[ hv[ v ].v ].v++;
						}
						else{
							if (hv[v].t == 3) {
								cnt[ hv[ v ].v ].vs++;
							}
							cnt[ hv[ v ].v ].vm++;
						}
						jump = ( hv[ v ].j - 2 );
					}
					cntVal--;
				}
			}
			else{
				cntVal = 0;
				v = 0;
				jump = 0;
			}
		}
	}
};