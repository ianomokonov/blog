import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  @HostListener('document:keydown.ArrowLeft') doSth() {
    this.onPlanetClick(
      this.planets.find(
        (planett) =>
          planett.classes.indexOf('prev') > -1 &&
          planett.classes.indexOf('hidden') < 0
      )
    );
  }
  @HostListener('document:keydown.ArrowRight') go() {
    this.onPlanetClick(
      this.planets.find(
        (planett) =>
          planett.classes.indexOf('next') > -1 &&
          planett.classes.indexOf('hidden') < 0
      )
    );
  }
  @HostListener('document:keydown.Enter') onEnterDown() {
    const currentPlanet = this.planets.find(
      (planett) => planett.classes.indexOf('current') > -1
    );
    this.router.navigate([currentPlanet.url]);
  }

  zoom = 1;

  planets: Planet[] = [
    {
      type: PlanetType.Earth,
      zoom: 1,
      classes: ['planet-lg', 'earth', 'current'],
      title: 'Статьи',
      url: '/articles',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse error laboriosam iste dolorem laborum quasi, possimus dolore ea perspiciatis praesentium itaque commodi quis quibusdam incidunt, porro, nostrum consectetur facere? Incidunt?',
    },
    {
      type: PlanetType.Moon,
      zoom: 1.1,
      classes: ['planet-sm', 'moon', 'next'],
      title: 'Верстка',
      url: '/make-up',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse error laboriosam iste dolorem laborum quasi, possimus dolore ea perspiciatis praesentium itaque commodi quis quibusdam incidunt, porro, nostrum consectetur facere? Incidunt?',
    },
    {
      type: PlanetType.Sun,
      zoom: 1.2,
      classes: ['planet-sm', 'sun', 'prev'],
      title: 'Проекты',
      url: '/projects',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse error laboriosam iste dolorem laborum quasi, possimus dolore ea perspiciatis praesentium itaque commodi quis quibusdam incidunt, porro, nostrum consectetur facere? Incidunt?',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onPlanetClick(planet: Planet): void {
    if (planet.classes.indexOf('current') > -1) {
      return;
    }
    const currentPlanet = this.planets.find(
      (planett) => planett.classes.indexOf('current') > -1
    );
    this.zoom = planet.zoom;
    if (planet.classes.indexOf('next') > -1) {
      const prev = this.planets.find(
        (planett) =>
          planett.classes.indexOf('prev') > -1 &&
          planett.classes.indexOf('hidden') == -1
      );

      this.replaceClasses(
        currentPlanet,
        ['current', 'planet-lg'],
        ['prev', 'planet-sm']
      );
      this.replaceClasses(
        planet,
        ['planet-sm', 'next'],
        ['planet-lg', 'current']
      );
      this.replaceClasses(prev, ['prev'], ['next']);
      return;
    }

    if (planet.classes.indexOf('prev') > -1) {
      const next = this.planets.find(
        (planett) =>
          planett.classes.indexOf('next') > -1 &&
          planett.classes.indexOf('hidden') == -1
      );
      this.replaceClasses(
        currentPlanet,
        ['current', 'planet-lg'],
        ['next', 'planet-sm']
      );
      this.replaceClasses(
        planet,
        ['planet-sm', 'prev'],
        ['planet-lg', 'current']
      );
      this.replaceClasses(next, ['next'], ['prev']);
    }
  }

  replaceClasses(planet: Planet, curClass: string[], replaceClasses: string[]) {
    planet.classes = planet.classes.filter(
      (classs) => curClass.indexOf(classs) < 0
    );
    planet.classes.push(...replaceClasses);
  }
}

export interface Planet {
  type: PlanetType;
  zoom: number;
  classes: string[];
  title: string;
  url: string;
  description: string;
}

export enum PlanetType {
  Moon,
  Earth,
  Mars,
  Sun,
}
