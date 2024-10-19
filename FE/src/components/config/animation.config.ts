export const mobileNavContainerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

export const mobileNavListVariant = {
    hidden: { y: -10, height: 0, opacity: 0 },
    show: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.1 } },
};

export const mobileNavExitProps = {
    exit: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.1, ease: "easeIn" },
    },
};