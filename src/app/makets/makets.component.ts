import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-makets',
  templateUrl: './makets.component.html',
  styleUrls: ['./makets.component.less'],
})
export class MaketsComponent implements OnInit {
  private onScroll$: Subject<WheelEvent> = new Subject();
  isScrolled = true;
  delta = 0;
  @HostListener('document:wheel', ['$event']) doSth($event: WheelEvent) {
    if (this.isScrolled) {
      this.onScroll$.next($event);
    }
    this.isScrolled = false;
    setTimeout(() => {
      if ($event.deltaY == this.delta) {
        this.isScrolled = true;
      }
    }, 50);
  }
  @HostListener('document:mousedown', ['$event']) onTouchEnd($event) {
    console.log($event);
  }
  constructor() {}

  ngOnInit(): void {
    this.onScroll$.pipe(throttleTime(2000)).subscribe(({ deltaY }) => {
      if (deltaY > 0) {
        this.swipeNext();
        return;
      }
      this.swipePrev();
    });
  }

  swipeNext() {
    console.log('next');
  }

  swipePrev() {
    console.log('prev');
  }
}
