import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_service/Employee.Service';
import { Employee } from '../_models/Employee';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  Employee: Employee[];
  Pagination: Pagination



  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }





  loadEmployee() {
    this.employeeService
      .getEmployee(
        this.Pagination.currentPage,
        this.Pagination.itemsPerPage
      ).subscribe(res: PaginatedResult<Employee[]>) => {
        this.Employee = res.result;
        this.Pagination = res.Pagination;
      },
     


}
pageChanged(event: any): void {
  this.Pagination.currentPage = event.page;
  this.loadEmployee();
}
}
