'use client';

import { useState } from 'react';
import { css } from '@emotion/css';
import { Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import dayjs from 'dayjs';
import { File, FolderUp } from 'lucide-react';

import { FORMAT_DATE } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface UploaderProps {
    onFileChange:
        | ((info: UploadChangeParam<UploadFile<any>>) => void)
        | undefined;
    file: UploadFile | undefined;
    setFile: (file: UploadFile | undefined) => void;
}

export default function Uploader(props: UploaderProps) {
    const { file, setFile } = props;
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const getSize = (): string => {
        const size = (file?.size as number) / 1024;
        if (size >= 1024) {
            return `${(size / 1024).toFixed(2)}MB`;
        } else {
            return `${size.toFixed(2)}KB`;
        }
    };

    const onRemoveFile = () => {
        setFile(undefined);
        setFileList([]);
    };
    return (
        <>
            <Upload.Dragger
                name="file"
                style={{
                    background: 'white',
                    boxShadow: 'rgba(145, 161, 187, 0.2) 0px 5px 10px',
                    border: '0.5px solid rgb(223, 229, 240)',
                }}
                onChange={props.onFileChange}
                showUploadList={false}
                customRequest={() => ({})}
                fileList={fileList}
                openFileDialogOnClick={!file}
                id="upload"
            >
                {file ? (
                    <div
                        className={css`
                            padding: 34px 60px;
                            cursor: default;
                        `}
                    >
                        <div
                            className={css`
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            `}
                        >
                            <File />
                            <span
                                className={css`
                                    font-size: 16px;
                                    font-weight: 500;
                                    margin-left: 8px;
                                `}
                            >
                                {file?.name}
                            </span>
                        </div>
                        <div
                            className={css`
                                margin-top: 5px;
                                font-size: 12px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            `}
                        >
                            <div>
                                <span
                                    className={css`
                                        color: #4c576c;
                                    `}
                                >
                                    文件大小：
                                    {getSize()}
                                </span>
                                <span className={css``}></span>
                            </div>
                            <div
                                className={css`
                                    margin-left: 16px;
                                `}
                            >
                                <span
                                    className={css`
                                        color: #4c576c;
                                    `}
                                >
                                    导入日期：
                                </span>
                                <span>{dayjs().format(FORMAT_DATE)}</span>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: 5,
                                fontSize: 12,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                onClick={() => {
                                    document.getElementById('upload')?.click();
                                }}
                                variant="link"
                            >
                                重新导入
                            </Button>
                            <Button
                                style={{ marginLeft: 16 }}
                                onClick={(e) => {
                                    onRemoveFile();
                                    e.stopPropagation();
                                }}
                                variant="link"
                            >
                                删除
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={css`
                            padding: 16px 0;
                            font-size: 16px;
                            font-weight: 500;
                        `}
                    >
                        <div className="flex justify-center">
                            <FolderUp />
                        </div>
                        <div>点击导入或将文件拖拽到此处</div>
                    </div>
                )}
            </Upload.Dragger>
        </>
    );
}
