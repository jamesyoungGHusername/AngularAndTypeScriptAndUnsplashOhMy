import { Component,OnInit } from '@angular/core';
import { UnsplashService } from '../unsplash.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styleUrls: ['./photo-widget.component.css']
})
export class PhotoWidgetComponent {

  public randomImage:Observable<any> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service:UnsplashService
  ) {}

  ngOnInit(){
    this.randomImage = this.service.getRandomPhoto()
  }

}
