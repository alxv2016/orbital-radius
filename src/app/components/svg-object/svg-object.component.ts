import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 'c-svg-object',
  templateUrl: './svg-object.component.html',
  styleUrls: ['./svg-object.component.scss'],
})
export class SvgObjectComponent implements AfterViewInit {
  @HostBinding('class') class = 'c-svg-object';
  @ViewChild('void') void!: ElementRef;
  @ViewChild('theLight') theLight!: ElementRef;
  @ViewChildren('circle', {read: ElementRef}) circle!: QueryList<ElementRef>;
  @ViewChildren('circle2', {read: ElementRef}) circle2!: QueryList<ElementRef>;
  @ViewChildren('circle3', {read: ElementRef}) circle3!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    const circles = this.circle.map((cir) => cir.nativeElement);
    const circles2 = this.circle2.map((cir) => cir.nativeElement);
    const circles3 = this.circle3.map((cir) => cir.nativeElement);

    const staggering = gsap.timeline({
      defaults: {
        transformOrigin: 'top center',
        ease: 'power3.inOut',
        duration: 2.25,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        stagger: {
          each: 0.125,
          from: 'start',
        },
      },
    });

    staggering
      .to(circles, {
        scaleX: 2.25,
        scaleY: 1.25,
        ease: 'back',
        y: 90,
      })
      .to(
        circles2,
        {
          scaleX: 2.25,
          scaleY: 1.25,
          ease: 'back',
          y: 91,
        },
        0.0125
      )
      .to(
        circles3,
        {
          scaleX: 2.25,
          scaleY: 1.25,
          ease: 'back',
          y: 89,
        },
        0.0135
      )
      .to(
        this.theLight.nativeElement,
        {
          scale: 2.75,
          y: -90,
          ease: 'elastic',
        },
        2.125
      );
  }
}
