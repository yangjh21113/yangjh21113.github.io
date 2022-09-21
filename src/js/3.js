function LCS(word1, word2) {
  let m = word1.length;
  let n = word2.length;
  const l = [];
  const solution = [];
  for (let i = 0; i <= m; i++) {
    l[i] = [];
    solution[i] = [];

    for (let j = 0; j <= n; j++) {
      l[i][j] = 0;
      solution[i][j] = '0';
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (word1[i - 1] === word2[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
        solution[i][j] = 'diagonal';
      } else {
        const a = l[i - 1][j];
        const b = l[i][j - 1];
        l[i][j] = a > b ? a : b;
        solution[i][j] = l[i][j] == l[i - 1][j] ? 'top' : 'left';
      }
    }
  }
  printSolution(solution, word1, m, n);
  return l[m][n];
}

function printSolution(solution, word1, m, n) {
    
  let a = m;
  let b = n;
  let x = solution[a][b];
  let answer = '';
  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = word1[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }
    x = solution[a][b];
  }
  console.log('lcs', answer)
}

LCS('abc', 'bcd')
