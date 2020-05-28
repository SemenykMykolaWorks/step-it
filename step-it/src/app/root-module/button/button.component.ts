import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  public page: number = 1;
  public id: number = 1;
  public numberOfPage: number;
  public childWindowHandles = [];
  public random: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorageService: LocalStorageService) {
    const id = this.localStorageService.get('id');
    if (id) {
      this.interval();
    } else {
      this.localStorageService.set('id', this.page + '');
      this.numberOfPage = this.page;
    }
  }

  public ngOnInit(): void {
    if (this.route.snapshot.url[0]) {
      this.id = +this.route.snapshot.url[0].path;
    }
    this.random = Math.round(Math.random() * 100);
  }

  public openWindow(): void {
    this.page += 1;
    const id = '/' + this.page;
    this.localStorageService.set('id', this.page + '');
    this.childWindowHandles[this.childWindowHandles.length] = window.open(id);
    this.interval();
  }

  public interval() {
    setInterval(() => {
      this.numberOfPage = this.localStorageService.get('id');
    }, 500);
  }

  public closeWindow() {
    for (let i = 0; i < this.childWindowHandles.length; i++) {
      if (!this.childWindowHandles[i].closed) {
        if (i % 2 == 0) {
          this.childWindowHandles[i].close();
          this.page -= 1;
          this.localStorageService.set('id', this.page + '');
        }
      }
    }
  }

}
