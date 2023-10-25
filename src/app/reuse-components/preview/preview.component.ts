import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

  constructor(
    public dialogRef: MatDialogRef<PreviewComponent>,
    private spinner: NgxSpinnerService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}


  print() {
    debugger
    // this.spinner.show();
    // setTimeout(() => {
      let DATA: any = document.getElementById('printData');
      const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
      WindowPrt.document.write(DATA.innerHTML);
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
      // html2canvas(DATA).then((canvas: any) => {
      //   // let fileWidth = 208;
      //   // let fileHeight = 279.4;
      //   // let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //   const FILEURI = canvas.toDataURL('image/png');
      //   let PDF = new jsPDF('p', 'mm', 'a4');
      //   let position = 0;
      //   var width = PDF.internal.pageSize.getWidth();
      //   var height = PDF.internal.pageSize.getHeight();
      //   PDF.addImage(FILEURI, 'PNG', 0, position, width, height);
      //   PDF.save(`${this.data.heading}.pdf`);
      //   this.spinner.hide();
      // });
    // });
  }

  close() {
    this.dialogRef.close();
  }
}
