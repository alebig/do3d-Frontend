import React, { useState, useEffect } from 'react';
export default function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => { document.title = `Cliqueaste ${count} veces` });
  return (
    <div>
      <p>Cliqueaste {count} veces</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquear
      </button>
    </div>
  );
}