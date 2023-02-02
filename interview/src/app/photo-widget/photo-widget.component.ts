import { Component,OnInit } from '@angular/core';
import { UnsplashService } from '../unsplash.service';
import { FormBuilder,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styleUrls: ['./photo-widget.component.css']
})
export class PhotoWidgetComponent {
  public searchQuery = new FormControl('')
  public lastQuery = new FormControl('')
  public randomImage:Observable<any> | undefined;

  private refreshInterval: number = 2;

  constructor(
    private service:UnsplashService

  ) {}

  ngOnInit(){
    this.randomImage = this.service.getRandomPhoto()
    this.startTimer()
    this.onChanges();
  }

  onChanges(): void {
    this.searchQuery.valueChanges.subscribe(val => {
      
    });
  }
  
  startTimer() {
    let interval = setInterval(() => {
      if(this.refreshInterval > 0) {
        this.refreshInterval--;
      } else {
        this.refreshInterval = 2;
        //checks every two seconds to see if the current search text is different from the previous search text. Calls api when search text is different.
        if (this.searchQuery.value != null && this.searchQuery.value != this.lastQuery.value){
          this.randomImage = this.service.getRandomPhoto(this.searchQuery.value)
          this.lastQuery = this.searchQuery
        }
      }
    },1000)
  }

}
