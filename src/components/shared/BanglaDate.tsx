"use client";

import { useSyncExternalStore } from "react";

type BanglaDateProps = {
    className?: string;
};

const banglaDateFormatter = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    numberingSystem: "beng",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});

const getClientDate = () => banglaDateFormatter.format(new Date());
const getServerDate = () => null;
const subscribeToNothing = () => () => {};

const BanglaDate = ({ className }: BanglaDateProps) => {
    const today = useSyncExternalStore(
        subscribeToNothing,
        getClientDate,
        getServerDate
    );

    return <span className={className}>{today}</span>;
};

export default BanglaDate;