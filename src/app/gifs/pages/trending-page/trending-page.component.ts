import {  Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../components/services/gifs.service';

// const imageUrls: string[] = [
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
 
})
export default class TrendingPageComponent {

  gifsService = inject(GifService);

  // gifs = computed(() => this.gifsService.trendingGifs()); // Obtenemos los gifs de la señal
  
 }
