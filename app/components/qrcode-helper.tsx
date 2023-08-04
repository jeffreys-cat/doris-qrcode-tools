'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import QRCodeGuideImg from '../../public/qrcode-guide.png';

interface QRCodeHelperProps {
    onFinish: (value: any) => void;
    disabled: boolean;
}

export default function QRCodeHelper(props: QRCodeHelperProps) {
    const [envConfirmed, setEnvConfirmed] = useState(false);
    const [type, setType] = useState('text');
    const { disabled } = props;
    return (
        <Card>
            <CardHeader>
                <CardTitle>播放动态二维码</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Alert variant="default">
                        <AlertDescription>
                            适用场景：网络环境不允许直接传出文件，且需要对
                            Profile 文件进行分析。
                        </AlertDescription>
                    </Alert>
                    <div style={{ margin: '16px 0' }}>操作指引</div>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Image
                            src={QRCodeGuideImg}
                            alt="qrcode-img"
                            width={432}
                            height={36}
                        />
                    </div>
                    <RadioGroup
                        value={type}
                        className="mt-5 flex"
                        onValueChange={(value) => {
                            setType(value);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="text" id="r1" />
                            <Label htmlFor="r1">文本</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="binary" id="r2" />
                            <Label htmlFor="r2">压缩</Label>
                        </div>
                    </RadioGroup>
                    <div className="mt-5 flex items-center space-x-2">
                        <Checkbox
                            id="env"
                            checked={envConfirmed}
                            onCheckedChange={(checked) =>
                                setEnvConfirmed(checked as boolean)
                            }
                        />
                        <label
                            htmlFor="env"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            我确认拍摄屏幕传递文件在当前使用环境下是合规的。
                        </label>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div>
                    <Button
                        disabled={!envConfirmed || disabled}
                        onClick={() => {
                            props.onFinish({
                                type,
                            });
                        }}
                    >
                        完成并播放
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
