import { Component,OnInit } from '@angular/core';
import { UnsplashService } from '../unsplash.service';
import { FormBuilder,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { PhotoSearch,Photo } from '../photo';
import { map, catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styleUrls: ['./photo-widget.component.css']
})
export class PhotoWidgetComponent {
  public searchQuery = new FormControl('')
  public lastQuery = ''
  public photos:any[] = [];

  public selectedPhoto:any;



  private refreshInterval: number = 2;

  constructor(
    private service:UnsplashService,
    
  ) {}

  ngOnInit(){
    this.service.getRandomPhotos(2,"").subscribe( newPhotos => {
      console.log(newPhotos)
      this.photos=newPhotos
    })

    this.startTimer()
    this.onChanges();
  }

  onChanges(): void {
    this.searchQuery.valueChanges.subscribe(val => {
      console.log(val)
    });
  }
  
  startTimer() {
    let interval = setInterval(() => {
      if(this.refreshInterval > 0) {
        this.refreshInterval--;
      } else {
        this.refreshInterval = 2;

        //checks every two seconds to see if the current search text is different from the previous search text. Calls api when search text is different.
        console.log(this.lastQuery)
        console.log(this.searchQuery.value)
        if (this.searchQuery.value != null && this.searchQuery.value != this.lastQuery){
          this.service.getRandomPhotos(5,this.searchQuery.value).subscribe( newPhotos => {
            this.photos=newPhotos
          })
          this.lastQuery = this.searchQuery.value
        }
      }
    },1000)
  }

  selectPhoto(photoObject:any){
    console.log(photoObject)
    this.selectPhoto = photoObject
  }

}
