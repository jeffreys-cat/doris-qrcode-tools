'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UploadFile } from 'antd';

import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';

import QRCodeHelper from './components/qrcode-helper';
import QRCodePlayer from './components/qrcode-player';
import Uploader from './components/uploader';

interface Play {
    status: 'preparing' | 'playing' | 'done';
    text: string;
}

export default function IndexPage() {
    const [file, setFile] = useState<UploadFile>();
    const [text, setText] = useState('');
    const [play, setPlay] = useState<Play>({
        status: 'preparing',
        text: text,
    });
    useEffect(() => {
        if (file) {
            getTextFromFile();
        }
    }, [file]);
    async function getTextFromFile() {
        if (file) {
            const fileToText = (await file?.originFileObj?.text()) || '';
            console.log('fileToText', fileToText);
            setText(fileToText);
        }
    }
    return (
        <section className="container grid items-center gap-6 pb-8 w-[1000px] mx-auto">
            {play.status === 'preparing' ? (
                <>
                    <Uploader
                        file={file}
                        setFile={(file: UploadFile | undefined) =>
                            setFile(file)
                        }
                        onFileChange={(info) => setFile(info.file)}
                    />
                    <QRCodeHelper
                        onFinish={(values: any) => {
                            console.log(values);
                            if (values.type === 'text') {
                                setPlay({ status: 'playing', text: text });
                            }
                        }}
                        disabled={!file}
                    />
                </>
            ) : (
                <QRCodePlayer
                    text={text}
                    onBack={() => setPlay({ status: 'preparing', text: '' })}
                />
            )}
        </section>
    );
}
