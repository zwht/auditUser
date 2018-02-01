import {Component, OnInit} from '@angular/core';
import {FileUploader} from '../../../ng2-file-upload';
import {ElMessageService} from 'element-angular'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {
  uploader: FileUploader;
  loading = false;

  constructor(private message: ElMessageService,) {
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: "/api/upload_files",
      method: "POST",
      itemAlias: "uploadedfile",
      allowedFileType: ['xls', 'xlsx'],
      headers: [
        {name: 'Authorization', value: localStorage.getItem('token')}
      ]
    });
    this.uploader.onProgressAll = (progress) => {

    };
    /*this.uploader.onCompleteAll = () => {
     this.loading = false;
     this.uploader.clearQueue();
     this.message.success('上传成功');
     };*/
    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   this.message.error('上传失败');
    //   this.loading = false;
    // };

    $("#fk").click(function () {
      $("#file").trigger('click')
    })

  }

  close(item) {
    this.uploader.removeFromQueue(item);
  }

  save() {
    this.loading = true;
    let key = 0;
    this.uploader.queue.forEach(item => {
      item.error = '';
      item.success = false;
      item.onSuccess = (response, status, headers) => {
        key++;
        if (key >= this.uploader.queue.length - 1) this.loading = false;
        // 上传文件成功
        if (status == 200) {
          // 上传文件后获取服务器返回的数据
          let data = JSON.parse(response);
          if (data.code != 0) {
            item.error = data.error_msg;
          } else {
            item.success = true;
          }
        } else {
          item.error = '上传失败';
          // 上传文件后获取服务器返回的数据错误
        }
      }
    });


    this.uploader.uploadAll();
  }

  selectedFileOnChanged(e) {

  }

}
