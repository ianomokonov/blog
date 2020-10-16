import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
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
    this.delta = $event.deltaY;
    setTimeout(() => {
      if ($event.deltaY == this.delta) {
        this.isScrolled = true;
      }
    }, 50);
  }
  @HostListener('document:keydown.ArrowUp') onArrowUp() {
    this.swipePrev();
  }
  @HostListener('document:keydown.ArrowDown') onArrowDown() {
    this.swipeNext();
  }
  constructor(private cdRef: ChangeDetectorRef) {}

  public makets = [
    {
      id: 1,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: true,
      isPrev: false,
      isNext: false,
      index: 0,
    },
    {
      id: 2,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: false,
      isPrev: false,
      isNext: true,
    },
    {
      id: 3,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: false,
      isPrev: false,
      isNext: true,
    },
    {
      id: 4,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: false,
      isPrev: false,
      isNext: true,
    },
    {
      id: 3,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: false,
      isPrev: false,
      isNext: true,
    },
    {
      id: 4,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: false,
      isPrev: false,
      isNext: true,
    },
    {
      id: 3,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: false,
      isPrev: false,
      isNext: true,
    },
    {
      id: 4,
      img: '../../assets/iphone.png',
      title: 'Lorem ipsum dolor sit amet.',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet in
            sapiente quaerat odit possimus nobis modi et repellendus dolores
            cum.`,
      isActive: false,
      isPrev: false,
      isNext: true,
    },
  ];

  public currentMakets = [];

  ngOnInit(): void {
    this.onScroll$.subscribe(({ deltaY }) => {
      if (deltaY > 0) {
        this.swipeNext();
        return;
      }
      this.swipePrev();
    });
    this.makets.forEach((maket, i) => (maket.index = i));
    this.currentMakets = this.makets.slice(0, 4);
  }

  swipeNext() {
    let activeIndex = this.makets.findIndex((maket) => maket.isActive);
    if (activeIndex == this.makets.length - 1) {
      return;
    }
    if (
      activeIndex + 2 < this.makets.length &&
      activeIndex + 2 ==
        this.currentMakets[this.currentMakets.length - 1].index + 1
    ) {
      this.currentMakets = this.makets.slice(activeIndex - 1, activeIndex + 3);
    }

    this.makets[activeIndex].isActive = false;
    this.makets[activeIndex].isPrev = true;
    this.makets[activeIndex + 1].isNext = false;
    this.makets[activeIndex + 1].isActive = true;
  }

  swipePrev() {
    let activeIndex = this.makets.findIndex((maket) => maket.isActive);
    if (activeIndex == 0) {
      return;
    }
    if (
      activeIndex - 2 > -1 &&
      activeIndex - 2 == this.currentMakets[0].index - 1
    ) {
      this.currentMakets = this.makets.slice(activeIndex - 2, activeIndex + 2);
    }

    this.makets[activeIndex].isActive = false;
    this.makets[activeIndex].isNext = true;
    this.makets[activeIndex - 1].isPrev = false;
    this.makets[activeIndex - 1].isActive = true;
  }

  onMaketClick(globalIndex: number, index: number) {
    this.currentMakets.forEach((maket) => {
      maket.isActive = maket.index == globalIndex;
      maket.isPrev = maket.index < globalIndex;
      maket.isNext = maket.index > globalIndex;
    });
    if (index <= 1 && globalIndex > 0) {
      this.currentMakets = this.makets.slice(globalIndex - 1, globalIndex + 3);
    }
    if (
      index >= this.currentMakets.length - 2 &&
      globalIndex + 2 < this.makets.length + 1
    ) {
      this.currentMakets = this.makets.slice(globalIndex - 2, globalIndex + 2);
    }
  }
}
