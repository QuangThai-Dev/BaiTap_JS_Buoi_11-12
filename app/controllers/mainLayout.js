var thanhVien = new ThanhVienService();

var laydanhSachLayOut = function () {
  thanhVien
    .layDanhSachTV()
    .then(function (result) {
      danhSachLauOut(result.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// hiển thị lên lay out
function danhSachLauOut(arr) {
  var content = "";
  arr.map(function (tv, index) {
    if (tv.loaiND === "GV") {
      content += `
        <div class="col-3">
            <div class="card cardPerson">
                <span>
                    <img src="./img/${tv.hinhAnh}" alt="">
                </span>
                <div class="card-body">
                    <span>${tv.ngonNgu}</span>
                    <h3>${tv.hoTen}</h3>
                    <span>${tv.moTa}</span>
                </div>
            </div>
        </div>
        `;
    }
  });
  document.getElementById("layOut").innerHTML = content;
}

laydanhSachLayOut();
