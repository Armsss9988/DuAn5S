import { get, post } from "../config/Request";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

export interface HoanCongItemReq {
  donVi: string;
  idPhongTrao: string;
  toQuanly: string;
  loaiCSHT: string;
  idNhanVien: string;
}
export interface ImageInfo {
  URI:string[];
  FileNameList: string[];
  FileContentList:string[];
  deletedFileNames?: string[];
}
export interface HoanCongItemRes {
  id: 2350;
  idPhongTrao: 3254;
  idGiaoViec: number;
  tenPhongTrao: string;
  idCSHT: number;
  tenCSHT: string;
  maCSHT: string;
  loaiCSHT: string;
  loaiTram: string;
  hinhAnh: ImageInfo;
  nhanVienQuanLy: string;
  nhanVienGiaoPhieu: number;
  trangThaiPhieuGiaoNhanVien: string;
}

export interface LoadThongTinHoanCongRes {
  id: number,
idPhongTrao: number,
idGiaoViec: number,
tenPhongTrao: null,
idCSHT: number;
tenCSHT: string;
maCSHT: string,
loaiCSHT: string,
loaiTram: string;
hinhAnh: ImageInfo;
nhanVienQuanLy: string,
nhanVienGiaoPhieu: string,
noiDungCongViec: string,
danhSachNhanVienPhoiHop: [],
trangThaiPhieuGiaoNhanVien: string,
trangThaiPhieuHoanCong: string,
nguoiCapNhat: string;
ngayCapNhat: string;
lyDoHoanCong: null
}

export interface ToQuanlyReq {
  idNhanvien: number;
  idDonVi: number;
}
enum URL {
  getDanhSachPhieu = "/HoanCong5S/getDanhSachHoanCong5s",
  loadDonVi = "/HoanCong5S/loadDonViApp",
  loadDonViByToQuanLy = "/HoanCong5S/loadDonViByToQuanLy",
  loadPhongTrao = "/HoanCong5S/loadPhongTrao",
  loadLoaiCSHT = "/HoanCong5S/loadLoaiCSHT",
  loadThongTinHoanCong = "/HoanCong5S/loadThongTinHoanCong",
  hoanCong5SHinhAnh = "/HoanCong5S/hoanCong5SHinhAnh",
}

class hoancongService {
  static _instance = new hoancongService();

  async GetDanhSachPhieu(data: HoanCongItemReq) {
    try {
      console.log("data: " + data.donVi);
      const response = await get({
        url: URL.getDanhSachPhieu,
        params: {
          donVi: data.donVi,
          idPhongTrao: data.idPhongTrao,
          toQuanly: data.toQuanly,
          loaiCSHT: data.loaiCSHT,
          idNhanVien: data.idNhanVien,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
  async LoadDonVi(data: ToQuanlyReq) {
    try {
      const response = await get({
        url: URL.loadDonVi,
        params: {
          idNhanvien: data.idNhanvien,
          idDonVi: data.idDonVi,
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error ${error}`);
      }
    }
  }
  async LoadDonViByToQuanLy(id: number) {
    try {
      const response = await get({
        url: URL.loadDonViByToQuanLy,
        params: { donVi: id },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
  async LoadPhongTrao() {
    try {
      const response = await get({
        url: URL.loadPhongTrao,
        params: {},
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
  async LoadLoaiCSHT() {
    try {
      const response = await get({
        url: URL.loadLoaiCSHT,
        params: {},
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
  async LoadThongTinHoanCong(id: number) {
    try {
      const response = await get({
        url: URL.loadThongTinHoanCong,
        params: { idHoanCong: id },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
  async hoanCong5SHinhAnh(id: number) {
    try {
      const response = await post({
        url: URL.hoanCong5SHinhAnh,
        params: { idHoanCong: id },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
  async ShowHinhAnh(tenHinhAnh: string) {
    try {
      const response = await get({
        url: `/Uploads/${tenHinhAnh}`,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
}
export default hoancongService._instance;
