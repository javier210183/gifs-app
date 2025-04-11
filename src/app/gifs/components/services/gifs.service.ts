import {inject, Injectable, signal, computed, effect } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import type { GiphyResponse } from '../../interfaces/giphy.interfaces';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalstorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';//Record<string, gifs[]>
    const gifs = JSON.parse( gifsFromLocalStorage );
    console.log(gifs);
    return gifs;


}



@Injectable({providedIn: 'root'})

export class GifService {
    private http = inject(HttpClient);//inyectamos al cliente http

    trendingGifs= signal<Gif[]>([]) // Creamos una señal para almacenar los gifs
    trendingGifsLoading = signal(true); // Creamos una señal para almacenar el estado de carga de los gifs

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalstorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor() { 
        this.loadTrendingGifs();
        
    }

    saveGifsToLocalStorage = effect(() =>{
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY,historyString);

    })

    loadTrendingGifs() {

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20',
            },
        }).subscribe((response) => {
           const gifs =GifMapper.mapGiphyItemsToGifArray(response.data); //mapeamos los gifs
           this.trendingGifs.set(gifs); //asignamos los gifs a la señal
           this.trendingGifsLoading.set(false); //cambiamos el estado de carga a false
           console.log({gifs}); //mostramos los gifs en consola
            
        });  

    }

    searchGifs(query: string): Observable<Gif[]>{

       return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20',
                q: query,
            },
        }).pipe(
            map(({data}) => data),
            map((item) =>GifMapper.mapGiphyItemsToGifArray(item)),

            //TODO HISTORIAL
            tap(items => {
                this.searchHistory.update( history =>({
                  ...history,
                  [query.toLocaleLowerCase()]  : items,
                }))
            })
        );

        
        // .subscribe((response) => {
        //    const gifs =GifMapper.mapGiphyItemsToGifArray(response.data); //mapeamos los gifs
           
        //    console.log({ search:gifs }); //mostramos los gifs en consola
            
        // });  

    }

    getHistoryGifs( query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }
}
    
