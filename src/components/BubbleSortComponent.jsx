import React, { useEffect, useState } from 'react';

function BubbleSortComponent() {
  const [numbers, setNumbers] = useState([]);
  const numberOfArrayExponents = 1000;

  // Génération des nombres aléatoires à l'initialisation
  useEffect(() => {
    const randomNumbers = Array.from({ length: numberOfArrayExponents }, () =>
      Math.floor(Math.random() * numberOfArrayExponents)
    );
    setNumbers(randomNumbers);
  }, []);

  // Tri optimisé : arrêt anticipé si aucun échange n'a eu lieu
  const bubbleSort = (arr) => {
    console.time('BubbleSort Time');
    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
      n--;
    } while (swapped);
    console.timeEnd('BubbleSort Time');
    return arr;
  };

  return (
    <div>
      <button onClick={() => setNumbers(bubbleSort([...numbers]))}>Sort Numbers</button>
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {numbers.join(', ')}
      </div>
    </div>
  );
}

export default BubbleSortComponent;
