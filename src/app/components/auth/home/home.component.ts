import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoader: boolean = false;
  data: any[] = [];
  quantity: number = 0;
  requirements: any[] = [];
  limit: number = 10;
  pages: number = 0;
  currentPage: number = 1;

  constructor(
    private _restService: RestService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.isLoader = true;
      this.data = await Promise.all([this._restService.getRequirementsQuantity(), this._restService.getRequirements(1, this.limit)]);
      this.quantity = this.data[0].quantity;
      this.pages = Math.ceil(this.quantity / this.limit);
      this.requirements = this.data[1];
      this.isLoader = false;
    } catch (e) {
      this.isLoader = false;
      console.log(e);
    }
  }

  async changeQuantity(option: string): Promise<void> {
    const l = this.limit;
    try {
      this.limit = option === 'more' ? this.limit + 1 : this.limit > 1 ? this.limit - 1 : this.limit;
      this.isLoader = true;
      this.requirements = await this._restService.getRequirements(1, this.limit);
      this.pages = Math.ceil(this.quantity / this.limit);
      this.currentPage = 1;
      this.isLoader = false;
    } catch (e) {
      this.limit = l;
      this.isLoader = false;
      console.log(e);
    }
  }

  async goToPage(page: number): Promise<void> {
    try {
      this.currentPage = page;
      this.isLoader = true;
      this.requirements = await this._restService.getRequirements(page, this.limit);
      this.isLoader = false;
    } catch (e) {
      this.isLoader = false;
      console.log(e);
    }
  }

}
