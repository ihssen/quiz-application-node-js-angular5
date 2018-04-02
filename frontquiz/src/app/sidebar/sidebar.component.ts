import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home',  icon: 'fa fa-home', class: '' },
    { path: 'candidate/new', title: 'Add candidate',  icon:'glyphicon glyphicon-user', class: '' },
    { path: 'candidates/list', title: 'List candidates',  icon:'fa fa-group', class: '' },
    { path: 'typography', title: 'All results',  icon:'fa fa-graduation-cap', class: '' },
    { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
];

@Component({
    // moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {

    constructor(public auth: AuthService) { }

    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
}
