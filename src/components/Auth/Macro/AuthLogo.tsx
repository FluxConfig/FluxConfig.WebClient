import LogoIcon from "../../Icons/LogoIcon.tsx";

function AuthLogo() {
    return (
        <>
            <LogoIcon
                sx={{
                    width: { xs: 70, sm: 80, md: 110 },
                    height: { xs: 70, sm: 80, md: 110 },
                    '& svg': {
                        width: '100%',
                        height: '100%'
                    },
                    margin: '-18px',
                    flexShrink: 0
                }}
            />
        </>
    );
}

export default AuthLogo;