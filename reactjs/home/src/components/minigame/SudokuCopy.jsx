import React, { useState } from 'react';

export default function SudokuGenerator() {
  // 1. 스도쿠 판의 상태를 관리 (초기값은 모두 0인 9x9 배열)
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  // 2. 가로, 세로, 3x3 박스 규칙 검사 함수
  const isValid = (currentBoard, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (currentBoard[row][i] === num || currentBoard[i][col] === num) {
        return false;
      }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  // 3. 1~9 무작위 셔플 함수
  const getShuffledNumbers = () => {
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  // 4. 백트래킹으로 판을 채우는 재귀 함수
  const fillBoard = (currentBoard) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0) {
          const randomNums = getShuffledNumbers();
          for (const num of randomNums) {
            if (isValid(currentBoard, row, col, num)) {
              currentBoard[row][col] = num;
              if (fillBoard(currentBoard)) return true;
              currentBoard[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // 5. 버튼을 클릭했을 때 새로운 스도쿠를 생성하는 핸들러
  const handleGenerate = () => {
    // 원본 상태를 직접 수정하지 않기 위해 깊은 복사(Deep Copy) 진행
    const newBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(newBoard);
    setBoard(newBoard); // 리액트 화면 갱신
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎲 리액트 스도쿠 정답판 생성기</h2>
      
      {/* 9x9 격자판 그리기 */}
      <div style={styles.grid}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <div 
                key={colIndex} 
                style={{
                  ...styles.cell,
                  // 3x3 박스 경계선을 시각적으로 두껍게 구분하기 위한 스타일 꼼수
                  borderRight: (colIndex + 1) % 3 === 0 && colIndex !== 8 ? '2px solid #333' : '1px solid #ccc',
                  borderBottom: (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? '2px solid #333' : '1px solid #ccc'
                }}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={handleGenerate} style={styles.button}>
        새로운 정답판 만들기
      </button>
    </div>
  );
}

// 🎨 화면을 예쁘게 꾸며주는 단순 CSS 스타일 정의
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px' },
  title: { marginBottom: '20px', color: '#333' },
  grid: { border: '3px solid #333', backgroundColor: '#fff' },
  row: { display: 'flex' },
  cell: { width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' },
  button: { marginTop: '25px', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }
};