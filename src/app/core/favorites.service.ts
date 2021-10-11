import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favoriteLaunches';
  constructor() {}

  public add(slug: string): void {
    const favoriteLaunches = this.getList();
    if (favoriteLaunches.indexOf(slug) === -1) {
      favoriteLaunches.push(slug);
      this.saveList(favoriteLaunches);
    }
  }
  public remove(slug: string): void {
    const favoriteLaunches = this.getList();
    const favoriteIndex = favoriteLaunches.indexOf(slug);
    if (favoriteIndex !== -1) {
      favoriteLaunches.splice(favoriteIndex, 1);
      this.saveList(favoriteLaunches);
    }
  }
  public getList(): string[] {
    const favoriteLaunchesStored = localStorage.getItem(this.favoritesKey) || '[]';
    const favoriteLaunches: string[] = JSON.parse(favoriteLaunchesStored);
    return favoriteLaunches;
  }
  private saveList(favoriteLaunches: string[]): void {
    const favoriteLaunchesStored = JSON.stringify(favoriteLaunches);
    localStorage.setItem(this.favoritesKey, favoriteLaunchesStored);
  }
}
