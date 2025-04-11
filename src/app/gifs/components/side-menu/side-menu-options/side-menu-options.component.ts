import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gifs.service';

interface MenuOption {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink, RouterLinkActive,
  ],
  templateUrl: './side-menu-options.component.html',

})
export class SideMenuOptionsComponent {


gifServices = inject(GifService);





  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Gifs Populares',
      route: '/dashboard/trending'
    
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscar',
      sublabel: 'Buscar gifs',
      route: '/dashboard/search'
    
    },
    
    ]
    
 }
