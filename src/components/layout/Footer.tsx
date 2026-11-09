import React from 'react';

const Footer = () => {
    return (
        <div className="w-full bg-[#f8faf9] border-t border-[#e5eee8] mt-auto">
            <div className = "max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-[14px] text-[#1E1E1E]">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p className="text-[14px] text-[#1E1E1E]">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </div>
    );
};

export default Footer;