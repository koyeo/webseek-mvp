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
                    tick: true,
                    tickLength: 20,
                    tickOpacity: 0,
                    grid: true,
                    gridOpacity: 3,
                },
                x: {
                    title: false,
                    line: true,
                    labelFontSize: 14,
                    labelAutoRotate: false,
                    labelAutoEllipsis: true,
                },
            },
            insetLeft: 100,
            interaction: {
                tooltip: {
                    markerFill: '#f80000',
                    crosshairsStroke: '#1f4dff',
                    crosshairsLineDash: [2, 2]
                },
            },
            children: [
                {
                    type: 'area',
                    encode: {
                        x: 'date',
                        y: 'count',
                        shape: 'smooth',
                    },
                    style: {
                        fill: 'linear-gradient(90deg, rgba(23, 25, 33, 0.12) 0%, rgba(23, 25, 33, 0) 100%)',
                        fillOpacity: 1,
                    },
                },
                {
                    type: 'line',
                    encode: {
                        x: 'date',
                        y: 'count',
                        shape: 'smooth',
                    },
                    style: {
                        stroke: 'rgba(23, 25, 33, 1)',
                        lineWidth: 2,
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
                <div className='text-base text-primary font-medium leading-[24px]'>Trend</div>
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
