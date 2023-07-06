import { format } from "date-fns";

export function displayCurrency(n: number): string {
    return new Intl.NumberFormat('en-US', {style:'currency', currency: 'USD'}).format(n);
}

export function displayCompactNumber(n: number): string {
    return new Intl.NumberFormat('en', {maximumFractionDigits: 2, minimumFractionDigits: 2, notation: "compact", compactDisplay: "short"}).format(n);
}

export function displayMonthDate(d: Date): string {
    return format(d, 'LLL d');
}