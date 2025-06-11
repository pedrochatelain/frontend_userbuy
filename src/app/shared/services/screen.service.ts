import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .pipe(map(result => result.matches))
      .subscribe(isMobile => this.isMobileSubject.next(isMobile));
  }

  isMobile(): boolean {
    return this.isMobileSubject.getValue();
  }
}
