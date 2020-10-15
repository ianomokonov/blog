import { Component, HostListener, OnInit } from '@angular/core';

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

  planets: Planet[] = [
    {
      type: PlanetType.Earth,
      classes: ['planet-lg', 'earth', 'current'],
    },
    {
      type: PlanetType.Moon,
      classes: ['planet-sm', 'moon', 'next'],
    },
    {
      type: PlanetType.Sun,
      classes: ['planet-sm', 'sun', 'prev'],
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  onPlanetClick(planet: Planet): void {
    if (planet.classes.indexOf('current') > -1) {
      return;
    }
    const currentPlanet = this.planets.find(
      (planett) => planett.classes.indexOf('current') > -1
    );

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
  classes: string[];
}

export enum PlanetType {
  Moon,
  Earth,
  Mars,
  Sun,
}
