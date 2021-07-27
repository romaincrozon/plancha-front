import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/icons",
    title: "Icons",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/planning",
    title: "Plan de charge",
    icon: "icon-calendar-60",
    class: "" },
  {
    path: "/projects",
    title: "Projets",
    icon: "icon-bank",
    class: ""
  },
  {
    path: "/request",
    title: "Demandes",
    icon: "icon-cart",
    class: ""
  },
  {
    path: "/competences",
    title: "Comp&eacute;tences",
    icon: "icon-molecule-40",
    class: ""
  },
  {
    path: "/todo",
    title: "Todo list",
    icon: "icon-bullet-list-67",
    class: ""
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
