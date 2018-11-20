import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService {

  private static readonly years = [2018, 2019, 2020];
  private static readonly months = [
    {number: 1, text: 'January'},
    {number: 2, text: 'February'},
    {number: 3, text: 'March'},
    {number: 4, text: 'April'},
    {number: 5, text: 'May'},
    {number: 6, text: 'June'},
    {number: 7, text: 'July'},
    {number: 8, text: 'August'},
    {number: 9, text: 'September'},
    {number: 10, text: 'October'},
    {number: 11, text: 'November'},
    {number: 12, text: 'December'},
  ];

  constructor() { }

  /**
   * Get months
   */
  public static getMonths(): {number: number, text: string}[] {
    return DateService.months;
  }

  /**
   * Get active years
   */
  public static getYears(): number[] {
    return DateService.years;
  }

  public static getMonthAsString(num: number): string {
    return DateService.months.find(mo => mo.number === num).text;
  }
}
