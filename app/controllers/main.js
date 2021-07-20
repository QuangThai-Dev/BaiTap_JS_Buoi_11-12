var getEl = function (id) {
  return document.getElementById(id);
};

var thanhVienService = new ThanhVienService();
var validator = new Validator();
// Lấy danh sách từ API để hiện ra bảng
var layDanhSachTrungTam = function () {
  thanhVienService
    .layDanhSachTV()
    .then(function (result) {
      // console.log(result.data);
      hienThiDanhSach(result.data);
      setLocalStorage(result.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

layDanhSachTrungTam();

// Thêm thành viên
var themThanhVien = function () {
  // debugger
  var taiKhoan = getEl("TaiKhoan").value;
  var hoTen = getEl("HoTen").value;
  var matKhau = getEl("MatKhau").value;
  var email = getEl("Email").value;
  var hinhAnh = getEl("HinhAnh").value;
  var loaiNguoiDung = getEl("loaiNguoiDung").value;
  var loaiNgonNgu = getEl("loaiNgonNgu").value;
  var moTa = getEl("MoTa").value;

  // Kiểm tra lỗi
  // debugger;
  var isValid = true;
  isValid &=
    validator.kiemTraRong(taiKhoan, "tbTK", "Tài khoảng không được để trống") &&
    validator.trungMa(taiKhoan, "tbTK", "Tài khoản đã bị trùng");
  // console.log(isValid);
  isValid &=
    validator.kiemTraRong(hoTen, "tbHoTen", "Họ tên không được để trống") &&
    validator.kiemTraChu(
      hoTen,
      "tbHoTen",
      "Họ tên không chứa số và ký tự đặc biệt"
    );
  isValid &=
    validator.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "Mật khẩu không được để trống"
    ) &&
    validator.kiemTraMK(
      matKhau,
      "tbMatKhau",
      "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và có độ dài từ 6-8 ký tự"
    );
  isValid &=
    validator.kiemTraRong(email, "tbEmail", "Email không được để trống") &&
    validator.kiemTraEmail(email, "tbEmail", "Email không hợp lệ");
  isValid &= validator.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "Hình ảnh không được để trống"
  );
  isValid &= validator.validSeclector(
    "loaiNguoiDung",
    "tbNguoiDung",
    "Người dùng chưa được chọn"
  );
  isValid &= validator.validSeclector(
    "loaiNgonNgu",
    "tbNgonNgu",
    "Ngôn ngữ chưa được chọn"
  );
  isValid &=
    validator.kiemTraRong(moTa, "tbMoTa", "Mô Tả không được để trống") &&
    validator.kiemTraDoDai(
      moTa.length,
      "tbMoTa",
      0,
      60,
      "Mô tả không vượt quá 60 ký tự"
    );

  if (!isValid) return;

  var tv = new ThanhVien(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa
  );

  thanhVienService
    .themThanhVien(tv)
    .then(function (result) {
      console.log(result);
      layDanhSachTrungTam();
      document.querySelector(".close").click();
    })
    .catch(function (err) {
      console.log(err);
    });
};

// Xóa thông tin form
var xoaform = function () {
  getEl("TaiKhoan").value = "";
  getEl("HoTen").value = "";
  getEl("MatKhau").value = "";
  getEl("Email").value = "";
  getEl("HinhAnh").value = "";
  getEl("loaiNguoiDung").selectedIndex = 0;
  getEl("loaiNgonNgu").selectedIndex = 0;
  getEl("MoTa").value = "";
  var eleClass = document.getElementsByClassName("spThongBao");
  for (let eleclass of eleClass) {
    eleclass.innerHTML = "";
  }
};

// Bắt sự kiện thêm người dùng
var modalTitle = getEl("modalTitle");
var modalFooter = getEl("modalFooter");
getEl("btnThemNguoiDung").addEventListener("click", function () {
  xoaform();
  modalTitle.innerHTML = "Thêm Thành Viên";
  modalFooter.innerHTML = `
        <button class="btn btn-success" onclick="themThanhVien()">Thêm thành viên</button>
    `;
});

// Xóa Thành Viên
var xoaThanhVien = function (id) {
  thanhVienService
    .xoaThanhVien(id)
    .then(function (result) {
      layDanhSachTrungTam();
    })
    .catch(function (err) {
      console.groupEnd(err);
    });
};

// Cập Nhật Thành viên
var capNhatThanhVien = function (id) {
  var taiKhoan = getEl("TaiKhoan").value;
  var hoTen = getEl("HoTen").value;
  var matKhau = getEl("MatKhau").value;
  var email = getEl("Email").value;
  var hinhAnh = getEl("HinhAnh").value;
  var loaiNguoiDung = getEl("loaiNguoiDung").value;
  var loaiNgonNgu = getEl("loaiNgonNgu").value;
  var moTa = getEl("MoTa").value;

  var tv = new ThanhVien(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa
  );

  thanhVienService
    .capNhatThanhVien(id, tv)
    .then(function (resut) {
      layDanhSachTrungTam();
      document.querySelector(".close").click();
    })
    .catch(function (err) {
      console.log(err);
    });
};

// Xem Thanh Vien
var xemThanhVien = function (id) {
  thanhVienService
    .xemThanhVien(id)
    .then(function (result) {
      getEl("btnThemNguoiDung").click();
      modalTitle.innerHTML = "Cập nhật Thành Viên";
      modalFooter.innerHTML = `<button class="btn btn-success" onclick="capNhatThanhVien('${id}')">Cập nhật thành viên</button>`;
      var tv = result.data;
      getEl("TaiKhoan").value = tv.taiKhoan;
      getEl("HoTen").value = tv.hoTen;
      getEl("MatKhau").value = tv.matKhau;
      getEl("Email").value = tv.email;
      getEl("HinhAnh").value = tv.hinhAnh;
      getEl("loaiNguoiDung").value = tv.loaiND;
      getEl("loaiNgonNgu").value = tv.ngonNgu;
      getEl("MoTa").value = tv.moTa;
    })
    .catch(function (err) {
      console.log(err);
    });
};

// Hiển thị danh sách ra bảng
function hienThiDanhSach(arr) {
  var content = "";
  arr.map(function (tv, index) {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${tv.taiKhoan}</td>
                <td>${tv.hoTen}</td>
                <td>
                    <img style="width: 100px; height: 100px;" src="../../assets/img/${
                      tv.hinhAnh
                    }" />
                </td>
                <td>${tv.email}</td>
                <td>${tv.loaiND}</td>
                <td>${tv.ngonNgu}</td>
                <td>
                    <button class="btn btn-success" onclick = "xemThanhVien('${
                      tv.id
                    }')">View</button>
                    <button class="btn btn-danger" onclick = "xoaThanhVien('${
                      tv.id
                    }')">Delete</button>
                </td>
            </tr>
        `;
  });
  getEl("tblDanhSachNguoiDung").innerHTML = content;
}

// Tìm kiếm thành viên
getEl("ipTimKiem").addEventListener("keyup", function () {
  var mangTV = getLocalStorage();
  var chuoiTK = getEl("ipTimKiem").value;
  var mangTK = thanhVienService.timThanhVien(mangTV, chuoiTK);
  hienThiDanhSach(mangTK);
});

function setLocalStorage(dstt) {
  localStorage.setItem("DSTT", JSON.stringify(dstt));
}

function getLocalStorage() {
  if (localStorage.getItem("DSTT")) {
    return JSON.parse(localStorage.getItem("DSTT"));
  }
}
