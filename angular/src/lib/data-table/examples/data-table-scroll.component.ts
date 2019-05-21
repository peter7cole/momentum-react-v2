import { Component } from '@angular/core';

@Component({
  selector: 'example-data-table-scroll',
  template: `

    <md-data-table
      [columns]="columns"
      [data]="people"
      [scrollable]="true"
      scrollHeight="200px"
      [containerStyle]="{'width': '60%'}"
    >

      <ng-template mdTemplateName="header" let-columns>
        <tr>
          <th *ngFor="let column of columns">
            {{column.header}}
          </th>
        </tr>
      </ng-template>

      <ng-template mdTemplateName="body" let-row let-columns="columns">
        <tr>
          <td *ngFor="let column of columns">
            {{row[column.field]}}
          </td>
        </tr>
      </ng-template>

    </md-data-table>
  `,
  styles: []
})
export class DataTableScrollComponent {

  columns = [
    { header: 'Name', field: 'name' },
    { header: 'State', field: 'state' },
    { header: 'Age', field: 'age' },
    { header: 'Color', field: 'color' }
  ];

  people = [
    {'name': 'John', 'state': 'Texas', 'age': 32, 'color': 'Orange'},
    {'name': 'Paul', 'state': 'California', 'age': 12, 'color': 'Black'},
    {'name': 'Ben', 'state': 'Florida', 'age': 23, 'color': 'Gray'},
    {'name': 'Lauren', 'state': 'Kansas', 'age': 75, 'color': 'Blue' },
    {'name': 'Mike', 'state': 'New York', 'age': 45, 'color': 'Orange'},
    {'name': 'Joe', 'state': 'Texas', 'age': 86, 'color': 'Black'},
    {'name': 'Robert', 'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
    {'name': 'Greg', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
    {'name': 'Sarah', 'state': 'Texas', 'age': 32, 'color': 'Black'},
    {'name': 'Derek', 'state': 'Montana', 'age': 27, 'color': 'Red'},
    {'name': 'Joe', 'state': 'Texas', 'age': 86, 'color': 'Black'},
    {'name': 'Michelle', 'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
    {'name': 'Greg', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
    {'name': 'Thomas', 'state': 'Texas', 'age': 32, 'color': 'Black'}
  ];
}