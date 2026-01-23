    import type { ReactNode } from "react";
    import { UIContext } from "./UiContext";
    import { useMemo, useState } from "react";
    const UIProvider = ({ children }: { children: ReactNode }) => {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const value = useMemo(
        () => ({
        isSignInOpen,
        isSignUpOpen,
        openSignIn: () => {
            setIsSignUpOpen(false);
            setIsSignInOpen(true);
        },
        closeSignIn: () => setIsSignInOpen(false),
        openSignUp: () => {
            setIsSignInOpen(false);
            setIsSignUpOpen(true);
        },
        closeSignUp: () => setIsSignUpOpen(false),
        closeAll: () => {
            setIsSignInOpen(false);
            setIsSignUpOpen(false);
        },
        }),
        [isSignInOpen, isSignUpOpen],
    );

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
    };

    export default UIProvider;
