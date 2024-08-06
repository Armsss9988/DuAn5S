interface cshtItem {
  idCSHT: number;
  maCSHT: string;
  tenCSHT: string;
  idLoaiCSHT: number;
  maLoaiCSHT: string;
  tenLoaiCSHT: string;
  idDonVi: number;
  tenDonVi: string;
  idTo: number;
  tenToQuanLy: string;
  idLoaiTram: number;
  tenLoaiTram: string;
  diaChi: string;
  ngayTao: string;
  ngayCapNhat: string;
  imageInfo: {
    fileNameList: [];
    fileContentList: [];
  };
}
