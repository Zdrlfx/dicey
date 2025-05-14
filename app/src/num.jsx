import React, { useMemo } from 'react';
import Dictaphone from './speech';

const Num = () => {
  const nums = useMemo(() => Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1), []);
  const sum = nums.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex bg-gray-200 p-4 rounded shadow-md mb-5">
        {nums.map((n, idx) => (
          <h1 key={idx} className="text-2xl font-bold p-4">{n}</h1>
        ))}
      </div>
      <p className="text-lg font-medium mb-4">Sum: {sum}</p>
      <Dictaphone expectedSum={sum} />
    </div>
  );
};

export default Num;
