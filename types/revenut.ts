import { subMonths, startOfMonth, startOfDay, endOfDay, endOfMonth } from "date-fns";

export class RevenutData {
    public IsAuthorized: boolean = false;
    public Status:string = "";
    public AccountID: string = "";
    public AccountName: string = "";
    public AccountIconURL: string = "";
    public AuthorizationCode:string = "";
    public TimezonePreference:string = "";
    public VolumeGrossToday:number = 0;
    public VolumeGrossMonthCurrent:number = 0;
    public VolumeGrossMonthCurrentPercent:number = 33.333333333333333;
    public VolumeGrossMonthPrevious:number = 0;
    public VolumeGrossMonthToDatePrevious:number = 0;
    public VolumeGrossMonthForecast:number = 0;
    public VolumeGrossMonthOverMonthPercentChange:number = 0;
    public VolumeGrossMonthToMonthPercentChange:number = 0;
    public VolumePending:number = 0;
    public VolumePendingPercent:number = 33.333333333333333;
    public VolumeTrialing:number = 0;
    public VolumeTrialingPercent:number = 33.333333333333333;
    public CountPaymentsToday:number = 0;
    public CountTrialingToday:number = 0;
    public CountTrialingMonthCurrent:number = 0;
    public CountCustomersMonthCurrent:number = 0;
    public CountCustomersMonthPrevious:number = 0;
    public CountCustomersMonthOverMonthPercentChange:number = 0;
}

export class RevenutDates {
    public DateToday:Date = new Date();
    public DateDayStartCurrent:Date = startOfDay(this.DateToday);
    public DateDayEndCurrent:Date = endOfDay(this.DateToday);
    public DateMonthStartCurrent:Date = startOfMonth(this.DateToday);
    public DateMonthEndCurrent:Date = endOfMonth(this.DateToday);
    public DateMonthToDateCurrent:Date = this.DateToday;
    public DateMonthToDatePrevious:Date = subMonths(this.DateToday, 1);
    public DateMonthStartPrevious:Date = startOfMonth(this.DateMonthToDatePrevious);
    public DateMonthEndPrevious:Date = endOfMonth(this.DateMonthToDatePrevious);
}