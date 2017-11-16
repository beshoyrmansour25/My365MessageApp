import { Message } from './message.interface';
export interface User {
    $key: string;
    senderName: string;
    username: string;
    email: string;
    receiverName: string;
    PassCode: string;
    startDate: Date;
    messages: Message[];
}
