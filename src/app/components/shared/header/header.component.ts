import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any;
  isUserModalVisible: boolean = false;

  constructor(
    public _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    console.log(this.user);
  }

}
