function Validator() {
    // Kiểm tra rỗng
    this.kiemTraRong = function(value, spanId, mess) {
        if (!value) {
            getEl(spanId).style.display = 'block';
            getEl(spanId).innerHTML = mess;
            return false;
        } else {
            getEl(spanId).style.display = 'none';
            getEl(spanId).innerHTML = '';
            return true;
        }
    }

    // Kiểm tra độ dài
    this.kiemTraDoDai = function(value, spanId, min, max, mess) {
        if (value >= min && value <= max) {
            getEl(spanId).style.display = 'none';
            getEl(spanId).innerHTML = '';
            return true;
        } else {
            getEl(spanId).style.display = 'block';
            getEl(spanId).innerHTML = mess;
            return false;
        }
    }

    // Kiểm tra toàn chữ
    this.kiemTraChu = function(value, spanId, mess) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")
        if (pattern.test(value)) {
            getEl(spanId).style.display = 'none';
            getEl(spanId).innerHTML = '';
            return true;
        } else {
            getEl(spanId).style.display = 'block';
            getEl(spanId).innerHTML = mess;
            return false;
        }
    }

    // Kiểm tra Email
    this.kiemTraEmail = function(value, spanId, mess) {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(mailFormat)) {
            getEl(spanId).style.display = 'none';
            getEl(spanId).innerHTML = '';
            return true;
        } else {
            getEl(spanId).style.display = 'block';
            getEl(spanId).innerHTML = mess;
            return false;
        }
    }

    // Kiểm tra mật khẩu
    this.kiemTraMK = function(value, spanId, mess) {
        var passFormat = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
        if (value.match(passFormat)) {
            getEl(spanId).style.display = 'none';
            getEl(spanId).innerHTML = '';
            return true;
        } else {
            getEl(spanId).style.display = 'block';
            getEl(spanId).innerHTML = mess;
            return false;
        }
    }

    // Kiểm tra Seclector
    this.validSeclector = function(value, spanId, mess) {
        if (getEl(value).selectedIndex === 0) {
            getEl(spanId).style.display = 'block';
            getEl(spanId).innerHTML = mess;
            return false;
        } else {
            getEl(spanId).style.display = 'none';
            getEl(spanId).innerHTML = '';
            return true;
        }
    }

    // Kiểm tra trùng mã
    this.trungMa = function(value, spanId, mess) {
        var mangMoi = getLocalStorage();
        for(let item of mangMoi){
            if (item.taiKhoan === value) {
                getEl(spanId).style.display = 'block';
                getEl(spanId).innerHTML = mess;
                return false;
            }
        }
        return true;
    }

}