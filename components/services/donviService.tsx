import { get, post } from '../config/Request';
import axios from 'axios';
enum URL {
  getDanhSachCSHT = '/CSHT/GetDanhSachCsht?idDonVi=319528&idTo=-1&idLoaiCsht=-1&_=1721610201927',
  addCSHT = '/CSHT/AddAndUpdateCsht'
}

class donviService {
  static _instance = new donviService();

  async GetDanhSachDonVi() {
    try {
      const response = await get<{ data: cshtItem[]}>({
        url: URL.getDanhSachCSHT,
        params: {},
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
  async AddDonVi(newCSHT: cshtItem) {
    try {
      const response = await post({
        url: URL.addCSHT,
        params: {newCSHT},
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        throw new Error(`Network Error`);
      }
    }
  }

}
export default donviService._instance;