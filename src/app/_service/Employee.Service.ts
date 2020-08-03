import {Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Employee} from '../_models/Employee';
import {PaginatedResult} from '../_models/Pagination';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
baseUrl = environment.apiUrl;  

constructor(private http: HttpClient) {}




getEmployee( page?,itemsPerPage?,employeeParams?) : Observable<PaginatedResult<Employee[]>> {

const paginatedResult : PaginatedResult<Employee[]> = new PaginatedResult<Employee[]>();
let params = new HttpParams();

if (page != null && itemsPerPage != null) {
  params = params.append('pageNumber', page);
  params = params.append('pageSize', itemsPerPage);
}

if (employeeParams != null) {
  params = params.append('minAge', employeeParams.minAge);
  params = params.append('maxAge', employeeParams.maxAge);
  params = params.append('gender', employeeParams.gender);
  params = params.append('orderBy', employeeParams.orderBy);
}

return this.http
.get<Employee[]>(this.baseUrl + 'employee', { observe: 'response', params })
.pipe(
  map(response => {
    paginatedResult.result = response.body;
    if (response.headers.get('Pagination') != null) {
      paginatedResult.pagination = JSON.parse(
        response.headers.get('Pagination')
      );
    }
    return paginatedResult;
  })
);
}

getUser(id): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'employee/' + id);
  }

  updateUser(id: number, employee: Employee) {
    return this.http.put(this.baseUrl + 'employee/' + id, employee);
  }

}