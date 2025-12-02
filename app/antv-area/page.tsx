'use client';

'use client';
import React, {useEffect, useRef} from 'react';
import {Chart} from '@antv/g2';


export default function AntvAreaPage() {
    return <div className='p-10'>
        <div className='h-200px'>
            <AlertsTrend list={[
                {date: '2025-11-25', count: 3},
                {date: '2025-11-26', count: 8},
                {date: '2025-11-27', count: 5},
                {date: '2025-11-28', count: 12},
                {date: '2025-11-29', count: 7},
                {date: '2025-11-30', count: 10},
                {date: '2025-12-01', count: 6},
            ]}/>
        </div>
    </div>
}

function AlertsTrend({list}: { list: { date: string, count: number }[] }) {
    // const series = useMemo(() => {
    //   return [
    //     {
    //       name: 'Alerts',
    //       data: data.alertsTrend.map(item => ({ x: item.date, y: item.count })),
    //     },
    //   ];
    // }, [data.alertsTrend]);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }


        console.log(list);

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
        });

        chart.options({
            type: 'view',
            data: list,
            axis: {
                y: {
                    title: false,
                    line: true,
                    arrow: true,
                    lineLineWidth: 30,
                },
                x: {
                    title: false,
                    line: true,
                    labelAlign: 'horizontal',
                },
            },
            children: [
                {
                    type: 'area',
                    encode: {
                        x: 'date',
                        y: 'count',
                    },
                    style: {
                        fill: 'linear-gradient(180deg, rgba(23, 25, 33, 0.12) 0%, rgba(23, 25, 33, 0) 100%)',
                    },
                },
                {
                    type: 'line',
                    encode: {
                        x: 'date',
                        y: 'count',
                        shape: 'smooth',
                        size: 1,
                    },
                    style: {
                        stroke: 'rgba(23, 25, 33, 1)',
                        lineWidth: 1.5,
                    },
                },
            ],
        });

        void chart.render();

        return () => {
            chart.destroy();
        };
    }, [list]);

    return (
        <div className='border border-primary rounded-lg p-4 bg-primary_alt'>
            <div className='flex items-center h-[36px] justify-between mb-4'>
                <div className='text-base text-primary font-medium leading-[24px]'>Alerts Trend</div>
                {/*<div>*/}
                {/*  <Select options={[]} style={{ width: '120px' }} />*/}
                {/*</div>*/}
            </div>
            <div className='h-[calc(196/16*1rem)]' ref={ref}>
                {/*<Chart options={options} series={series} type='area' height='100%' />*/}
            </div>
        </div>
    );
}
