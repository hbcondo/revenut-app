import { theme, extendTheme } from "native-base";

export const styles = extendTheme({
    revenut: {
        primary: "#E78E3A",
        secondary: "#F8EFED",
        tertiary: "#1871C5",
        paid: theme.colors.tertiary[600],
        trials: theme.colors.tertiary[300],
        open: theme.colors.emerald[100],
        previous: theme.colors.primary[900]
    }
});

export function getChangeColorScheme(changeType: number): string {
    let colorScheme: string = "coolGray";
    
    switch (changeType) {
        case 1: colorScheme = "success"; break;
        case -1: colorScheme = "error"; break;
    }

    return colorScheme;
}