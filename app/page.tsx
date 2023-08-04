'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UploadFile } from 'antd';

import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';

import compressFile from './actions/compress-file';
import QRCodeHelper from './components/qrcode-helper';
import QRCodePlayer from './components/qrcode-player';
import Uploader from './components/uploader';

interface Play {
    status: 'preparing' | 'playing' | 'done';
    text: string;
}

export default function IndexPage() {
    const [file, setFile] = useState<UploadFile>();
    const [compressedText, setCompressedText] = useState('');
    const [play, setPlay] = useState<Play>({
        status: 'preparing',
        text: '',
    });
    // useEffect(() => {
    //     if (file) {
    //         getTextFromFile();
    //     }
    // }, [file]);

    async function getTextFromFile() {
        if (file) {
            const fileToText = (await file?.originFileObj?.text()) || '';
            return fileToText;
        }
        return '';
    }
    return (
        <section className="container mx-auto grid w-[1000px] items-center gap-6 pb-8">
            {play.status === 'preparing' ? (
                <>
                    <Uploader
                        file={file}
                        setFile={(file: UploadFile | undefined) =>
                            setFile(file)
                        }
                        onFileChange={async (info) => {
                            console.log(info);
                            const formData = new FormData();
                            formData.set('file', info.file?.originFileObj!);
                            setFile(info.file);
                            if ((info.file.size as number) <= 102400000) {
                                // setFile(info.file);
                            } else {
                                const formData = new FormData();
                                const compressedText = await compressFile(
                                    formData
                                );
                                console.log('compressedText', compressedText);
                                setCompressedText(compressedText);
                            }
                        }}
                    />
                    <QRCodeHelper
                        onFinish={async (values: any) => {
                            console.log(values);
                            if (values.type === 'text') {
                                const localText = await getTextFromFile();
                                setPlay({ status: 'playing', text: localText });
                            } else {
                                console.log('compressedText', compressedText);
                                setPlay({
                                    status: 'playing',
                                    text: compressedText,
                                });
                            }
                        }}
                        disabled={!file}
                    />
                </>
            ) : (
                <QRCodePlayer
                    text={play.text}
                    onBack={() => setPlay({ status: 'preparing', text: '' })}
                />
            )}
        </section>
    );
}
