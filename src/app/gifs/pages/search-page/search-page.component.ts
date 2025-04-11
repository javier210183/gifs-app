import {  Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../components/services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
 
})
export default class SearchPageComponent { 
  
gifService = inject(GifService)
gifs = signal<Gif[]>([]);

onSearch(query: string) {
    this.gifService.searchGifs(query)
    .subscribe((response) =>{
      this.gifs.set(response);
    });
  }

}
