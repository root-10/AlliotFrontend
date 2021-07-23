import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  // Auth Login solicitud

  postLogin(user: string, pass: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.rest.login}`, { user, pass }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  // Users solicitudes

  getUsers(page: number, limit: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.rest.users}?page=${page}&limit=${limit}`).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  createUser(user: string, pass: string, email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.rest.users, { user, pass, email }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  readUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.rest.users}/${id}`).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  updateUser(id: number, user: string, pass: string, email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.patch(`${environment.rest.users}/${id}`, { user, pass, email }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.rest.users}/${id}`).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  // Requirements solicitudes

  getRequirements(page: number, limit: number, option: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.rest.requirements}?page=${page}&limit=${limit}&option=${option}`).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  createRequirement(creator: string, title: string, description: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.rest.requirements, { creator, title, description }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  readRequirement(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.rest.requirements}/${id}`).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  updateRequirement(id: number, title: string, description: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.patch(`${environment.rest.requirements}/${id}`, { title, description }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  deleteRequirement(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.rest.requirements}/${id}`).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  getRequirementsQuantity(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.rest.requirements_quantity, {}).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  // Requirements Comments solicitudes

  createRequirementComments(id: number, creator: number, description: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.rest.requirements_comments, { id, creator, description }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  updateRequirementComments(id: number, commentId: number, description: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.patch(`${environment.rest.requirements_comments}/${id}`, { commentId, description }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  deleteRequirementComments(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.rest.requirements_comments}/${id}`).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  // Requirements Votes solicitudes

  updateRequirementVotes(id: number, userId: number, old: string, vote?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.patch(`${environment.rest.requirements_votes}/${id}`, { userId, old, vote }).subscribe((value: any) => {
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

}
