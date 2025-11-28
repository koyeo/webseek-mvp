'use client';


import {useEffect, useRef, useState} from "react";
import {microtask} from "@/utils/task";

export default function UseHookMicroTaskPage() {

    const ref = useRef<number>(0);
    const ref2 = useRef<number>(0);
    const ref3 = useRef<number>(0);

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const [count3, setCount3] = useState(0);

    const max = 100;

    useEffect(() => {
        if (ref.current > max) {
            return
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCount1(count1 + 1)
        ref.current++
    }, [count1])

    useEffect(() => {
        if (ref2.current > max) {
            return
        }
        microtask(() => {
            setCount2(count2 + 1)
            ref2.current++
        })
    }, [count2]);


    useEffect(() => {
        if (ref3.current > max) {
            return
        }
        const id = setTimeout(() => {
            setCount3(count3 + 1)
            ref3.current++
        }, 0)
        return () => clearTimeout(id)
    }, [count3]);

    return <div>
        <div>count1: {count1}</div>
        <div>count2: {count2}</div>
        <div>count3: {count3}</div>
    </div>
}