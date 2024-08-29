import React from 'react';
import { LuAmpersand } from "react-icons/lu";

interface DNDBeyondLinkProps {
    text: string;
    baseUrl: string;
    section: string;
}

const DNDBeyondLink: React.FC<DNDBeyondLinkProps> = ({ text, baseUrl, section }) => {
    // Updated to remove all non-alphanumeric characters
    const formattedText = text.replace(/[^a-z0-9]/gi, '');
    const href = `${baseUrl}${section}${formattedText}`;

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="mr-2 text-red-500 hover:text-red-700">
            <LuAmpersand />
        </a>
    );
};

export default DNDBeyondLink;