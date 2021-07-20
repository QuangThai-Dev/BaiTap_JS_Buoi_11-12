function ThanhVienService() {
  this.layDanhSachTV = function () {
    var promise = axios({
      url: "https://60dd7e54878c890017fa2905.mockapi.io/trungtam",
      method: "GET",
    });
    return promise;
  };

  this.themThanhVien = function (tv) {
    return axios({
      url: "https://60dd7e54878c890017fa2905.mockapi.io/trungtam",
      method: "POST",
      data: tv,
    });
  };

  this.xoaThanhVien = function (id) {
    return axios({
      url: `https://60dd7e54878c890017fa2905.mockapi.io/trungtam/${id}`,
      method: "DELETE",
    });
  };

  this.xemThanhVien = function (id) {
    return axios({
      url: `https://60dd7e54878c890017fa2905.mockapi.io/trungtam/${id}`,
      method: "GET",
    });
  };

  this.capNhatThanhVien = function (id, tv) {
    return axios({
      url: `https://60dd7e54878c890017fa2905.mockapi.io/trungtam/${id}`,
      method: "PUT",
      data: tv,
    });
  };
  this.timThanhVien = function (dstt, chuoiTK) {
    return dstt.filter(function (tv) {
      return tv.hoTen.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
    });
  };
}
