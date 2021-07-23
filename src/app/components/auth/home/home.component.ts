import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CryptojsService } from 'src/app/services/cryptojs/cryptojs.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoader: boolean = false;
  user: any;
  data: any[] = [];
  quantity: number = 0;
  requirements: any[] = [];
  limit: number = 10;
  pages: number = 0;
  currentPage: number = 1;
  currentRequirement: any = null;
  isCreatingRequirement: boolean = false;
  creationUpdateRequirement: any = {
    title: '',
    description: ''
  };
  creationUpdateComment: any = {
    description: ''
  };
  isCommentSectionVisible: boolean = false;
  optionFilter: number = 0;
  public Editor = ClassicEditor;

  constructor(
    private _restService: RestService,
    private _cryptojsService: CryptojsService,
    private _utilsService: UtilsService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.isLoader = true;
      this._cryptojsService.decryptStorage('user') ? this.user = this._cryptojsService.decryptStorage('user') : this._utilsService.logout();
      this.data = await Promise.all([this._restService.getRequirementsQuantity(), this._restService.getRequirements(1, this.limit)]);
      this.quantity = this.data[0].quantity;
      this.pages = Math.ceil(this.quantity / this.limit);
      this.requirements = this.data[1];
      this.isLoader = false;
    } catch {
      this.isLoader = false;
      this._utilsService.logout();
    }
  }

  async filter(option: any): Promise<void> {
    try {
      this.isLoader = true;
      this.optionFilter = option.value;
      this.requirements = await this._restService.getRequirements(1, this.limit, this.optionFilter);
      this.isLoader = false;
    } catch {
      this.isLoader = false;
    }
  }

  async changeQuantity(option: string): Promise<void> {
    const l = this.limit;
    try {
      this.limit = option === 'more' ? this.limit + 1 : this.limit > 1 ? this.limit - 1 : this.limit;
      this.isLoader = true;
      this.requirements = await this._restService.getRequirements(1, this.limit, this.optionFilter);
      this.pages = Math.ceil(this.quantity / this.limit);
      this.currentPage = 1;
      this.isLoader = false;
    } catch {
      this.limit = l;
      this.isLoader = false;
    }
  }

  async setCurrentPage(page: number): Promise<void> {
    try {
      this.currentPage = page;
      this.isLoader = true;
      this.requirements = await this._restService.getRequirements(page, this.limit, this.optionFilter);
      this.isLoader = false;
    } catch {
      this.isLoader = false;
    }
  }

  async setCurrentRequirement(item: any) {
    try {
      this.currentRequirement = item;
      this.creationUpdateRequirement.title = this.currentRequirement.title;
      this.creationUpdateRequirement.description = this.currentRequirement.description;
      document.body.style.overflow = "hidden";
    } catch {
      this.currentRequirement = null;
    }
  }

  setCurrentRequirementAsNull() {
    this.requirements = this.requirements.map((requirement: any) => (requirement.id === this.currentRequirement.id ? { ...this.currentRequirement } : { ...requirement }));
    this.currentRequirement = null;
    this.creationUpdateRequirement.title = '';
    this.creationUpdateRequirement.description = '';
    document.body.style.overflow = "auto";
  }

  async createComment(): Promise<void> {
    try {
      this.isLoader = true;
      await this._restService.createRequirementComments(this.currentRequirement.id, this.user.id, this.creationUpdateComment.description);
      this.creationUpdateComment.description = '';
      this.isCommentSectionVisible = false;
      this.currentRequirement = await this._restService.readRequirement(this.currentRequirement.id);
      this.isLoader = false;
    } catch {
      this.creationUpdateComment.description = '';
      this.isCommentSectionVisible = false;
      this.isLoader = false;
    }
  }

  async createUpdateRequirement(isCreating: number): Promise<void> {
    try {
      this.isLoader = true;
      if (isCreating === 1) {
        await this._restService.createRequirement(this.user.id, this.creationUpdateRequirement.title, this.creationUpdateRequirement.description);
        this.closeCreationModal();
      } else {
        await this._restService.updateRequirement(this.currentRequirement.id, this.creationUpdateRequirement.title, this.creationUpdateRequirement.description);
        this.creationUpdateComment.title = '';
        this.creationUpdateComment.description = '';
        this.isCreatingRequirement = false;
        this.isCommentSectionVisible = false;
        this.currentRequirement = null;
      }
      this.data = await Promise.all([this._restService.getRequirementsQuantity(), this._restService.getRequirements(1, this.limit, this.optionFilter)]);
      this.currentPage = 1;
      this.quantity = this.data[0].quantity;
      this.pages = Math.ceil(this.quantity / this.limit);
      this.requirements = this.data[1];
      this.isLoader = false;
    } catch {
      this.closeCreationModal();
      this.isLoader = false;
    }
  }

  async saveReaction(isLike: boolean): Promise<void> {
    try {
      console.log('current', this.currentRequirement);
      this.isLoader = true;
      let oldValue: string = '';
      let newValue: any = '';
      let pos: any = this.currentRequirement.vote.positive.find((vote: any) => vote.id === this.user.id);
      let neg: any = this.currentRequirement.vote.negative.find((vote: any) => vote.id === this.user.id);
      if (pos) {
        oldValue = 'positive';
        newValue = isLike ? '' : 0;
      } else if (neg) {
        oldValue = 'negative';
        newValue = isLike ? 1 : '';
      } else {
        newValue = isLike ? 1 : 0;
      }
      await this._restService.updateRequirementVotes(this.currentRequirement.id, this.user.id, oldValue, newValue);
      this.currentRequirement = await this._restService.readRequirement(this.currentRequirement.id);
      this.isLoader = false;
      oldValue = '';
      newValue = '';
    } catch {
      this.isLoader = false;
    }
  }

  closeCreationModal() {
    this.isCreatingRequirement = false;
    this.creationUpdateRequirement.title = '';
    this.creationUpdateRequirement.description = '';
    document.body.style.overflow = "auto";
  }

  isVoteFound(option: string, id: number) {
    return this.currentRequirement.vote[option].some((vote: any) => vote.id === id) || false;
  }

}