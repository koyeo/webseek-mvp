'use client';


import {useEffect, useState} from "react";
import {sleep} from "@/utils/time";
import {Spin} from "antd";

export default function UseHookSetStatePage() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<string>('');


    useEffect(() => {

        // setLoading(true);

        void (async () => {

            await sleep(3000)
            setData('hello world')
            setLoading(false);
        })()

    }, []);


    return <div>data: {loading ? <Spin/> : data}</div>
}