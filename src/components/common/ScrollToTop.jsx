import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Instantly snaps the page to the top left margin corner coordinates
        window.scrollTo(0, 0);
    }, [pathname]); // Fires every single time the route path changes

    return null; // This component doesn't need to render any HTML markup
};

export default ScrollToTop;
