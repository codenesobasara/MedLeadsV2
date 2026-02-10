import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralFunctions {
  
getDateRange(startDate: string, endDate: string) {
  const dateArray: string[] = [];
  let currentDate = new Date(startDate);
  let stopDate = new Date(endDate);
  currentDate.setHours(0, 0, 0, 0);
  stopDate.setHours(0, 0, 0, 0);
  while (currentDate <= stopDate) {
    dateArray.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

formatAmPm(hourStr: string): string {
  const hour = parseInt(hourStr, 10);
  if (isNaN(hour)) return hourStr;

  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour} ${ampm}`;
}
}
