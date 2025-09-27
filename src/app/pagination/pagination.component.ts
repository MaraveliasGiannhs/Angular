import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-pagination',
  standalone: false,

  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})



export class PaginationComponent implements OnInit {


  @Output() childEvent = new EventEmitter<number>(); //emit back the index once updated

  @Input() childPagesSum: any
  @Input() childPageIndex: any




  ngOnInit(): void {
    this.childEvent.emit(this.childPageIndex);
  }



  //pagination
  selectPage(selectedPage: number) {
    this.childPageIndex = selectedPage
    this.ngOnInit()
  }



  pageBack() {
    if (this.childPageIndex > 1)
      this.childPageIndex = this.childPageIndex - 1
    this.ngOnInit()
  }



  pageNext() {
    if (this.childPageIndex < this.childPagesSum)
      this.childPageIndex = this.childPageIndex + 1
    this.ngOnInit()
  }


}
