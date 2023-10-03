import * as React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

export default function Counter({ number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count < number) {
            setCount(count + 1);
            return count;
        }
    }, [count]);

    return (
        <>
            <div>
                <div>{count}</div>
            </div>
        </>
    );
}
