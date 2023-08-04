'use client';

import { useEffect, useState } from 'react';
import { Space } from 'antd';
import { useQRCode } from 'next-qrcode';

import { Button } from '@/components/ui/button';

interface QRCodePlayerProps {
    text: string;
    onBack: () => void;
}

export default function QRCodePlayer(props: QRCodePlayerProps) {
    const { Canvas } = useQRCode();
    const { text } = props;
    const [AllCount, setAllCount] = useState(1);
    const [count, setCount] = useState(1);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();
    const [playing, setPlaying] = useState(false);
    const [playingText, setPlayingText] = useState('');
    const [status, setStatus] = useState('playing');
    useEffect(() => {
        play();
    }, []);

    function play() {
        const result: string[] = [];
        let i = 1;
        while (i < text.length / 500 + 1) {
            const textSegment = text.slice((i - 1) * 500, i * 500);
            result.push(textSegment);
            i++;
        }
        const totalTimes = result.length;
        setAllCount(result.length);
        let time = 0;
        // Play First QRCode
        setPlayingText(result[time]);
        time = time + 1;
        setCount(1);
        setTimeout(() => {
            const IntervalCount = setInterval(() => {
                if (time < totalTimes) {
                    setCount(time + 1);
                    setPlayingText(result[time]);
                    time++;
                } else {
                    // setCount(0);
                    setStatus('done');
                    clearInterval(IntervalCount);
                }
            }, 100);
            setIntervalID(IntervalCount);
        });
    }
    return (
        <div className="mx-auto">
            <>
                <div style={{ fontWeight: 'bold', marginBottom: 16 }}>
                    <Space>
                        <span>播放动态二维码</span>
                        <span>
                            {count} / {AllCount}
                        </span>
                    </Space>
                </div>
                {playingText && (
                    <div style={{ marginLeft: -16 }}>
                        <Canvas
                            text={playingText}
                            options={{
                                margin: 3,
                                scale: 4,
                                width: 500,
                                color: {
                                    dark: '#000000',
                                    light: '#FFFFFF',
                                },
                            }}
                        />
                    </div>
                )}
                {status === 'done' && (
                    <Space>
                        <Button onClick={() => play()}>重新播放</Button>
                        <Button
                            variant="secondary"
                            onClick={() => props.onBack()}
                        >
                            返回
                        </Button>
                    </Space>
                )}
            </>
        </div>
    );
}
