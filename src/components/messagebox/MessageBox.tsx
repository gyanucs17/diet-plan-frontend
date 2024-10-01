import React from 'react';

interface MessageBoxProps {
    message: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
    return (
        <>
            {message && <div className="message-box">{message}</div>}
        </>
    );
};

export default MessageBox;
