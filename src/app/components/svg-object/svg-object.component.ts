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

  // randomize(min: number, max: number) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  ngAfterViewInit(): void {
    const circles = this.circle.map((cir) => cir.nativeElement);
    const circles2 = this.circle2.map((cir) => cir.nativeElement);
    const circles3 = this.circle3.map((cir) => cir.nativeElement);
    const colors = {
      primary: '#FDCE56',
      secondary: '#373596',
      accent1: '#1AFFD6',
      accent2: '#FF429D',
    };

    const staggering = gsap.timeline({
      defaults: {
        transformOrigin: 'top center',
        ease: 'power3.inOut',
        duration: 2.75,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        stagger: 0.125,
      },
    });

    staggering
      .to(
        this.element.nativeElement,
        {
          '--progress-end': '40%',
          ease: 'power2.inOut',
        },
        0
      )
      .fromTo(
        circles,
        {
          scale: 0.98,
          stroke: '#ffffff',
        },
        {
          scale: 2.25,
        },
        0
      )
      .fromTo(
        circles2,
        {
          x: -0.75,
          y: -0.75,
          scale: 0.98,
          stroke: '#FF447C',
        },
        {
          x: 0.25,
          y: 0.25,
          scale: 2.25,
          stroke: '#FF447C',
        },
        0.0125
      )
      .fromTo(
        circles3,
        {
          x: 0.75,
          y: 0.75,
          scale: 0.98,
          stroke: '#3FFFA3',
        },
        {
          x: -0.25,
          y: -0.25,
          scale: 2.25,
          stroke: '#3FFFA3',
        },
        0.0145
      )
      .to(
        this.theLight.nativeElement,
        {
          scale: 0.25,
          y: 20,
        },
        0.125
      );
  }
}
