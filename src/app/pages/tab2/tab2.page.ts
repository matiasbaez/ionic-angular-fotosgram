import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { PostsService } from 'src/app/services/posts.service';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  post = {
    message: '',
    coords: null,
    position: false
  };
  loadingLocation: boolean = false;

  constructor(
    private postService: PostsService,
    private geolocation: Geolocation,
    private router: Router,
    private camera: Camera
  ) {}

  async createPost() {
    const created = await this.postService.createPost(this.post);

    this.post = {
      message: '',
      coords: null,
      position: false
    };

    this.tempImages = [];
    this.router.navigateByUrl('/main/tabs/tab1');
  }

  getLocation() {
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }

    this.loadingLocation = true;
    this.geolocation.getCurrentPosition().then((response) => {
      const coords = `${response.coords.latitude},${response.coords.longitude}`;
      this.loadingLocation = false;
      this.post.coords = coords;
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadingLocation = false;
    });
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImage(options);
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.processImage(options);
  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);

      this.postService.uploadImage(img);
      this.tempImages.push(img);
    }, (err) => {
      // Handle error
    });
  }

}
